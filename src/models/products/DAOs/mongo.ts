import mongoose, {Connection} from 'mongoose';
import {
  newProductI,
  ProductI,
  ProductC,
  ProductBaseClass,
  ProductQuery,
} from '../products.interface';
import Config from '../../../config/index';

const productsSchema = new mongoose.Schema<ProductI>({
  nombre: String,
  precio: Number,
  stock: Number,
  codigo: Number,
  descripcion: String,
  thumbnail: String,
});

mongoose.Promise = global.Promise;

export class ProductosAtlasDAO implements ProductBaseClass {
  private srv: string;
  private instance: number;
  private connection: Connection;
  private productos: any;
  

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `${Config.MONGOATLAS_SRV}`;
    
  this.instance = 0;

  if(!this.connection) this.connection = mongoose.createConnection(this.srv)
    
    this.productos = mongoose.model<ProductI>('producto', productsSchema);

  }

  async get(id?: string): Promise<ProductI[]> {
    let output: ProductI[] = [];
    try {
      if (id) {
        const document = await this.productos.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.productos.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data: newProductI): Promise<ProductI> {
    if (!data.nombre || !data.precio || !data.descripcion || !data.stock || !data.codigo || !data.thumbnail ) throw new Error('invalid data');

    const newProduct = new this.productos(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    return this.productos.findByIdAndUpdate(id, newProductData);
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id);
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
     if (options.precioMax) return this.productos.find({precio:{$lt:options.precioMax}});
     if (options.precioMin) return this.productos.find({precio:{$gt:options.precioMin}});
     if (options.stockMax) return this.productos.find({precio:{$lt:options.stockMax}});
     if (options.stockMin) return this.productos.find({precio:{$gt:options.stockMin}});
     if (options.codigoMax) return this.productos.find({precio:{$lt:options.codigoMax}});
     if (options.codigoMin) return this.productos.find({precio:{$gt:options.codigoMin}});


     return this.productos.find(options);
  }
}
