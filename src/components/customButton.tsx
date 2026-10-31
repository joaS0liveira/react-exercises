import { type ReactNode } from "react"
import type { ButtonVariant } from "../utils/types"

interface ButtonProps {
    variant: ButtonVariant
    children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
    warning: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-black hover:bg-gray-900 text-white",
    info: "bg-blue-900 hover:bg-blue-950 text-white",
    success: "bg-white hover:bg-gray-100 text-black border border-gray-300",
}

export default function CustomButton({ variant, children }: ButtonProps) {
    return (
        <button className={`px-4 py-2 rounded-xl font-semibold ${variantClasses[variant]}`}>
            {children}
        </button>
    )
}