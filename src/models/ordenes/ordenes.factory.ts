import { OrdersAtlasDAO } from './DAO/mongo';
import { logger } from '../../services/loggerWinston';

export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
  Firebase = 'FIREBASE',
}


export class OrdersFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case "mongoatlas":
        logger.info('Retornando Instancia Ordenes Mongo Atlas');
        return new OrdersAtlasDAO();

      case "localmongo":
        logger.info('Retornando Instancia Ordenes Mongo Local');
        return new OrdersAtlasDAO(true);

      default:
        logger.info('Retornando Instancia Ordenes Default');
        return new OrdersAtlasDAO(true);
    }
  }
}