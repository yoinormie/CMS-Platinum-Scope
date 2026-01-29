export interface Review {
  id: string;
  titulo: string;
  imagen: string;
  ficha_tecnica: {
    plataformas?: string;
    desarrollador?: string;
    editor?: string;
    sinopsis?: string;
    requisitos_minimos: Record<string, string>;
    requisitos_recomendados?: Record<string, string>;
  };
  opinion: Record<string, string>;
  recursos?: Record<string, string>[];
  enlaces_compra?: Record<string, string>[];
}
