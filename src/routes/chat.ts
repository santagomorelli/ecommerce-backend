import express from 'express';
import { Request, Response } from 'express';
import { socketService } from '../services/soket';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.render('main');
})

export default router;