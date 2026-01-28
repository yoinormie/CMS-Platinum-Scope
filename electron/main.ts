import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs'
import Store from 'electron-store'
import simpleGit from "simple-git";

interface StoreSchema {
    lastFile: string;
    lastDirectory: string;
}

function existsInside(repoRoot: string, targetPath: string) {
    const absRepo = path.resolve(repoRoot);
    const absTarget = path.resolve(targetPath);

    if (!absTarget.startsWith(absRepo)) return false;
    return fs.existsSync(absTarget);
}

const store = new (Store as any)() as Store<StoreSchema>;

let win: BrowserWindow;

function createWindow() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, './preload.ts'),
            nodeIntegration: true,
            contextIsolation: true
        }
    });

    win.maximize();

    if (process.env.NODE_ENV === 'development') {
        win.loadURL('http://localhost:5173');
    } else {
        win.loadFile(path.join(__dirname, '../src/dist/index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('open-file', async () => {
    if (!win) return null;

    const result = await dialog.showOpenDialog(win, {
        properties: ['openFile']
    });

    if (result.canceled) return null;
    return result.filePaths[0];
});

ipcMain.handle('open-directory', async () => {

    const result = await dialog.showOpenDialog(win, {
        properties: ['openDirectory']
    });

    if (result.canceled) return null;
    return result.filePaths[0];
});


ipcMain.handle('set-path', (_event, key: string, value: string) => {
    (store as any).set(key, value);
});

ipcMain.handle('get-path', (_event, key: string) => {
    return (store as any).get(key);
});

ipcMain.handle("write-json", async (_, newReview, filePath: string) => {
    if (!filePath) {
        return { success: false, error: "No se proporcionó la ruta del archivo" };
    }

    let data: any[] = [];

    if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        try {
            data = JSON.parse(raw);
            if (!Array.isArray(data)) data = [];
        } catch {
            data = [];
        }
    }

    data.push(newReview);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    return { success: true };
});

ipcMain.handle(
    "copy-rename-file",
    async (_, sourcePath: string, destDir: string, newName: string) => {
        try {
            if (!fs.existsSync(sourcePath)) {
                return { success: false, error: "Archivo origen no existe" };
            }

            if (!fs.existsSync(destDir)) {
                return { success: false, error: "La carpeta destino no existe" };
            }

            const ext = path.extname(sourcePath);
            const finalName = newName.endsWith(ext) ? newName : newName + ext;
            const destPath = path.join(destDir, finalName);

            fs.copyFileSync(sourcePath, destPath);

            return { success: true, path: destPath };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    }
);

ipcMain.handle(
    "git-auto-commit",
    async (_, repoRoot: string, jsonPath: string, imagesDir: string, message: string) => {
        try {
            const absRepo = path.resolve(repoRoot);

            // 1. ¿Existe repo?
            if (!fs.existsSync(path.join(absRepo, ".git"))) {
                return { success: false, error: "No es un repositorio git" };
            }

            // 2. ¿Están dentro y existen?
            if (!existsInside(absRepo, jsonPath)) {
                return { success: false, error: "El JSON no existe dentro del repo" };
            }

            if (!existsInside(absRepo, imagesDir)) {
                return { success: false, error: "La carpeta de imágenes no existe dentro del repo" };
            }

            const git = simpleGit({ baseDir: absRepo });

            const status = await git.status();
            if (status.files.length === 0) {
                return { success: false, error: "No hay cambios para commitear" };
            }

            await git.add(".");
            await git.commit(message);

            return { success: true, repo: absRepo };

        } catch (err: any) {
            return { success: false, error: err.message };
        }
    }
);

ipcMain.handle(
    "get-relative-image-path",
    async (_, jsonPath: string, imagesDir: string) => {
        try {
            if (!fs.existsSync(jsonPath)) {
                return { success: false, error: "El JSON no existe" };
            }

            if (!fs.existsSync(imagesDir)) {
                return { success: false, error: "La carpeta de imágenes no existe" };
            }

            const jsonDir = path.dirname(jsonPath);

            // Ruta relativa desde la carpeta del json hacia la de imágenes
            let relative = path.relative(jsonDir, imagesDir);

            // Normalizar para JSON / web
            relative = relative.split(path.sep).join("/");

            return { success: true, path: relative };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    }
);