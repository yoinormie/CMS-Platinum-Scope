import TextSet from "./TextSet"
import { useRequirementsForm } from "../constants/requisitosConstants"

export function RecRequirementsSets() {
    const recRequirements = useRequirementsForm();
    return (
        <>
            <TextSet
                idText='rec_so'
                labelText='SO'
                varText={recRequirements.so}
                setVarText={recRequirements.setSO}
            />
            <TextSet
                idText='rec_cpu'
                labelText='CPU'
                varText={recRequirements.cpu}
                setVarText={recRequirements.setCpu}
            />
            <TextSet
                idText='rec_ram'
                labelText='RAM'
                varText={recRequirements.ram}
                setVarText={recRequirements.setRam}
            />
            <TextSet
                idText='rec_gpu'
                labelText='GPU'
                varText={recRequirements.gpu}
                setVarText={recRequirements.setGpu}
            />
            <TextSet
                idText='rec_directx'
                labelText='DirectX'
                varText={recRequirements.directX}
                setVarText={recRequirements.setDirectx}
            />
            <TextSet
                idText='rec_red'
                labelText='Red'
                varText={recRequirements.red}
                setVarText={recRequirements.setRed}
            />
            <TextSet
                idText='rec_disco'
                labelText='Disco'
                varText={recRequirements.disco}
                setVarText={recRequirements.setDisco}
            />
            <TextSet
                idText='rec_notas'
                labelText='Notas'
                varText={recRequirements.notas}
                setVarText={recRequirements.setNotas}
            />
        </>
    )
}
