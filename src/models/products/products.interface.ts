export interface newProductI {
  nombre?: string;
  precio?: number;
  stock?: number;
  codigo?: number;
  descripcion?: string;
  thumbnail?: string;
  }
  
  export interface ProductI {
    idInternal?: string;
    _id?: string;
    nombre: string;
    precio: number;
    stock: number;
    codigo: number;
    descripcion?: string;
    thumbnail?: string
    fYh? : string;
  }

  export interface ProductC{
    _id: string;
    timestamp: string;
    producto?: any;
  }
  

  export interface ProductQuery {
    nombre?: string;
    precio?: number;
    precioMin?: number;
    precioMax?: number;
    stockMin?: number;
    stockMax?: number;
    codigoMin?: number;
    codigoMax?: number;
  }
  
  export interface ProductBaseClass {
    get(id?: string | undefined): Promise<ProductI[]>;
    add(data: newProductI): Promise<ProductI>;
    update(id: string, newProductData: newProductI): Promise<ProductI>;
    delete(id: string): Promise<void>;
    query(options: ProductQuery): Promise<ProductI[]>;
    getCart?(id?: string): Promise<ProductC[]>;
    addCart?(data: ProductI): Promise<ProductC>;
    deleteCart?(id: string): Promise<void>;
  }

  