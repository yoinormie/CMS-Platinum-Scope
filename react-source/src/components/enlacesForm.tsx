import type { EnlaceCompra } from "../types/enlaceCompraType";
import TextSet from "./TextSet";

interface EnlacesCompraFormProps {
  varEnlaces: {
    enlacesCompra: EnlaceCompra[];
    addEnlaceCompra: () => void;
    removeEnlaceCompra: (index: number) => void;
    updateEnlaceCompra: (index: number, field: keyof EnlaceCompra, value: string) => void;
  };
}

export function EnlacesCompraForm(props: EnlacesCompraFormProps) {
  return (
    <>
      {props.varEnlaces.enlacesCompra.map((e, i) => (
        <div key={i} className="border p-4 rounded mb-4 flex flex-row gap-4">

          <TextSet
            idText={`enlace-${i}-plataforma`}
            labelText="Plataforma"
            varText={e.plataforma}
            setVarText={(v: string) => props.varEnlaces.updateEnlaceCompra(i, "plataforma", v)}
            placeholderText="Steam, Playstation..."
          />

          <TextSet
            idText={`enlace-${i}-enlace`}
            labelText="Enlace"
            varText={e.enlace}
            setVarText={(v: string) => props.varEnlaces.updateEnlaceCompra(i, "enlace", v)}
          />

          <button
            onClick={() => props.varEnlaces.removeEnlaceCompra(i)}
            className="mt-2 bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      ))}
    </>
  );
}