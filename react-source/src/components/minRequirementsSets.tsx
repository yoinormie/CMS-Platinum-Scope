import TextSet from "./TextSet"
import { useRequirementsForm } from "../constants/requisitosConstants"

export function MinRequirementsSets() {
    const minRequirements = useRequirementsForm();
    return (
        <>
            <TextSet
                idText='min_so'
                labelText='SO'
                varText={minRequirements.so}
                setVarText={minRequirements.setSO}
            />
            <TextSet
                idText='min_cpu'
                labelText='CPU'
                varText={minRequirements.cpu}
                setVarText={minRequirements.setCpu}
            />
            <TextSet
                idText='min_ram'
                labelText='RAM'
                varText={minRequirements.ram}
                setVarText={minRequirements.setRam}
            />
            <TextSet
                idText='min_gpu'
                labelText='GPU'
                varText={minRequirements.gpu}
                setVarText={minRequirements.setGpu}
            />
            <TextSet
                idText='min_directx'
                labelText='DirectX'
                varText={minRequirements.directX}
                setVarText={minRequirements.setDirectx}
            />
            <TextSet
                idText='min_red'
                labelText='Red'
                varText={minRequirements.red}
                setVarText={minRequirements.setRed}
            />
            <TextSet
                idText='min_disco'
                labelText='Disco'
                varText={minRequirements.disco}
                setVarText={minRequirements.setDisco}
            />
            <TextSet
                idText='min_notas'
                labelText='Notas'
                varText={minRequirements.notas}
                setVarText={minRequirements.setNotas}
            />
        </>
    )
}