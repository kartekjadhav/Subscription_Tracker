//import node modules
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

//import config, db, middlewares
import { PORT } from './config/env.js'
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';

//import routers
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import workflowRouter from './routes/workflow.routes.js';

//create express app
const app = express();

//use midllewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan("short"));
app.use(arcjetMiddleware);

//use routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter)

app.get('/', (req, res) => {
    res.send('Welcome to Subscription Tracker API')
})

//Error Route handler
app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is running on ${PORT} port`);
    await connectToDatabase();
})

export default app;