import { User } from "../models/user.model"
import { UserCreateDto } from "../types/userCreateDto";

export async function getUsers() {
    return User.find();
}

export async function getUserByEmail(email: string) {
    return User.findOne({ email }).select("+password");
}

export async function existsUserByEmail(email: string) {
    return User.exists({ email });
}

export async function createUser(data: UserCreateDto) {
    const user = await User.create(data);
    return User.findById(user._id);
}

export async function findUserById(id: string) {
    return User.findById(id);
}
