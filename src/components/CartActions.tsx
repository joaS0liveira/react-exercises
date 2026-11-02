import { type CartItem } from "../types/cart"
import { useCartStore } from "../stores/cartStore"

//LOGICA: um catálogo fixo, porque o exercício é da store e não de um formulário
const catalog: CartItem[] = [
    { id: "camisa", name: "Camisa", price: 19.99, quantity: 1 },
    { id: "tenis", name: "Ténis", price: 59.9, quantity: 1 },
    { id: "meias", name: "Meias", price: 4.5, quantity: 1 }
]

export default function CartActions() {

    // seleciona só as ações: este componente não precisa de saber o que lá está
    const addItem = useCartStore((state) => state.addItem)
    const clearCart = useCartStore((state) => state.clearCart)

    return (
        <div className="flex flex-wrap gap-2">
            {catalog.map((product) => (
                <button
                    key={product.id}
                    type="button"
                    onClick={() => addItem(product)}
                    className="rounded-md bg-green-300 px-2 py-1 text-sm font-medium text-green-700 transition-all hover:cursor-pointer hover:bg-green-400/60"
                >
                    + {product.name} ({product.price.toFixed(2)} €)
                </button>
            ))}

            <button
                type="button"
                onClick={clearCart}
                className="rounded-md bg-stone-300 px-2 py-1 text-sm font-medium text-stone-700 transition-all hover:cursor-pointer hover:bg-stone-400/60"
            >
                Limpar carrinho
            </button>
        </div>
    )
}
