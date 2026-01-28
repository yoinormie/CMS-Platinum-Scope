import TextSet from "./TextSet";

interface TextSetsFichaTecnicaProps {
    desarrollador: string
    setDesarrollador: React.Dispatch<React.SetStateAction<string>>
    editor: string
    setEditor: React.Dispatch<React.SetStateAction<string>>
    plataformas: string
    setPlataformas: React.Dispatch<React.SetStateAction<string>>
}

export function TextSetsFichaTecnica(props: TextSetsFichaTecnicaProps) {

    return (
        <>
            <TextSet
                idText='desarrollador'
                labelText='Desarrollador'
                varText={props.desarrollador}
                setVarText={props.setDesarrollador}

            />
            <TextSet
                idText='editor'
                labelText='Editor'
                varText={props.editor}
                setVarText={props.setEditor}
            />

            <TextSet
                idText='plataformas'
                labelText='Plataformas'
                varText={props.plataformas}
                setVarText={props.setPlataformas}
            />

        </>
    )
}