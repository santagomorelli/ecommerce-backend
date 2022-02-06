import myServer from './services/server';
import Config from './config/index';
import cluster from 'cluster';
import os from 'os';
import { logger } from './services/loggerWinston';
import { argCluster } from './services/process';

const puerto = Config.PORT;
const clusterMode = argCluster;

const numCPUs = os.cpus().length;
if (clusterMode && cluster.isPrimary) {
  logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
  logger.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    logger.warn(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  myServer.listen(puerto, () =>
    logger.info(
      `Servidor express escuchando en el puerto ${puerto} - PID WORKER ${process.pid}`
    )
  );
  myServer.on("error", (error) => logger.warn(`Error en el servidor: ${error}`));
}



//myServer.listen(puerto, () => console.log(`Server up on port ${puerto} - PID WORKER ${process.pid}`))     
    
  



