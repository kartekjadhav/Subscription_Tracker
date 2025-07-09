import Subscription from "../models/subscription.model.js";
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        
        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            headers: {
                'content-type': 'application/json'
            },
            body: {
                subscriptionId: subscription.id
            },
            retries: 0,
        })

        res.status(201).json({success: true, message: "Subscription create successfully", data: {subscription: subscription.id, workflowRunId}});
};

export const getUserSubscription = async (req, res, next) => {
    try {
        if(req.user.id === req.params.id){
            const subscriptions = await Subscription.find({user: req.user._id});
            res.status(200).json({success: true, message: "Successfully fetched subscriptions", data: subscriptions});
        } else {
            const error = new Error("You are not  owner of this account");
            error.statusCode = 401;
            throw error 
        }
    } catch (error) {
        next(error)
    }
};