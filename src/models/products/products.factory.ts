import { ProductosAtlasDAO } from './DAOs/mongo';

import { logger } from '../../services/loggerWinston';

export class NoticiasFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case 'mongoatlas':
        logger.info('Retornando instancia Productos en Mongo Atlas');
        return new ProductosAtlasDAO();

      case 'localmongo':
        logger.info('Retornando instancia Productos en Mongo Local');
        return new ProductosAtlasDAO(true);

      default:
        logger.info('Retornando instancia Productos en Mongo Local');
        return new ProductosAtlasDAO(true);
    }
  }
}
