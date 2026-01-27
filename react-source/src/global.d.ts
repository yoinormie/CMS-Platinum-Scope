export { };

declare global {
    interface Window {
        api: {
            openFile: () => string
            openDirectory: () => string
            setStorePath: (key: keyof StoreSchema, value: string) => Promise<void>;
            getStorePath: (key: keyof StoreSchema) => Promise<string | null>;
        };
    }
}
