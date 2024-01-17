import { Router } from 'router.js';
import passport from 'passport.js';  
import UserRepo from '../db/UserRepo.js'
import { createHash, isValidPassword } from '../utils.js';

const router = Router();

router.get('/sessions/github', passport.authenticate('github',
{ scope:['user:email']}));

router.get('/sessions/github/callback', passport.authenticate('github', 
{ failureRedirect: '/login'}), (req, res) =>{
    console.log('req.user', req.user);
    res.redirect('/profile');
});




