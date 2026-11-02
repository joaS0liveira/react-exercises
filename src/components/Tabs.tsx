import { type ReactNode } from "react"
import TabItem from "./TabItem"

interface TabOption {
    key: string,
    label: string,
    content: ReactNode
}

interface TabsProps {
    tabs: TabOption[],
    activeTab: string,
    onChangeTab: (key: string) => void
}

// A tab ativa vem por props: quem guarda o state é a App (fonte de verdade do ex. 13/14)
export default function Tabs({ tabs, activeTab, onChangeTab }: TabsProps) {

    //LOGICA: o item cuja key bate com a tab ativa é o que vai ser mostrado no painel
    const currentTab = tabs.find((tab) => tab.key === activeTab)

    return (
        <div className="flex flex-col gap-3">
            {/* os botões ficam lado a lado porque este container é um flex na horizontal */}
            <div className="flex gap-2">
                {tabs.map((tab) => (
                    <TabItem
                        key={tab.key}
                        label={tab.label}
                        active={tab.key === activeTab}
                        onClick={() => onChangeTab(tab.key)}
                    />
                ))}
            </div>

            {currentTab !== undefined ? (
                <div className="flex flex-col gap-2">
                    {currentTab.content}
                </div>
            ) : null}
        </div>
    )
}
