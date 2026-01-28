import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  openFile: () => ipcRenderer.invoke('open-file'),
  openDirectory: () => ipcRenderer.invoke('open-directory'),
  setStorePath: (key: string, value: string) => ipcRenderer.invoke('set-path', key, value),
  getStorePath: (key: string) => ipcRenderer.invoke('get-path', key),
  writeJson: async (review: any, filePath: string) => {
    return await ipcRenderer.invoke("write-json", review, filePath);
  }
});
