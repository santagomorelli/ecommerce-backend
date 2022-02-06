import express from 'express';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import { ErrorRequestHandler } from 'express';
import { socketService } from './soket';
import handlebars from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { mongoSesionAtlas } from './sesionOpt/sessionsOptions';
import compression from 'compression';
import { logger } from './loggerWinston';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './../../swagger-output.json';
import Config from './../config/index';
const cloudinary = require('cloudinary');

const app = express();
const publicPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(mongoSesionAtlas));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  logger.silly(`REQ.SESSION =>\n${JSON.stringify(req.session)}`);
  logger.silly(`REQ.USER =>\n${JSON.stringify(req.user)}`);
  logger.silly(`REQ.AUTHENTICATE =>\n${JSON.stringify(req.isAuthenticated())}`);
  next();
});

app.use(compression());

app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error(`Error -- ${err}`);
    res.status(500).json({
      err: err.message,
    });
  };
  
app.use(errorHandler);

  const layoutFolderPath = path.resolve(__dirname, '../../views/layouts');
  const defaultLayoutPath = path.resolve(__dirname, '../../views/layouts/index.hbs');
  //const defaultPartialPath = path.resolve(__dirname, '../views/partial');
  
  app.set('view engine', 'hbs');
  app.engine('hbs', handlebars({
      layoutsDir: layoutFolderPath,
      defaultLayout: defaultLayoutPath,
      //defaultPartialPath: defaultPartialPath,
      extname: 'hbs',
  }));

  cloudinary.config({ 
    cloud_name: `${Config.CLOUDINARY_NAME}`, 
    api_key: `${Config.CLOUDINARY_KEY}`, 
    api_secret: `${Config.CLOUDINARY_SECRET}` 
  });

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const myServer = new http.Server(app);
const myWsServer = socketService.initSocket(myServer);

export default myServer;
