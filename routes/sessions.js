import express from 'express';
import { sessionMiddleware } from '../middlewares/user.js';
import { auth, isAdmin } from '../middlewares/auth.js';
import { createSession } from '../controllers/sessions.js';

const router = express.Router();

router.post('/', auth, sessionMiddleware, createSession);

export default router;