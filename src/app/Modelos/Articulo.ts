import { Category } from "./Category";

export interface Articulo {
    id: String,
    name: String,
    description: String,
    category: Category,
    image: String,
    quantity: number,
    price: number,
    discountPercentage: number,
    basePrice: number
}