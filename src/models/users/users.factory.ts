import { UsuariosAtlasDAO } from './DAO/mongo';
import path from 'path';
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

export class UserFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case 'mongoatlas':
        logger.info('Retornando Instancia Users Mongo Atlas');
        return new UsuariosAtlasDAO();

      case 'localmongo':
        logger.info('Retornando Instancia Users Mongo Local');
        return new UsuariosAtlasDAO(true);

      default:
        logger.info('Retornando Instancia Users Default');
        return new UsuariosAtlasDAO(true);
    }
  }
}