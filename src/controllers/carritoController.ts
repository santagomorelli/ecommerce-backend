import { CartAPI } from '../apis/carrito';
import { Request, Response, NextFunction } from 'express';
import { UserI } from '../models/users/users.interface';
import { productsAPI } from '../apis/productos';
import { EmailService } from '../services/email';
import { AnyArray } from 'mongoose';

class Cart {
  async getCartByUser(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);
    res.json(cart);
  }

  async addProduct(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);

    const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    const product = await productsAPI.getProducts(productId);

    if (!product.length)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart = await CartAPI.addProduct(
      cart._id,
      productId,
      parseInt(productAmount)
    );
    res.json({ msg: 'Product added', cart: updatedCart });
  }

  async deleteProduct(req: Request, res: Response) {
    const user: any = req.user;
    const cart = await CartAPI.getCart(user._id);

    const { productId, productAmount } = req.body;

    if (!productId || !productAmount)
      return res.status(400).json({ msg: 'Invalid body parameters' });

    const product = await productsAPI.getProducts(productId);

    if (!product.length)
      return res.status(400).json({ msg: 'product not found' });

    if (parseInt(productAmount) < 0)
      return res.status(400).json({ msg: 'Invalid amount' });

    const updatedCart = await CartAPI.deleteProudct(
      cart._id,
      productId,
      parseInt(productAmount)
    );
    res.json({ msg: 'Product deleted', cart: updatedCart });
  }

  async sendOrder(req:Request, res:Response){
    const user: any = req.user;
    const order: any = await CartAPI.getCart(user._id);
    await EmailService.sendEmail(user.email,'New order', `${order}`);
    await CartAPI.addOrder(order, user._id);
    await CartAPI.emptyCart(order._id, user._id);
    return res.status(200).json({msg:`Orden enviada ${order}`})
  }
}

export const CartController = new Cart();