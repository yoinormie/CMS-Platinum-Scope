import TextSet from "./TextSet";
import { useState } from "react";

export function TextSetsFichaTecnica() {
    const [desarrollador, setDesarrollador] = useState("");
    const [plataformas, setPlataformas] = useState("");
    const [editor, setEditor] = useState("");

    return (
        <>
            <TextSet
                idText='desarrollador'
                labelText='Desarrollador'
                varText={desarrollador}
                setVarText={setDesarrollador}

            />
            <TextSet
                idText='editor'
                labelText='Editor'
                varText={editor}
                setVarText={setEditor}
            />

            <TextSet
                idText='plataformas'
                labelText='Plataformas'
                varText={plataformas}
                setVarText={setPlataformas}
            />

        </>
    )
}