import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
dotenv.config();

import pool from './config/db.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(dirname(fileURLToPath(import.meta.url)), 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL connected successfully');
    client.release();
  })
  .catch(err => {
    console.error('❌ PostgreSQL connection error:', err.stack);
  });

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🚀 Server running on port ${process.env.SERVER_PORT}`);
});


export default app;
