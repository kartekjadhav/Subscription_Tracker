//import modules
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "User name is required"],
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        trim: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minLength: 6
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;


