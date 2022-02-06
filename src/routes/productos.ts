import {Router} from 'express';
import { productsController } from '../controllers/productsController';
import { isAdmin } from '../middleware/admin';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get('/', isAdmin ,asyncHandler(productsController.getProducts))
     
router.get('/:id',isAdmin,
    productsController.checkProductExists,
    asyncHandler(productsController.getProducts)
);
       

router.post('/', isAdmin,
    productsController.checkAddProducts,  
    asyncHandler(productsController.addProducts)
);


router.put('/:id', isAdmin,
    asyncHandler(productsController.updateProducts)
);

router.delete('/:id', isAdmin,
    productsController.checkProductExists,
    asyncHandler(productsController.deleteProducts)
);


export default router;