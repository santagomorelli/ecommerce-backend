
import { CartFactoryDAO } from '../models/carrito/carrito.factory';
import { TipoPersistencia } from '../models/carrito/carrito.factory';
import { CartI } from '../models/carrito/carrito.interface';
import { UserAPI } from './users';
import { productsAPI } from './productos';
import { argPersistencia } from './../services/process';
import { OrdersFactoryDAO } from '../models/ordenes/ordenes.factory';

const tipo : string = `${argPersistencia}`;

class Cart {
  private carts;
  private orders;

  constructor() {
    this.carts = CartFactoryDAO.get(tipo);
    this.orders = OrdersFactoryDAO.get(tipo);
  }

  async getCart(userId: string): Promise<CartI> {
    return this.carts.get(userId);
  }

  async createCart(userId: string): Promise<CartI> {
    const user = await UserAPI.getUsers(userId);

    if (!user.length)
      throw new Error('Error. Usuario no existe. Carrito no creado');

    const newCart = await this.carts.createCart(userId);
    return newCart;
  }

  async addProduct(
    cartId: string,
    productId: string,
    amount: number
  ): Promise<CartI> {
    const product = (await productsAPI.getProducts(productId))[0];

    const addProduct = {
      _id: productId,
      nombre: product.nombre,
      precio: product.precio,
      amount,
    };

    const updatedCart = await this.carts.addProduct(cartId, addProduct);
    return updatedCart;
  }

  async deleteProudct(cartId: string, productId: string, amount: number) {
    const product = (await productsAPI.getProducts(productId))[0];

    const deleteProduct = {
      _id: productId,
      nombre: product.nombre,
      precio: product.precio,
      amount,
    };

    const updatedCart = await this.carts.deleteProduct(cartId, deleteProduct);
    return updatedCart;
  }

  async emptyCart(cartId:string, userId: string){
    const cart =  await this.carts.emptyCart(cartId, userId);
    return cart;
  }

  async deleteCart(userId: string){
      await this.carts.delete(userId);
  }

 
async addOrder(order: any, userId: string){ 
  const user = await UserAPI.getUsers(userId);
  const oneUser = user[0];
  await this.orders.addOrder(order,oneUser);
  return order;
  }

async getOrders(userId: string){
  const orders = await this.orders.get(userId);
  return orders;
}
}
export const CartAPI = new Cart();