import { useState } from "react";

export function useReviewForm() {
  const [sinopsis, setSinopsis] = useState("");
  const [historia, setHistoria] = useState("");
  const [logros, setLogros] = useState("");
  const [mecanicas, setMecanicas] = useState("");
  const [conclusiones, setConclusiones] = useState("");

  return {
    sinopsis, setSinopsis,
    historia, setHistoria,
    logros, setLogros,
    mecanicas, setMecanicas,
    conclusiones, setConclusiones
  };
}