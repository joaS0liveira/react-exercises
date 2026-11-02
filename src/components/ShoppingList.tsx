import { useState, type ChangeEvent } from "react"
import { type ShoppingItem } from "../types/shopping"

//LOGICA: os dois campos do formulário vivem juntos num state só
interface ShoppingForm {
    name: string,
    quantity: number
}

export default function ShoppingList() {

    // Passo 1: a lista começa vazia
    const [items, setItems] = useState<ShoppingItem[]>([])
    const [form, setForm] = useState<ShoppingForm>({ name: "", quantity: 1 })

    // Passo 2: "Adicionar" monta o item novo com picked: false e junta-o aos que já existem
    function handleAdd() {
        if (form.name === "") {
            return
        }

        const newItem: ShoppingItem = {
            id: crypto.randomUUID(),
            name: form.name,
            quantity: form.quantity,
            picked: false
        }

        setItems((current) => [...current, newItem])
        setForm({ name: "", quantity: 1 })
    }

    // Passo 3: "Comprar" percorre a lista e só muda o item cujo id bate (map + spread)
    function handleBuy(id: string) {
        setItems((current) => current.map((item) => item.id === id ? { ...item, picked: true } : item))
    }

    // Passo 4: "Tirar" deixa ficar tudo o que não é o item clicado (filter)
    function handleRemove(id: string) {
        setItems((current) => current.filter((item) => item.id !== id))
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, name: event.target.value })
    }

    function handleQuantityChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value === "" ? 1 : Number(event.target.value)
        setForm({ ...form, quantity: value })
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={form.name}
                    onChange={handleNameChange}
                    placeholder="O que comprar?"
                    className="flex-1 rounded-md border border-neutral-300 px-2 py-1 text-sm"
                />
                <input
                    type="number"
                    min={1}
                    value={form.quantity}
                    onChange={handleQuantityChange}
                    className="w-20 rounded-md border border-neutral-300 px-2 py-1 text-sm"
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="rounded-md bg-stone-800 px-3 py-1 text-sm font-medium text-stone-100 transition-all hover:cursor-pointer hover:bg-stone-700"
                >
                    Adicionar
                </button>
            </div>

            {items.length === 0 ? (
                <p className="text-sm text-stone-500">A lista está vazia.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-2">
                            <span
                                className="text-sm text-stone-800"
                                style={{ textDecoration: item.picked ? "line-through" : "none" }}
                            >
                                {item.quantity} × {item.name}
                            </span>
                            <span className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleBuy(item.id)}
                                    className="rounded-md bg-green-300 px-2 py-1 text-sm font-medium text-green-700 transition-all hover:cursor-pointer hover:bg-green-400/60"
                                >
                                    Comprar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(item.id)}
                                    className="rounded-md bg-red-300 px-2 py-1 text-sm font-medium text-red-700 transition-all hover:cursor-pointer hover:bg-red-400/60"
                                >
                                    Tirar
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
