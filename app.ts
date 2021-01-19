import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import authRouter from './routes/auth';
import cardRouter from './routes/cards';
import taskRouter from './routes/tasks';

const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/cards', cardRouter);
app.use('/tasks', taskRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
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
