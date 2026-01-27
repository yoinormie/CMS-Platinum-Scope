// Campos comunes
interface RecursoBase {
  tipo: "video" | "artículo";
  enlace: string;
  autor: string;
}

export interface RecursoVideo extends RecursoBase {
  tipo: "video";
}


export interface RecursoArticulo extends RecursoBase {
  tipo: "artículo";
  titulo: string;
  snippet?: string;
  imagen?: string;
}

export type Recurso = RecursoVideo | RecursoArticulo;
