import { useState } from "react";

export function useReviewForm() {
  const [sinopsis, setSinopsis] = useState("");
  const [historia, setHistoria] = useState("");
  const [logros, setLogros] = useState("");
  const [mecanicas, setMecanicas] = useState("");
  const [conclusiones, setConclusiones] = useState("");
  const isValid = () =>
    [sinopsis, historia, logros, mecanicas, conclusiones].every(v => v.trim());

  return {
    sinopsis, setSinopsis,
    historia, setHistoria,
    logros, setLogros,
    mecanicas, setMecanicas,
    conclusiones, setConclusiones,
    isValid
  };
}

