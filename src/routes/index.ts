import { Router } from "express";
import productos from './productos';
import carrito from './carrito';
import chat from './chat';
import users from './users';
import info from './info';

const router = Router();

router.use('/productos', productos);
router.use('/carrito', carrito);
router.use('/chat',chat);
router.use('/users', users);
router.use('/info',info);

export default router;