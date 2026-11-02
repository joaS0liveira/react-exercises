interface TabItemProps {
    label: string,
    active: boolean,
    onClick: () => void
}

export default function TabItem({ label, active, onClick }: TabItemProps) {

    //LOGICA: ativa é escura, as outras ficam claras
    const activeTab = "bg-stone-800 text-stone-100"
    const idleTab = "bg-stone-200 text-stone-600 hover:bg-stone-300"

    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`${active ? activeTab : idleTab} rounded-md px-3 py-1 text-sm font-medium hover:cursor-pointer transition-all`}
        >
            {label}
        </button>
    )
}
