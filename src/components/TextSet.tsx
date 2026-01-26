import type { Dispatch, SetStateAction } from "react"

interface TextSetProps {
    varText: string
    setVarText: Dispatch<SetStateAction<string>>

    idText: string
    labelText: string
    placeholderText?: string
}

export default function TextSet(props: TextSetProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor={props.idText} className="mb-2 text-lg font-medium text-gray-700">
                {props.labelText}
            </label>
            <input
                type="text"
                id={props.idText}
                value={props.varText}
                onChange={(e) => props.setVarText(e.target.value)}
                placeholder={props.placeholderText}
                className="w-full border border-[var(--color-border)] rounded px-3 py-2 resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

    )
}