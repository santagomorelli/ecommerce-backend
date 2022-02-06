import minimist from 'minimist';
import { logger } from './loggerWinston'
import Config from './../config/index'

process.on('exit', (code:number)=>{
    console.log(`Exit code: ${code}`)
  });

const args = minimist(process.argv.slice(2), { });
//Ejemplo de argumento ingresado => node dist/index --puerto 8081 --cluster
//args.puerto : 8081


//console.log(args);

if(args.puerto){
const a = Number(args.puerto);
if (isNaN(a)){
  logger.error('Puerto mal ingresado');
  process.exit(2);
}}

export const argPuerto = args.puerto;
export const argPersistencia: any = args.persistencia || 'mongoatlas';
export const argCluster: any = args.cluster;
