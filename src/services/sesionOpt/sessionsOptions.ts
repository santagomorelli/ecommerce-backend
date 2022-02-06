import sessionFileStore from 'session-file-store';
import session from 'express-session';
//import {storeRedis}  from './redis';
import MongoStore from 'connect-mongo';
import Config from './../../config/index';

const ttlseconds = 600;

/*export const memorySession = {
    secret: 'abc',
    saveUninitialized: true,
    cookie: { maxAge: ttlseconds * 1000 },
    resave: true,
  } 
  const FileStore = sessionFileStore(session);


export const fileStoreOptions = {
    store: new FileStore({ path: './sesiones', ttl: ttlseconds , retries:5}),
    secret: 'abc',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: ttlseconds * 1000,
   },

  
  }


   export const redisOption = {
    store: storeRedis,
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: ttlseconds * 1000,
    } 
  };


  export const mongoSesionLocal = {
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/ecommerceLocal'}),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: ttlseconds * 1000,
  } 
};
*/
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const atlas = `${Config.MONGOATLAS_SRV}`;
 export const mongoSesionAtlas = {
     store: MongoStore.create({
    mongoUrl: atlas,
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlseconds * Number(Config.SESSION_EXPIRE_SECONDS),
} 
};



 

  
  