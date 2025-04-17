import express from 'express';
import { sessionMiddleware } from '../middlewares/user.js';
import { auth, isAdmin } from '../middlewares/auth.js';
import { createSession, acceptSession, declineSession, getSessions } from '../controllers/sessions.js';

const router = express.Router();

router.post('/', auth, sessionMiddleware, createSession);
router.post('/:sessionId/accept', auth, acceptSession);
router.post('/:sessionId/decline', auth, declineSession);
router.get('/', auth, sessionMiddleware, getSessions);

export default router;