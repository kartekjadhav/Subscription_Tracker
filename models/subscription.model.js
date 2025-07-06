//import mongoose
import mongoose from 'mongoose'
import User from './user.model.js'

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    price: {
        type: Number,
        min: [0, "Subscription price cant be negative"],
        required: [true, "Subscription price is required"]
    },
    currency: {
        type: String,
        enum: ['USD', 'INR', 'EUR', 'GBP'],
        default: 'INR'
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        required: [true, "Subscription frquency is required"]
    },
    category: {
        type: String,
        required: [true, "Subscription category is required"],
        enum: ["news", "entertainment", "lifestyle", "finance", "technology", "shopping", "others"]
    },
    status: {
        type: String,
        enum: ["active", "cancelled", "expired"],
        default: "active"
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, "A user should be associated with a subscription"],
        index: true
    },
    startDate: {
        type: Date,
        required: [true, "Start date of subscription is required"],
        validate: {
            validator: (date) => date <= new Date(),
            message: "Start Date should be older than or equal to today"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function () {
                this.renewalDate > new Date()
            },
            message: "Renewal Date should be greater than today"
        }
    },

}, {timestamps: true});


// function to run before document is created
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate) {
        const addDays = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + addDays[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = "expired";
    }

    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;