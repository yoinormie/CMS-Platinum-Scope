export {};

declare global {
  interface Window {
    api: {
      openFile: () => string
      openDirectory: () => string
    };
  }
}
