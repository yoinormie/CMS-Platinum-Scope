export { };

declare global {
    interface Window {
        api: {
            openFile: () => string
            openDirectory: () => string
            setStorePath: (key: keyof StoreSchema, value: string) => Promise<void>;
            getStorePath: (key: keyof StoreSchema) => Promise<string | null>;
            writeJson: (review: any, filePath: string) => Promise<{ success: boolean; error?: string }>;
            copyRenameFile: (
                sourcePath: string,
                destDir: string,
                newName: string
            ) => Promise<{ success: boolean; path?: string; error?: string }>;
        };
    };
}

