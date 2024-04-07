const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fingerprint = require('express-fingerprint');
const cookieParser = require('cookie-parser');

const authRouter = require('./router/authRouter');
const errorHandler = require('./middleware/errorHandler');
const { CustomError } = require('./utils/AppError');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
const PORT = process.env.PORT || 3100;

const dbCheck = require('./db/dbCheck');

dbCheck();

// middlewares
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(
  fingerprint({
    parameters: [fingerprint.useragent, fingerprint.acceptHeaders],
  }),
);
//middleware for cookies
app.use(cookieParser());
// app.use(express.static(path.resolve('public')));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user', authRouter);

app.use('/*', (req, res, next) => {
  next(new CustomError(`can not find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

app.listen(PORT, (err) => {
  if (err) return console.log('Server startup error..', err.message);
  console.log(`--- Start ${process.env.NODE_ENV} mode`);
  return console.log(`The server is running on http://localhost:${PORT} `);
});
