import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'fs'
import Store from 'electron-store'

interface StoreSchema {
    lastFile: string;
    lastDirectory: string;
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