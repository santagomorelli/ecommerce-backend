import { productsAPI } from "../apis/productos";
import { UserAPI } from "../apis/users";
import { CartAPI } from "../apis/carrito";


const socketIo = require('socket.io');

let historialChat: any = [];

class SocketService {
    io: any;
    async initSocket(server: any) {
        if (!this.io) {
            this.io = socketIo(server);
            this.io.on('connect', (socket: any) => {
                  console.log('nueva conexion');

                  socket.on('chat', (data: any) => {
                  async function switchConAsync(data: any) {
                        const username = data.email;
                        const user = await UserAPI.query(username);
                        const userId = user._id;                         
                    switch (data.mensaje){
                        case 'ORDEN':
                                const ordenes = await CartAPI.getOrders(userId);
                                data = { email: 'BOT', mensaje: `${ordenes}`};
                                historialChat.push(data);
                                socket.emit('historialChat', historialChat);
                                break;
                        case 'STOCK':
                                data = { email: 'BOT', mensaje:`Ingresar "STOCK (id del producto)" sin parenstesis`};
                                historialChat.push(data);
                                socket.emit('historialChat', historialChat);
                                break;                                
                        case data.mensaje.match(/^STOCK/)?.input:
                                const mensaje = data.mensaje.replace(/ /g,"").substring(5);
                                const producto: any = await productsAPI.getProducts(mensaje);
                                data = { email: 'BOT', mensaje: `Quedan ${producto[0].stock} unidades de ${producto[0].nombre}`};
                                historialChat.push(data);
                                socket.emit('historialChat', historialChat);                            
                                break;
                        case 'CARRITO':
                                const carrito = await CartAPI.getCart(userId);
                                data = { email: 'BOT', mensaje: `${carrito}`};
                                historialChat.push(data);
                                socket.emit('historialChat', historialChat);
                                break;
                        default:
                                data = { email: 'BOT', mensaje: 'Ingrese la opcion deseada => ORDEN - STOCK - CARRITO'};
                                historialChat.push(data);
                                socket.emit('historialChat', historialChat);
             }
            }
             switchConAsync(data);
                  })
           return this.io;
        })
    }
}     
   getServer() {
        return this.io;
    }
}


export const socketService = new SocketService();