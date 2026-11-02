import { type ReactNode } from "react"
type ButtonVariant = "success" | "warning" | "info" | "danger"

//success = verde
//warning = amarelo/laranja
//info = azul
//danger == vermelho

interface ButtonProps {
    children: ReactNode,
    variant?: ButtonVariant
}

export default function Button({ children, variant }: ButtonProps) {

    //LOGICA
    const success = 'bg-green-300 text-green-700 hover:bg-green-400/60'
    const warning = 'bg-orange-300 text-orange-700 hover:bg-orange-400/60'
    const info = 'bg-blue-300 text-blue-700 hover:bg-blue-400/60'
    const danger = 'bg-red-300 text-red-700 hover:bg-red-400/60'
    const normal = 'bg-stone-300 text-stone-700 hover:bg-stone-400/60'

    //LOGICA: desço pelas opções até chegar no normal, que é o valor quando a variant vem vazia
    const variantClass = variant === "success" ? success
        : variant === "warning" ? warning
        : variant === "info" ? info
        : variant === "danger" ? danger
        : normal

    return (
        <>
            <button className={`${variantClass} rounded-md px-2 py-1 text-sm font-medium hover:cursor-pointer transition-all`}>
                {children}
            </button>
        </>
    )
}