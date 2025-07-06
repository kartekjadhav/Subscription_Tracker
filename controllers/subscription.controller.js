import mongoose from 'mongoose';
import Subscription from "../models/subscription.model.js";
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const subscription = await Subscription.create([{
            ...req.body,
            user: req.user._id
        }], {session});
        
        try {
            await workflowClient.trigger({
                url: `http://127.0.0.1:8080/v2/publish/https://localhost:5500/api/v1/workflows/subscription/reminder -H "Authorization: Bearer eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0="`,
                body: subscription.id,
                headers: {
                    "Content-type": "application/json"
                },
                retries: 0
            });
            console.log(`Workflow triggered successfully for subscription: ${subscription.id}`);
        } catch (workflowError) {
            console.error("Failed to trigger workflow:", workflowError);
            // Don't fail the subscription creation if workflow fails
        }

        res.status(201).json({success: true, message: "Subscription create successfully", data: subscription});
        
        await session.commitTransaction();
        await session.endSession();
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        console.log("Error while creating subscription", error);
        next(error);
    }
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