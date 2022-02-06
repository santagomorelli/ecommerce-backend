import { UserController } from '../controllers/usersController';
import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import passport, { isAdmin } from './../middleware/admin';

const router = Router();

router.get('/:id?',isAdmin , asyncHandler(UserController.getUsers)
);

router.put('/:id',isAdmin, asyncHandler(UserController.updateUser));

router.delete('/:id',isAdmin, asyncHandler(UserController.deleteUser));

router.post('/login', passport.authenticate('login'), function (req: Request, res: Response) {
  //res.redirect('/api/users'); 
  res.json({msg:req.user});
});

router.post('/logout', function(req:Request, res:Response){
  req.logOut();
  res.json({msg:'Logout exioso'})
  //res.redirect('/');
})

router.post('/signup', (req: Request, res: Response, next) => {
  passport.authenticate('signup', function (err, user, info) {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) return res.status(401).json({ data: info });

    res.json({ msg: 'signup OK' });
  })(req, res, next);
});

export default router;