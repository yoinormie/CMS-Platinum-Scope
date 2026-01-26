import { useState } from "react";
import type { EnlaceCompra } from "../types/enlaceCompraType";

export function useEnlacesCompra() {
  const [enlacesCompra, setEnlacesCompra] = useState<EnlaceCompra[]>([]);

  const addEnlaceCompra = () => {
    setEnlacesCompra(prev => [
      ...prev,
      { plataforma: "", enlace: "" }
    ]);
  };

  const removeEnlaceCompra = (index: number) => {
    setEnlacesCompra(prev => prev.filter((_, i) => i !== index));
  };

  const updateEnlaceCompra = (
    index: number,
    field: keyof EnlaceCompra,
    value: string
  ) => {
    setEnlacesCompra(prev =>
      prev.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      )
    );
  };

  return { enlacesCompra, addEnlaceCompra, removeEnlaceCompra, updateEnlaceCompra };
}
