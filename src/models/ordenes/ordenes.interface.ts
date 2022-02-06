import { CartI, ProductCart, productReference } from './../carrito/carrito.interface'

export interface OrderI {
    _id: string,
    userId: productReference,
    products: ProductCart[],
    date: Date,
    direccion: String
}
export interface OrdersBaseClass {
    get(userId: string):Promise<any>;
    addOrder(order:CartI, user: any): Promise<void>;
  }
  
  