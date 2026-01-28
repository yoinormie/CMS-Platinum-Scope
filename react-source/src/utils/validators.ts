import { useRequirementsForm } from "../constants/requisitosConstants";
import { useReviewForm } from "../constants/opinionConstants";
import type { EnlaceCompra } from "../types/enlaceCompraType";

export function canSaveMainForm(data: {
  titulo: string;
  selectedImage: File | null;
  minRequirements: ReturnType<typeof useRequirementsForm>;
  opinion: ReturnType<typeof useReviewForm>;
  enlacesCompra: EnlaceCompra[]
}): boolean {
  return (
    !!data.titulo.trim() &&
    !!data.selectedImage &&
    data.minRequirements.isValid() &&
    data.opinion.isValid() &&
    !(data.enlacesCompra.length === 0)
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