import { useState } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import TextAreaSet from './components/textAreaSet';
import 'tailwindcss'

function App() {
  const [sinposis, setSinopsis] = useState("");
  const [historia, setHistoria] = useState("");
  const [logros, setLogros] = useState("");
  const [mecanicas, setMecanicas] = useState("");
  const [conclusiones, setConclusiones] = useState("");

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
        <br/>
      </header>

      {/* Cambiamos max-w-6xl por w-full */}
      <main className="w-full px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          <TextAreaSet
            idTextArea='sinopsis'
            labelText='Sinopsis'
            onChangeFunction={handleInput}
            varText={sinposis}
            setVarText={setSinopsis}
            placeholderTextArea='¿De qué va el juego?'
          />

          <TextAreaSet
            idTextArea='historia'
            labelText='Historia'
            onChangeFunction={handleInput}
            varText={historia}
            setVarText={setHistoria}
            placeholderTextArea='¿Cómo ves la historia?'
          />

          <TextAreaSet
            idTextArea='logros'
            labelText='Logros'
            onChangeFunction={handleInput}
            varText={logros}
            setVarText={setLogros}
            placeholderTextArea='¿Cómo te han parecido en general los logros?'
          />

          <TextAreaSet
            idTextArea='mecanicas'
            labelText='Mecanicas'
            onChangeFunction={handleInput}
            varText={mecanicas}
            setVarText={setMecanicas}
            placeholderTextArea='¿Cómo se sintió jugarlo?'
          />

          <TextAreaSet
            idTextArea='conclusiones'
            labelText='Conclusiones'
            onChangeFunction={handleInput}
            varText={conclusiones}
            setVarText={setConclusiones}
            placeholderTextArea='¿Resumen de todo lo anterior?'
          />

        </div>
      </main>

    </div>
  );
}

export default App;