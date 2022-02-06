import mongoose, { Schema } from 'mongoose';
import Config from '../../../config';
import { OrderI, OrdersBaseClass } from '../ordenes.interface';
import moment from 'moment';

const orderSchema = new mongoose.Schema<OrderI>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: false,
  },
  products: [
    {
      _id: Schema.Types.ObjectId,
      amount: Number,
    },
  ],
  date: {
    type: Date,
  }
});

export class OrdersAtlasDAO implements OrdersBaseClass {
  private srv: string;
  private orders;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else this.srv = `${Config.MONGOATLAS_SRV}`;
    mongoose.connect(this.srv);
    this.orders = mongoose.model<OrderI>('order', orderSchema);
  }

  async addOrder(order: OrderI, user: any): Promise<void> {
    const newOrder = {
      userId: user._id,
      products: order.products,
      date: moment().format(),
      direccion: user.adress
    }
    
    const ordenLista = new this.orders(newOrder)  
    await ordenLista.save()
  }
  
  async get(userId: string): Promise<any> {

    if (!userId) return this.orders;
    
    const orderById = await this.orders.findOne({userId});
    return orderById;
  }
  
}
    