import moment from "moment";


class Productos {
    nombreLista: string;
    productos: any[];
    carritoLista: any[];
    constructor(nombreLista: string) {
        this.nombreLista = nombreLista;
        this.productos  = [];
        this.carritoLista = [];
    };

    nuevoProducto(title: string, descripcion: string, codigo:number,  thumbnail: string, price: number,stock:number ):any {
       this.productos.push({
            id: this.productos.length + 1,
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
            title: title,
            descripcion: descripcion,
            codigo:codigo,
            thumbnail: thumbnail,
            price: price,
            stock: stock,
        })

    }
    ultimoProducto() {
        let id = this.productos.length - 1;
        return this.productos[id]
    }
    agregarCarrito(id: number) {
        let lista = this.productos;
        let productoAg = lista.find((producto: { id: number; }) => producto.id == id);
         if (productoAg.id == undefined) { return ('404') } 
        else{
            this.carritoLista.push({
                id: productoAg.id,
                timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                producto: [productoAg.title, productoAg.descripcion, productoAg.codigo, productoAg.thumbnail, productoAg.price, productoAg.stock]
            });
            return this.carritoLista;
        };
    }

    listar() {
        let lista = this.productos;
        let length: number = lista.length;
        if ( length !== 0) { return lista } else { return ('Lista vacìa') }
    }
    listarCarrito(){
        let carrito = this.carritoLista
        let length: number = carrito.length;
        if ( length !== 0) { return carrito } else { return ('Carrito vacìo') }
    }

    listarId(id: number) {
        let lista = this.productos;
        let productoId = lista.find((producto: { id: any; }) => producto.id == id);
        if (productoId == undefined) { return ('404') } else { return productoId };

    }
    listarIdCarrito(id: number) {
        let lista = this.carritoLista;
        let productoId = lista.find((producto: { id: any; }) => producto.id == id);
        if (productoId == undefined) { return ('404') } else { return productoId };

    }


    actualizarId(id:number, title: string, descripcion: string, codigo:number,  thumbnail: string, price: number,stock:number) {
        let lista = this.productos;
        let productoAct = lista.find((producto: { id: any; }) => producto.id == id);
        if (productoAct.id == undefined) { return ('404') } else {
            lista = lista.filter((i: { id: any; }) => i.id !== productoAct.id);
            productoAct.timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
            if( title !== undefined){
            productoAct.title = title;}else{
                productoAct.title = productoAct.title;
                console.log('Nombre sin cambios')};
            if( descripcion !== undefined){
            productoAct.descripcion = descripcion;}else{
                productoAct.descripcion = productoAct.descripcion;
                console.log('Descripcion sin cambios')};    
            if( codigo !== NaN){
            productoAct.codigo = codigo;}else{
                productoAct.codigo = productoAct.codigo;
                console.log('Codigo sin cambios')};
            if( price !== NaN){
            productoAct.price = price;}else{
                productoAct.price = productoAct.price;
                console.log('Precio sin cambios')};
            if( thumbnail !== undefined){
            productoAct.thumbnail = thumbnail;}else{
                productoAct.thumbnail = productoAct.thumbnail;
                console.log('Foto sin cambios')};
            if( stock !== NaN){
            productoAct.stock = stock;}else{
                productoAct.stock = productoAct.stock;
                console.log('Stock sin cambios')};
        productoAct.id = id;            
        lista.push(productoAct);
        this.productos = lista;
        return this.productos;
        };
    }

    borrarID(id: number) {
        let lista = this.productos;
        let productoBorr = lista.find((producto: { id: any; }) => producto.id == id);
        if (productoBorr == undefined) { return ('404') } else {
            lista = lista.filter((i: { id: any; }) => i.id !== productoBorr.id);
            this.productos = lista;
            return this.productos;
        };
    }

    borrarIdCarrito(id: number) {
        let carrito = this.carritoLista;
        let productoBorr = carrito.find((producto: { id: any; }) => producto.id == id);
        if (productoBorr == undefined) { return ('404') } else {
            carrito = carrito.filter((i: { id: any; }) => i.id !== productoBorr.id);
            this.carritoLista = carrito;
            return this.carritoLista;
        };
    }

};

export default Productos;
