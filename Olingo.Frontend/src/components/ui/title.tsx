type ITitleProps = {
    title: string;
    description?: string;
}

function title({ title, description }: ITitleProps) {
    return (
        <div className="space-y-2 mb-6">
                <h1 className="text-xl font-bold">{title}</h1>
                {description && <p className="text-muted-foreground text-sm">{description}</p> }
        </div>
    );
}

export { title as Title };