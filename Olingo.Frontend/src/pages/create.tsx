import CreateContainerForm from "@/components/forms/createContainerForm";

export default function CreateContainer() {
    return (
        <section className="px-4">
            <div className="space-y-2 mb-6">
                <h1 className="text-2xl font-bold">Create a new container</h1>
                <p className="text-muted-foreground">Configure your container with labels and metadata</p>
            </div>
            <CreateContainerForm />
        </section>
    );
}