import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

export default app;
