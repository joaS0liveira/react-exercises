import { useCartStore } from "../stores/cartStore"

export default function CartBadge() {

    //LOGICA: o topo vai buscar a quantidade direto à store; a store é a fonte de verdade
    const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0))

    return (
        <span className="rounded-md bg-stone-800 px-3 py-1 text-sm font-medium text-stone-100">
            Carrinho: {itemCount} {itemCount === 1 ? "item" : "itens"}
        </span>
    )
}
