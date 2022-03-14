import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    _id: string;
    email: string;
    password: string;
    createdDate: Date;
    firstName: string;
    lastName: string;
    role?: string;
    comparePassword: (password: string) => Promise<Boolean>;
};

const userSchema = new Schema({
    _id: {
        type: String,
        // unique: true,
        required: true,
        lowercase: true,
    },
    createdDate: {
        type: Date,
        required: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre<IUser>("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (
    password: string
): Promise<Boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);


interface user {
    _id: string
    createdDate: Date
    email: string
    firstName: string
    lastName: string
    password: string
    role?: string
}