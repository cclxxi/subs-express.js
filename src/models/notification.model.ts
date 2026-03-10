import * as mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        subscriptionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subscription",
            required: true
        },
        message: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 255
        },
        sendAt: Date,
        sent: {
            type: Boolean,
            default: false
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

notificationSchema.index({userId: 1});
notificationSchema.index({sendAt: 1});

export const Notification = mongoose.model("Notification", notificationSchema);