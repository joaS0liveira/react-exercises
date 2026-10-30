import { type  ReactNode } from "react"



interface CardProps {
    children : ReactNode
    }

export default function Card({ children }: CardProps) {
    return (
    <div className=" bg-neutral-179 p-4  rounded-xl border border-blue-200 flex flex-col gap-2 hover:boarder-neutral-300">
   {children}

</div>
        
  )
    
}