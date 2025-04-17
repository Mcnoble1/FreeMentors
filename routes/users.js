import express from 'express';
import { promoteToMentor, viewMentorById, viewMentors } from '../controllers/users.js';
import * as validator from '../middlewares/user.js'
import { auth, isAdmin } from '../middlewares/auth.js';
let router = express.Router();

router.post('/:id', auth, isAdmin, promoteToMentor);
router.get('/mentors', auth, viewMentors);
router.get('/mentors/:id', auth, viewMentorById);

export default router;
