import { useCartStore } from "../stores/cartStore"

export default function CartPanel() {

    // seleciona só a fatia de estado de que este componente precisa
    const items = useCartStore((state) => state.items)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
    const removeItem = useCartStore((state) => state.removeItem)

    //LOGICA: o total é derivado, por isso nasce aqui no render e não dentro da store
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="flex flex-col gap-2">
            {items.length === 0 ? (
                <p className="text-sm text-stone-500">O carrinho está vazio.</p>
            ) : (
                <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white p-2">
                            <span className="text-sm text-stone-800">{item.name}</span>

                            <span className="flex items-center gap-2 text-sm text-stone-600">
                                <button
                                    type="button"
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="rounded-md bg-stone-200 px-2 py-1 hover:cursor-pointer hover:bg-stone-300"
                                >
                                    −
                                </button>
                                {item.quantity}
                                <button
                                    type="button"
                                    onClick={() => increaseQuantity(item.id)}
                                    className="rounded-md bg-stone-200 px-2 py-1 hover:cursor-pointer hover:bg-stone-300"
                                >
                                    +
                                </button>
                            </span>

                            <span className="text-sm font-semibold text-stone-800">{(item.price * item.quantity).toFixed(2)} €</span>

                            <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="rounded-md bg-red-300 px-2 py-1 text-sm font-medium text-red-700 transition-all hover:cursor-pointer hover:bg-red-400/60"
                            >
                                Tirar
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <p className="text-sm font-semibold text-stone-800">Total: {total.toFixed(2)} €</p>
        </div>
    )
}
