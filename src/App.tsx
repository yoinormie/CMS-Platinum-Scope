import { useState } from 'react';
import TextSet from './components/TextSet';
import { TextSetsFichaTecnica } from './components/textSetsFichaTecnica';
import { MinRequirementsSets } from './components/minRequirementsSets';
import { RecRequirementsSets } from './components/recRequirementsSets';
import { TextAreaSetsOpinion } from './components/textAreaSetsOpinion';
import { useRecursos } from './hooks/recursosHooks';
import { RecursosForm } from './components/recursosForm';
import { useEnlacesCompra } from './hooks/enlaceCompraHooks';
import 'tailwindcss'
import { EnlacesCompraForm } from './components/enlacesForm';
import { PreSaveModal } from './components/preSaveModal';
import ImagePicker from './components/filePicker';


function App() {
  const [titulo, setTitulo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonPath, setJsonPath] = useState("");
  const [imagesFolder, setImagesFolder] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const resourceForm = useRecursos()
  const enlacesCompraForm = useEnlacesCompra()

  return (

    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gray-50 py-12">

      <header className="w-full flex justify-center mb-16 px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 border-b-2 border-[var(--color-border)] pb-2">
          CMS Platinum Scope
        </h1>
      </header>

      <main className="w-full px-10">
        <div className='mb-10'>
          <TextSet
            idText='titulo'
            labelText='Titulo'
            varText={titulo}
            setVarText={setTitulo}
            placeholderText='Fortnite'
          />
        </div>

        <ImagePicker
          label='Imagen juego'
          onSelect={(file) => setSelectedImage(file)}
        />

        <label className="text-lg font-medium text-gray-700">
          Ficha técnica
        </label>
        <div className="border border-[var(--color-border)] rounded p-4 my-4">
          <TextSetsFichaTecnica />
          <details className='my-2'>
            <summary className="cursor-pointer font-semibold text-gray-700">
              Requisitos mínimos
            </summary>

            <div className="mt-4 flex flex-col gap-2">
              <MinRequirementsSets />
            </div>

          </details>
          <details className='my-2'>
            <summary className="cursor-pointer font-semibold text-gray-700">
              Requisitos recomendados
            </summary>

            <div className="mt-4 flex flex-col gap-2">
              <RecRequirementsSets />
            </div>

          </details>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">

          <TextAreaSetsOpinion />
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
        onClick={() => setIsModalOpen(true)}
        className='mt-14'>Guardar</button>

      {isModalOpen && (
        <PreSaveModal
          setModalVar={setIsModalOpen}
          jsonVar={jsonPath}
          setJsonVar={setJsonPath}
          imageFolderVar={imagesFolder}
          setImageFolderVar={setImagesFolder}
        />
      )}


    </div>
  );
}

export default App;