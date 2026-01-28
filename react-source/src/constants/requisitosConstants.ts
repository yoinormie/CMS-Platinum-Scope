import { useState } from "react";

export function useRequirementsForm() {
    const [so, setSO] = useState("");
    const [cpu, setCpu] = useState("");
    const [ram, setRam] = useState("");
    const [gpu, setGpu] = useState("");
    const [directX, setDirectx] = useState("");
    const [red, setRed] = useState("");
    const [disco, setDisco] = useState("");
    const [notas, setNotas] = useState("");
    const isValid = () =>
        [so, cpu, ram, gpu, disco].every(v => v.trim());

    return {
        so, setSO,
        cpu, setCpu,
        ram, setRam,
        gpu, setGpu,
        directX, setDirectx,
        red, setRed,
        disco, setDisco,
        notas, setNotas,
        isValid
    };
}