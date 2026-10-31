nterface PageTitleProps {
    title: string
}

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <h1 className="text-3xl font-bold text-neutral-900 border-b-4 border-blue-900 pb-2 mb-6">
            {title}
        </h1>
    )
}