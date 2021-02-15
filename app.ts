import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";

import authRouter from "./routes/auth";
import todosRouter from "./routes/todos";
import uploadRouter from "./routes/upload";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));


app.use("/auth", authRouter);
app.use("/todos", todosRouter);
app.use("/upload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    statusCode: 404,
  });
});

// error handler
app.use(function (err, req, res, next) {
  res.json({
    statusCode: 500,
    message: err.message,
    stack: err.stack,
  });
});

export default app;
