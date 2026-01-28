import { useEffect } from "react";

interface WarningModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  message?: string;
}

export function WarningModal({ isOpen, setIsOpen, message = "Faltan elementos necesarios para la review" }: WarningModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    
      <div className="bg-red-200 border-l-4 border-red-500 text-red-900 my-6 px-6 py-4 rounded shadow-lg w-80vw">
        <div className="flex flex-row justify-between items-center">
          <p className="text-left text-lg">{message}</p>
          <button
            onClick={() => setIsOpen(false)}
            className="self-end px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Cerrar
          </button>
        </div>
      </div>
  );
}
