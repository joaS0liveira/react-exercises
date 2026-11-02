import { type ReactNode } from "react"
import TabItem from "./TabItem"

interface TabProps {
    label: string,
    active: boolean,
    onClick: () => void,
    children: ReactNode
}

export default function Tab({ label, active, onClick, children }: TabProps) {

    return (
        <div className="w-full flex flex-col">
            <TabItem label={label} active={active} onClick={onClick} />
            {active ? children : null}
        </div>
    )
}
