import { useState } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import TextAreaSet from './components/textAreaSet';
import TextSet from './components/TextSet';
import { useReviewForm } from './constants/opinionConstants'
import 'tailwindcss'

function App() {
  const [titulo, setTitulo] = useState("");
  const form = useReviewForm()

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>, setter: Dispatch<SetStateAction<string>>) => {
    setter(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (

    <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-gray-50 py-12">

      <header className="w-full flex justify-center mb-16 px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 border-b-2 pb-2">
          CMS Platinum Scope
        </h1>
        <br />
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

        <label className="mb-100 text-lg font-medium text-gray-700">
                Ficha técnica
        </label>
        <details className="border rounded p-4">
          <summary className="cursor-pointer font-semibold text-gray-700">
            Requisitos mínimos
          </summary>

          <div className="mt-4 flex flex-col gap-2">
            
          </div>
        </details>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          <TextAreaSet
            idTextArea='sinopsis'
            labelText='Sinopsis'
            onChangeFunction={handleInput}
            varText={form.sinopsis}
            setVarText={form.setSinopsis}
            placeholderTextArea='¿De qué va el juego?'
          />

          <TextAreaSet
            idTextArea='historia'
            labelText='Historia'
            onChangeFunction={handleInput}
            varText={form.historia}
            setVarText={form.setHistoria}
            placeholderTextArea='¿Cómo ves la historia?'
          />

          <TextAreaSet
            idTextArea='logros'
            labelText='Logros'
            onChangeFunction={handleInput}
            varText={form.logros}
            setVarText={form.setLogros}
            placeholderTextArea='¿Cómo te han parecido en general los logros?'
          />

          <TextAreaSet
            idTextArea='mecanicas'
            labelText='Mecanicas'
            onChangeFunction={handleInput}
            varText={form.mecanicas}
            setVarText={form.setMecanicas}
            placeholderTextArea='¿Cómo se sintió jugarlo?'
          />

          <TextAreaSet
            idTextArea='conclusiones'
            labelText='Conclusiones'
            onChangeFunction={handleInput}
            varText={form.conclusiones}
            setVarText={form.setConclusiones}
            placeholderTextArea='¿Resumen de todo lo anterior?'
          />

        </div>
      </main>
      <button className='mt-20'>Guardar</button>
    </div>
  );
}

export default App;