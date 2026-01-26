import { useState } from "react";
import type { Recurso } from "../types/recursoType";

// Hook
export function useRecursos() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);

  // Añadir recurso
  const addRecurso = (tipo: "video" | "artículo") => {
    if (tipo === "video") {
      setRecursos(prev => [
        ...prev,
        { tipo: "video", enlace: "", autor: "" }
      ]);
    } else {
      setRecursos(prev => [
        ...prev,
        { tipo: "artículo", enlace: "", autor: "", titulo: "", snippet: "", imagen: "" }
      ]);
    }
  };

  // Eliminar recurso
  const removeRecurso = (index: number) => {
    setRecursos(prev => prev.filter((_, i) => i !== index));
  };

  // Actualizar recurso
  const updateRecurso = (
    index: number,
    field: keyof Recurso | "titulo" | "snippet" | "imagen",
    value: string
  ) => {
    setRecursos(prev =>
      prev.map((r, i) => {
        if (i !== index) return r;

        // Solo actualiza campos que existen en el recurso
        if (field in r) {
          return { ...r, [field]: value } as Recurso;
        }

        return r;
      })
    );
  };

  return { recursos, addRecurso, removeRecurso, updateRecurso };
}