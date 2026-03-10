import * as mongoose from "mongoose";
import {SubscriptionPeriodicity} from "../types/subscriptionPeriodicity";

const subscriptionSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        service: String,
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 10
        },
        periodicity: {
            type: String,
            required: true,
            enum: Object.values(SubscriptionPeriodicity)
        },
        startDate: Date,
        renewalDate: Date,
        status: {
            type: String,
            required: true,
            enum: ["active", "canceled", "past_due"],
            default: "active"
        },
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Card",
            required: true
        }
    },
    {
        timestamps: true, versionKey: false, toJSON: {
            transform: (_doc, ret: {
                _id?: mongoose.Types.ObjectId; id?: String
            }) => {
                if (ret._id) {
                    ret.id = ret._id.toString();
                    delete ret._id;
                }

            }
        }
    })

subscriptionSchema.index({userId: 1});
subscriptionSchema.index({renewalDate: 1});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);