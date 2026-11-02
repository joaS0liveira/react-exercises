import { create } from "zustand"
import { type CartItem } from "../types/cart"

//LOGICA: o contrato da store — dados (items) + ações com nomes do domínio
interface CartStore {
    items: CartItem[],
    addItem: (product: CartItem) => void,
    increaseQuantity: (id: string) => void,
    decreaseQuantity: (id: string) => void,
    removeItem: (id: string) => void,
    clearCart: () => void
}

// Quem precisa do carrinho só importa este hook; não há props pelo meio
export const useCartStore = create<CartStore>((set) => ({
    items: [],

    // se o artigo já está no carrinho, só soma uma unidade
    addItem: (product) =>
        set((state) => {
            const existing = state.items.find((item) => item.id === product.id)

            return existing === undefined
                ? { items: [...state.items, product] }
                : { items: state.items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) }
        }),

    increaseQuantity: (id) =>
        set((state) => ({
            items: state.items.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item),
        })),

    //map tira uma unidade, filter deixa fora o que ficou a zero
    decreaseQuantity: (id) =>
        set((state) => ({
            items: state.items
                .map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter((item) => item.quantity > 0),
        })),

    removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

    clearCart: () => set({ items: [] }),
}))
