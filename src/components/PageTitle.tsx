interface PageTitleProps {
    title: string
}

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <h1 className="text-2xl font-bold text-stone-800">
            {title}
        </h1>
    )
}
