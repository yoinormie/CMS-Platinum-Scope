import type { Recurso } from "../types/recursoType";
import TextSet from "./TextSet";

interface RecursosFormProps {
    varRecursos: {
        recursos: Recurso[];
        addRecurso: (tipo: "video" | "art\u00EDculo") => void;
        removeRecurso: (index: number) => void;
        updateRecurso: (index: number, field: keyof Recurso | "titulo" | "snippet" | "imagen", value: string) => void
    }
}

export function RecursosForm(props: RecursosFormProps) {
    return (
        <>
            {props.varRecursos.recursos.map((r, i) => (
                <div key={i} className="border p-4 rounded mb-4 flex flex-row gap-4">

                    <select
                        value={r.tipo}
                        onChange={e => {
                            props.varRecursos.addRecurso(e.target.value as any);
                            props.varRecursos.removeRecurso(i);
                        }}
                        className="mx-2 border border-[var(--color-border)] rounded"
                    >
                        <option value="video">Video</option>
                        <option value="artículo">Artículo</option>
                    </select>

                    <TextSet
                        idText={`recurso-${i}-enlace`}
                        labelText="Enlace"
                        varText={r.enlace}
                        setVarText={(v: string) => props.varRecursos.updateRecurso(i, "enlace", v)}
                    />

                    <TextSet
                        idText={`recurso-${i}-autor`}
                        labelText="Autor"
                        varText={r.autor || ""}
                        setVarText={(v: string) => props.varRecursos.updateRecurso(i, "autor", v)}
                    />

                    {r.tipo === "artículo" && (
                        <>
                            <TextSet
                                idText={`recurso-${i}-titulo`}
                                labelText="Título"
                                varText={r.titulo || ""}
                                setVarText={(v: string) => props.varRecursos.updateRecurso(i, "titulo", v)}
                                placeholderText="¿De qué va el artículo?"
                            />

                            <TextSet
                                idText={`recurso-${i}-snippet`}
                                labelText="Snippet"
                                varText={r.snippet || ""}
                                setVarText={(v: string) => props.varRecursos.updateRecurso(i, "snippet", v)}
                                placeholderText="Snippet para OpenGraph"
                            />
                        </>
                    )}

                    <button
                        onClick={() => props.varRecursos.removeRecurso(i)}
                        className="mt-2 bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                    >
                        Eliminar
                    </button>
                </div>
            ))}
        </>
    )
}