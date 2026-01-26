import type { ChangeEvent, Dispatch, SetStateAction } from "react"

interface TextAreaSetProps {
    varText: string
    setVarText: Dispatch<SetStateAction<string>>
    onChangeFunction: (e: ChangeEvent<HTMLTextAreaElement>, setter: Dispatch<SetStateAction<string>>) => void
    idTextArea: string
    labelText: string
    placeholderTextArea?: string
}

export default function TextAreaSet (props: TextAreaSetProps){
    return (
        <div className="flex flex-col">
          <label htmlFor={props.idTextArea} className="mb-2 text-lg font-medium text-gray-700">
            {props.labelText}
          </label>
          <textarea
            id={props.idTextArea}
            value={props.varText}
            rows={3}
            cols={120}
            placeholder={props.placeholderTextArea}
            onChange={(e) => props.onChangeFunction(e, props.setVarText)}
            className="w-full border border-[var(--color-border)] rounded px-3 py-2 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

    )
}