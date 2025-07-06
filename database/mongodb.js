import mongoose from 'mongoose';
import { NODE_ENV, DB_URI } from '../config/env.js'


//Check if DB_URI is present
if(!DB_URI) {
    throw new Error("DB_URI not present. Please mention DB_URI in .env.<development/production>.local file");
}

//DB connection
const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Successfully connected to database in ${NODE_ENV} mode.`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectToDatabase;