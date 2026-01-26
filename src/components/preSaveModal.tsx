import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import TextSet from "./TextSet";

interface PreSaveModalProps {
    jsonVar: string
    imageFolderVar: string
    setJsonVar: Dispatch<SetStateAction<string>>
    setImageFolderVar: Dispatch<SetStateAction<string>>
    setModalVar: Dispatch<SetStateAction<boolean>>
}

export function PreSaveModal(props: PreSaveModalProps) {
    const [remember, setRemember] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">Detalles de pre-guardado</h2>

                {/* Ejemplo de inputs */}
                <div className="flex flex-col gap-3">
                    <TextSet
                        idText="json-path"
                        labelText="Ruta del JSON"
                        varText={props.jsonVar}
                        setVarText={props.setJsonVar}
                        placeholderText="./data/reviews.json"
                    />

                    <TextSet
                        idText="images-folder"
                        labelText="Carpeta de imágenes"
                        varText={props.imageFolderVar}
                        setVarText={props.setImageFolderVar}
                        placeholderText="./assets/images/"
                    />
                    <label className="flex items-center gap-2 mt-2 text-sm">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={e => setRemember(e.target.checked)}
                        />
                        Recordar estas rutas
                    </label>
                </div>

                <div className="flex justify-end mt-6 gap-3">
                    <button
                        onClick={() => props.setModalVar(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            props.setModalVar(false);
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    )
}