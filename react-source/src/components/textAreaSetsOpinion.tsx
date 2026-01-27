import TextAreaSet from "./textAreaSet"
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useReviewForm } from '../constants/opinionConstants'

const handleInput = (e: ChangeEvent<HTMLTextAreaElement>, setter: Dispatch<SetStateAction<string>>) => {
    setter(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

export function TextAreaSetsOpinion() {
    const form = useReviewForm();
    return (
    <>
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

    </>
    )
}