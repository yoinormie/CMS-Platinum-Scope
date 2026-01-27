export const pickFile = async () => {
  const path = await window.api.openFile();
  if (path) console.log('Archivo seleccionado:', path);
};

export const pickDirectory = async () => {
  const path = await window.api.openDirectory();
  if (path) console.log('Directorio seleccionado:', path);
};
