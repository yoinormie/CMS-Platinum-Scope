import { useState } from "react";

interface ImagePickerProps {
  label: string;
  onSelect: (file: File) => void; // callback para enviar el archivo al padre
  accept?: string; // tipos de archivo permitidos, por defecto imágenes
}

export default function ImagePicker({ label, onSelect, accept = "image/*" }: ImagePickerProps) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onSelect(file);
    }
  };

  return (
    <div className="mb-10 flex flex-col gap-2">
      <label className="text-lg font-medium text-gray-700">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="border border-[var(--color-border)] rounded px-3 py-2"
      />
    </div>
  );
}
