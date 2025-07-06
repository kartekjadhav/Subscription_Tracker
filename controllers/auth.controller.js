import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, password, email } = req.body;

        // Check if user already exits
        const existingUser = await User.findOne({email});

        if(existingUser) {
            const error = new Error("User already exits");
            error.statusCode = 409;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUsers = await User.create([{name, password: hashedPassword, email}], {session});

        // create jwt token
        const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        await session.endSession();

        res.status(201).send({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0]
            }
        });

    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            const error = new Error("Invalid credentials");
            error.statusCode = 401;
            throw error;
        }

        const token = await jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user: user
            }
        });
    } catch (error) {
        next(error);
    }
};

export const signOut = (req, res, next) => {
    //
};
