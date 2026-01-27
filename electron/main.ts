import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

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


