import * as mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: String,
        surname: String,
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        password: {
            type: String,
            required: true,
            select: false,
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

export const User = mongoose.model("User", userSchema);