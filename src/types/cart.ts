// Um artigo do carrinho (o id vem do catálogo, não é gerado na store)
export interface CartItem {
    id: string,
    name: string,
    price: number,
    quantity: number
}
