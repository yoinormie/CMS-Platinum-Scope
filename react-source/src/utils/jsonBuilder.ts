import { useRequirementsForm } from "../constants/requisitosConstants";
import { useReviewForm } from "../constants/opinionConstants";

function serializeHookData<T extends Record<string, any>>(hookObj: T, skipKeys: string[] = []) {
  return Object.fromEntries(
    Object.entries(hookObj).filter(
      ([key, value]) =>
        typeof value === "string" &&
        value.trim() !== "" &&
        !skipKeys.includes(key)
    )
  );
}

export function buildReviewJson(options: {
  id: string;
  titulo: string;
  imagen: string;
  fichaTecnica: {
    plataformas?: string;
    desarrollador?: string;
    editor?: string;
    requisitosMinimos: ReturnType<typeof useRequirementsForm>;
    requisitosRecomendados?: ReturnType<typeof useRequirementsForm>;
    sinopsis?: string;
  };
  opinion: ReturnType<typeof useReviewForm>;
  recursos?: { tipo: string; enlace?: string; autor?: string; titulo?: string; snippet?: string; imagen?: string }[];
  enlacesCompra?: { plataforma: string; enlace: string }[];
}) {
  const minReqs = serializeHookData(options.fichaTecnica.requisitosMinimos);
  const recReqs = options.fichaTecnica.requisitosRecomendados
    ? serializeHookData(options.fichaTecnica.requisitosRecomendados)
    : undefined;

  const opinionData = serializeHookData(options.opinion, ["sinopsis"]);

  return Object.fromEntries(
    Object.entries({
      id: options.id,
      titulo: options.titulo,
      imagen: options.imagen,
      ficha_tecnica: {
        plataformas: options.fichaTecnica.plataformas,
        desarrollador: options.fichaTecnica.desarrollador,
        editor: options.fichaTecnica.editor,
        requisitos_minimos: minReqs,
        ...(recReqs ? { requisitos_recomendados: recReqs } : {}),
        ...(options.fichaTecnica.sinopsis ? { sinopsis: options.fichaTecnica.sinopsis } : {}),
      },
      opinion: opinionData,
      recursos: (options.recursos ?? []).map(r =>
        Object.fromEntries(Object.entries(r).filter(([_, v]) => v !== undefined && v !== null && v !== ""))
      ),
      enlaces_compra: (options.enlacesCompra ?? []).map(e =>
        Object.fromEntries(Object.entries(e).filter(([_, v]) => v !== undefined && v !== null && v !== ""))
      ),
    }).filter(([_, v]) => v !== undefined && v !== null)
  );
}
