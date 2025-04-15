import express from 'express';
import { signup, login } from '../controllers/users.js';
import * as validator from '../middlewares/user.js'
import { auth } from '../middlewares/auth.js';
import db from '../config/db.js';
let router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const resp = await db.query('SELECT * FROM users');

  res.json({
    status: 'success',
    data: {
      users: resp.rows,
    },
  });
});

router.post('/signup', validator.signupMiddleware, signup);
router.post('/login', login);
router.post('/promote', auth, function(req, res, next) {
  // const resp = await db.query('SELECT * FROM users');

  res.json({
    status: 'success',
    data: {
      users: req.user,
    },
  });
});

export default router;
