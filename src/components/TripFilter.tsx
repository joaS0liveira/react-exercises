import { type ChangeEvent } from "react"

interface TripFilterProps {
    value: string,
    onChange: (value: string) => void
}

export default function TripFilter({ value, onChange }: TripFilterProps) {

    //LOGICA: o input não guarda o texto dele, quem guarda é a App
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value
        onChange(newValue)
    }

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Filtrar por cidade"
            className="w-64 rounded-md border border-stone-300 bg-white px-2 py-1 text-sm outline-none focus:border-stone-500"
        />
    )
}
