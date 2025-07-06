import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send({title: "Get all subscriptions"});
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({title: "Get a subscription"})
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send({title: "UPDATE a subscription"})
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({title: "DELETE a subscription"})
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({title: "CANCEL a subscription"})
});

subscriptionRouter.get('/upcoming-renewal', (req, res) => {
    res.send({title: "GET upcoming renewals"})
});

export default subscriptionRouter