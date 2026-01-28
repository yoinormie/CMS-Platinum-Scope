import TextSet from "./TextSet";
import { useRequirementsForm } from "../constants/requisitosConstants";

type Props = {
    form: ReturnType<typeof useRequirementsForm>;
};

export function MinRequirementsSets({ form }: Props) {
    return (
        <>
            <TextSet
                idText="min_so"
                labelText="SO"
                varText={form.so}
                setVarText={form.setSO}
            />

            <TextSet
                idText="min_cpu"
                labelText="CPU"
                varText={form.cpu}
                setVarText={form.setCpu}
            />

            <TextSet
                idText="min_ram"
                labelText="RAM"
                varText={form.ram}
                setVarText={form.setRam}
            />

            <TextSet
                idText="min_gpu"
                labelText="GPU"
                varText={form.gpu}
                setVarText={form.setGpu}
            />

            <TextSet
                idText="min_directx"
                labelText="DirectX"
                varText={form.directX}
                setVarText={form.setDirectx}
            />

            <TextSet
                idText="min_red"
                labelText="Red"
                varText={form.red}
                setVarText={form.setRed}
            />

            <TextSet
                idText="min_disco"
                labelText="Disco"
                varText={form.disco}
                setVarText={form.setDisco}
            />

            <TextSet
                idText="min_notas"
                labelText="Notas"
                varText={form.notas}
                setVarText={form.setNotas}
            />
        </>
    );
}
