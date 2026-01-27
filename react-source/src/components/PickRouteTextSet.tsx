interface PickRouteTextSetProps {
  varText: string;
  setVarText: (value: string) => void;
  idText: string;
  labelText: string;
  placeholderText?: string;
  typePicker?: 'file' | 'directory';
}

export default function PickRouteTextSet(props: PickRouteTextSetProps) {
  const handleClick = async () => {
    let selectedPath: string | null = null;

    if (props.typePicker === 'directory') {
      selectedPath = await window.api.openDirectory();
    } else {
      // por defecto 'file'
      selectedPath = await window.api.openFile();
    }

    if (selectedPath) {
      props.setVarText(selectedPath);
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={props.idText} className="mb-2 text-lg font-medium text-gray-700">
        {props.labelText}
      </label>
      <input
        type="text"
        id={props.idText}
        value={props.varText}
        readOnly
        onClick={handleClick}
        placeholder={props.placeholderText}
        className="w-full border border-[var(--color-border)] rounded px-3 py-2 resize-none overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
