import { CartsAtlasDAO } from './DAO/mongo';
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


export class CartFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case "mongoatlas":
        logger.info('Retornando Instancia Cart Mongo Atlas');
        return new CartsAtlasDAO();

      case "localmongo":
        logger.info('Retornando Instancia Cart Mongo Local');
        return new CartsAtlasDAO(true);

      default:
        logger.info('Retornando Instancia Cart Default');
        return new CartsAtlasDAO(true);
    }
  }
}