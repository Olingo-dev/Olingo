import CreateContainerForm from "@/components/forms/createContainerForm";
import { Title } from "@/components/ui/title";

export default function CreateContainer() {
    return (
        <section className="px-4">
            <Title title="Create a new container" description="Fill in the details below to create a new container." />
            <CreateContainerForm />
        </section>
    );
}