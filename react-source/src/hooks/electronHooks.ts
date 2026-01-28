export const pickFile = async () => {
  const path = await window.api.openFile();
  if (path) console.log('Archivo seleccionado:', path);
};

export const pickDirectory = async () => {
  const path = await window.api.openDirectory();
  if (path) console.log('Directorio seleccionado:', path);
};

export const setStorePath = async (key: 'lastFile' | 'lastDirectory', value: string) => {
  await window.api.setStorePath(key, value);
};

export const getStorePath = async (key: 'lastFile' | 'lastDirectory'): Promise<string | null> => {
  return await window.api.getStorePath(key);
};

export const handleAddReview = async (review: any, filePath: string) => {
  const result = await window.api.writeJson(review, filePath);

  if (result.success) {
    console.log("Review guardada")
  } else {
    console.log("Error: " + result.error);
  }
};

export const handleCopyImage = async (selectedImagePath: string, imagesFolder: string, titulo: string) => {
  const result = await window.api.copyRenameFile(
    selectedImagePath,
    imagesFolder,
    titulo.toLowerCase().replace(/\s+/g, "_")
  );

  if (result.success) {
    console.log("Imagen copiada en:", result.path);
  } else {
    alert(result.error);
  }
};

