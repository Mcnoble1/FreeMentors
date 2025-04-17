import express from 'express';
import { signup, login } from '../controllers/users.js';
import * as validator from '../middlewares/user.js'
let router = express.Router();

router.post('/signup', validator.signupMiddleware, signup);
router.post('/login', validator.loginMiddleware, login);

export default router;
