import * as mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: String,
        last4: Number,
    },
    { timestamps: true, versionKey: false, toJSON: {
            transform: (_doc, ret: { _id?: mongoose.Types.ObjectId; id?: String }) => {
                if (ret._id) {
                    ret.id = ret._id.toString();
                    delete ret._id;
                }
            }
        }
    });

export const Card = mongoose.model("Card", CardSchema);