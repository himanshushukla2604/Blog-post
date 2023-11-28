import express from "express";

import userRouter from './routes/user.routes.js';


app.use("/api/v1/users", userRouter);

export { app };