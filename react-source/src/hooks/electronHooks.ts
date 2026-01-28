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

export const handleGitCommit = async (jsonPath: string, gitRoot: string, message: string) => {
  const res = await window.api.gitAutoCommit(
    jsonPath,
    gitRoot,
    message
  );

  if (!res.success) {
    alert(res.error);
  } else {
    console.log("Commit hecho en:", res.jsonRoot);
  }
}

export const handleImageRelativePath = async (jsonPath: string, imagesDir: string) => {
  const res = await window.api.getRelativeImagePath(
    jsonPath,
    imagesDir
  )
  if(res.success){
    return res.path
  } else{
    alert("Fallo al obtener la ruta relativa")
  }
}