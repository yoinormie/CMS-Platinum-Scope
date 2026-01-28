import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import PickRouteTextSet from "./PickRouteTextSet";
import { useEffect } from "react";
import { getStorePath, setStorePath } from "../hooks/electronHooks";
import { canSaveLastForm } from "../utils/validators";
import { WarningModal } from "./warningModal";
import type { SelectedImage } from "../types/imageType";

interface PreSaveModalProps {
    jsonVar: string;
    imageFolderVar: string;
    selectedImage: SelectedImage | null;
    slug: string;
    setJsonVar: Dispatch<SetStateAction<string>>;
    setImageFolderVar: Dispatch<SetStateAction<string>>;
    setModalVar: Dispatch<SetStateAction<boolean>>;
    onSave: (jsonPath: string) => Promise<void>;
    onSaveImage: (
        image: SelectedImage,
        destDir: string,
        slug: string
    ) => Promise<string>;
}

export function PreSaveModal(props: PreSaveModalProps) {
    const [remember, setRemember] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    useEffect(() => {
        getStorePath("lastFile").then((p) => {
            if (p) props.setJsonVar(p);
        });
        getStorePath("lastDirectory").then((p) => {
            if (p) props.setImageFolderVar(p);
        });
    }, []);

    const handleSave = async () => {
        if (remember) {
            if (props.jsonVar) await setStorePath("lastFile", props.jsonVar);
            if (props.imageFolderVar) await setStorePath("lastDirectory", props.imageFolderVar);
        }

        if (canSaveLastForm({ jsonPath: props.jsonVar, imagePath: props.imageFolderVar })) {
            if (!props.selectedImage) throw new Error("No hay imagen seleccionada");
            await props.onSaveImage(
                props.selectedImage,
                props.imageFolderVar,
                props.slug
            );
            await props.onSave(props.jsonVar);
            props.setModalVar(false);
            props.setImageFolderVar("");
            props.setJsonVar("");
            return;
        }

        setIsWarningModalOpen(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">Detalles de pre-guardado</h2>

                {isWarningModalOpen && (
                    <WarningModal
                        isOpen={isWarningModalOpen}
                        setIsOpen={setIsWarningModalOpen}
                        message="Pon las rutas, son necesarias."
                    />
                )}

                <div className="flex flex-col gap-3">
                    <p className="text-xs color-grey border-b">Recuerda que el json y la carpeta tienen que estar en el mismo repositorio.</p>
                    <PickRouteTextSet
                        idText="json-path"
                        labelText="Ruta del JSON"
                        varText={props.jsonVar}
                        setVarText={props.setJsonVar}
                        placeholderText="./data/reviews.json"
                        typePicker="file"
                    />

                    <PickRouteTextSet
                        idText="images-folder"
                        labelText="Carpeta de imágenes"
                        varText={props.imageFolderVar}
                        setVarText={props.setImageFolderVar}
                        placeholderText="./assets/images/"
                        typePicker="directory"
                    />

                    <PickRouteTextSet
                        idText="images-folder"
                        labelText="Raíz del repositorio"
                        varText={props.imageFolderVar}
                        setVarText={props.setImageFolderVar}
                        placeholderText="./assets/images/"
                        typePicker="directory"
                    />

                    <label className="flex items-center gap-2 mt-2 text-sm">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
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
                        onClick={async () => {
                            await handleSave();
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}