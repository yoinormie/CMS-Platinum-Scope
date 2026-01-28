import { useRequirementsForm } from "../constants/requisitosConstants";
import { useReviewForm } from "../constants/opinionConstants";
import type { EnlaceCompra } from "../types/enlaceCompraType";

export function canSaveMainForm(data: {
  titulo: string;
  selectedImage: File | null;
  minRequirements: ReturnType<typeof useRequirementsForm>;
  opinion: ReturnType<typeof useReviewForm>;
  enlacesCompra: EnlaceCompra[]
  desarrollador: string
  editor: string
  plataformas: string
}): boolean {
  return (
    !!data.titulo.trim() &&
    !!data.selectedImage &&
    data.minRequirements.isValid() &&
    data.opinion.isValid() &&
    !(data.enlacesCompra.length === 0) &&
    !!data.desarrollador.trim() &&
    !!data.editor.trim() &&
    !!data.plataformas.trim()
  );
}

export function canSaveLastForm(data: {
  jsonPath: string;
  imagePath: string;
}): boolean {
  return (
    !!data.jsonPath.trim() &&
    !!data.imagePath.trim()
  );
}