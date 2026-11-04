import { type ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

export default function Card({ children }: CardProps) {
    return (
        <div className="bg-neutral-100 p-2 rounded-xl border border-neutral-200 flex flex-col gap-2 hover:border-neutral-300">
            {children}
        </div>
    );
}