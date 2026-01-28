import TextSet from "./TextSet"
import { useRequirementsForm } from "../constants/requisitosConstants"

type Props = {
    form: ReturnType<typeof useRequirementsForm>;
};

export function RecRequirementsSets({ form }: Props) {
    return (
        <>
            <TextSet
                idText="rec_so"
                labelText="SO"
                varText={form.so}
                setVarText={form.setSO}
            />
            <TextSet
                idText="rec_cpu"
                labelText="CPU"
                varText={form.cpu}
                setVarText={form.setCpu}
            />
            <TextSet
                idText="rec_ram"
                labelText="RAM"
                varText={form.ram}
                setVarText={form.setRam}
            />
            <TextSet
                idText="rec_gpu"
                labelText="GPU"
                varText={form.gpu}
                setVarText={form.setGpu}
            />
            <TextSet
                idText="rec_directx"
                labelText="DirectX"
                varText={form.directX}
                setVarText={form.setDirectx}
            />
            <TextSet
                idText="rec_red"
                labelText="Red"
                varText={form.red}
                setVarText={form.setRed}
            />
            <TextSet
                idText="rec_disco"
                labelText="Disco"
                varText={form.disco}
                setVarText={form.setDisco}
            />
            <TextSet
                idText="rec_notas"
                labelText="Notas"
                varText={form.notas}
                setVarText={form.setNotas}
            />
        </>
    )
}
