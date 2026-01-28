import { useState } from 'react';
import TextSet from './components/TextSet';
import { TextSetsFichaTecnica } from './components/textSetsFichaTecnica';
import { MinRequirementsSets } from './components/minRequirementsSets';
import { RecRequirementsSets } from './components/recRequirementsSets';
import { TextAreaSetsOpinion } from './components/textAreaSetsOpinion';
import { useRequirementsForm } from './constants/requisitosConstants';
import { useRecursos } from './hooks/recursosHooks';
import { RecursosForm } from './components/recursosForm';
import { useEnlacesCompra } from './hooks/enlaceCompraHooks';
import 'tailwindcss'
import { EnlacesCompraForm } from './components/enlacesForm';
import { PreSaveModal } from './components/preSaveModal';
import { canSaveMainForm } from './utils/validators';
import { useReviewForm } from './constants/opinionConstants';
import { WarningModal } from './components/warningModal';
import { buildReviewJson } from './utils/jsonBuilder';
import { handleAddReview } from './hooks/electronHooks';
import type { SelectedImage } from './types/imageType';


function App() {
  let filePath: string = "";
  const minRequirements = useRequirementsForm()
  const recRequirements = useRequirementsForm();
  const form = useReviewForm()
  const [titulo, setTitulo] = useState("");
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [isPreSaveModalOpen, setIsPreSaveModalOpen] = useState(false);
  const [desarrollador, setDesarrollador] = useState("");
  const [plataformas, setPlataformas] = useState("");
  const [editor, setEditor] = useState("");
  const [jsonPath, setJsonPath] = useState("");
  const [imagesFolder, setImagesFolder] = useState("");
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const resourceForm = useRecursos()
  const enlacesCompraForm = useEnlacesCompra()
  const slug = titulo.toLowerCase().replace(/\s+/g, "_");


  const handleFinalSave = async (jsonPath: string) => {
    const review = buildReviewJson({
      id: titulo.toLowerCase().replace(/\s+/g, "_"),
      titulo,
      imagen: imagesFolder,
      fichaTecnica: {
        plataformas,
        desarrollador,
        editor,
        requisitosMinimos: minRequirements,
        requisitosRecomendados: recRequirements,
        sinopsis: form.sinopsis,
      },
      opinion: form,
      recursos: resourceForm.recursos,
      enlacesCompra: enlacesCompraForm.enlacesCompra,
    });

    await handleAddReview(review, jsonPath);
  };

  const handleSaveImage = async (
    image: { path: string },
    destDir: string,
    slug: string
  ): Promise<string> => {
    const result = await window.api.copyRenameFile(
      image.path,
      destDir,
      slug
    );

    if (!result.success) {
      throw new Error(result.error);
    }

    return result.path!;
  };



  return (

    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gray-50 py-12">

      <header className="w-full flex justify-center mb-16 px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 border-b-2 border-[var(--color-border)] pb-2">
          CMS Platinum Scope
        </h1>
      </header>

      <main className="w-full px-10">

        {isWarningModalOpen && (
          <WarningModal
            isOpen={isWarningModalOpen}
            setIsOpen={setIsWarningModalOpen}
          />
        )}

        <div className='mb-10'>
          <TextSet
            idText='titulo'
            labelText='Titulo'
            varText={titulo}
            setVarText={setTitulo}
            placeholderText='Fortnite'
          />
        </div>

        {/*<ImagePicker
          label='Imagen juego'
          onSelect={(file) => {
            console.log(file.name)
            setSelectedImage(file)}}
        />*/}

        <button
          className='mb-4'
          onClick={async () => {
            filePath = await window.api.openFile();
            if (!filePath) return;

            setSelectedImage({
              name: filePath.split(/[\\/]/).pop()!,
              path: filePath
            } as any);
          }}
        >
          {selectedImage?.name ?? "Seleccionar imagen"}
        </button>
        <br />

        <label className="text-lg font-medium text-gray-700">
          Ficha técnica
        </label>
        <div className="border border-[var(--color-border)] rounded p-4 my-4">
          <TextSetsFichaTecnica
            desarrollador={desarrollador}
            editor={editor}
            plataformas={plataformas}
            setDesarrollador={setDesarrollador}
            setEditor={setEditor}
            setPlataformas={setPlataformas}
          />
          <details className='my-2'>
            <summary className="cursor-pointer font-semibold text-gray-700">
              Requisitos mínimos
            </summary>

            <div className="mt-4 flex flex-col gap-2">
              <MinRequirementsSets form={minRequirements} />
            </div>

          </details>
          <details className='my-2'>
            <summary className="cursor-pointer font-semibold text-gray-700">
              Requisitos recomendados
            </summary>

            <div className="mt-4 flex flex-col gap-2">
              <RecRequirementsSets
                form={recRequirements}
              />
            </div>

          </details>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">

          <TextAreaSetsOpinion form={form} />
        </div>
      </main>

      <button
        className="my-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        onClick={() => resourceForm.addRecurso("video")}
      >
        Añadir recurso
      </button>

      <RecursosForm
        varRecursos={resourceForm}
      />

      <button
        className="my-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        onClick={() => enlacesCompraForm.addEnlaceCompra()}
      >
        Añadir enlace compra
      </button>

      <EnlacesCompraForm
        varEnlaces={enlacesCompraForm}
      />

      <button
        onClick={() => {
          if (canSaveMainForm({
            titulo: titulo,
            selectedImage: selectedImage,
            minRequirements: minRequirements,
            opinion: form,
            enlacesCompra: enlacesCompraForm.enlacesCompra,
            desarrollador: desarrollador,
            editor: editor,
            plataformas: plataformas
          })) {
            setIsPreSaveModalOpen(true)
            return
          }
          setIsWarningModalOpen(true)
        }

        }
        className='mt-14'>Guardar</button>

      {
        isPreSaveModalOpen && (
          <PreSaveModal
            setModalVar={setIsPreSaveModalOpen}
            jsonVar={jsonPath}
            setJsonVar={setJsonPath}
            imageFolderVar={imagesFolder}
            setImageFolderVar={setImagesFolder}
            onSave={handleFinalSave}
            slug={slug}
            selectedImage={selectedImage}
            onSaveImage={handleSaveImage}
          />
        )
      }


    </div >
  );
}

export default App;