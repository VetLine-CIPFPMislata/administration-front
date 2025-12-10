import { Category } from "./Category";

export interface Articulo {
    id: String,
    name: String,
    productDescription: String,
    category: Category,
    pictureProduct: String,
    quantity: number,
    price: number,
    discountPercentage: number,
    basePrice: number,
    rating: number
}