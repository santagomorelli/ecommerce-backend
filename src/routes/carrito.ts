import asyncHandler from 'express-async-handler';
import { Router } from 'express';
import { CartController } from '../controllers/carritoController';
import { isLoggedIn } from '../middleware/admin';

const router = Router();

router.get('/', asyncHandler(CartController.getCartByUser));	    

router.post('/', asyncHandler(CartController.addProduct));

router.delete('/', asyncHandler(CartController.deleteProduct));

router.post('/buy', asyncHandler(CartController.sendOrder));

export default router;