import * as express from 'express';
import * as logger from 'morgan';
import userRouter from './routes/user'
import cardRouter from './routes/card';
import taskRouter from './routes/task';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);
app.use('/card', cardRouter);
app.use('/task', taskRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.json({
    statusCode:404
  })
});

// error handler
app.use(function (err, req, res, next) {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack,
  })
});

export default app;
