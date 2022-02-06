import express from 'express';
import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

const mem = process.memoryUsage()

router.get('/',(req: Request, res:Response)=>{
    res.render('info',{
        argumentos : process.argv,
        sO : process.platform,
        vN : process.version,
        mE : mem.rss,
        pathExec : process.execPath,
        pID : Number(process.pid),
        cDir: process.cwd()
    })
});

console.log(process.argv);
console.log(process.execPath);
export default router;