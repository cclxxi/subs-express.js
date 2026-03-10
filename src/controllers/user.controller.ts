import {Request, Response} from 'express';
import * as UserService from '../services/user.service';

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserService.getUsers()
        res.json(users);
    } catch (err) {
        res.status(404).json({message: 'Users not found'});
    }
}

export async function findUserById(req: Request, res: Response) {
    try {
        const id = req.params.id as string;

        const user = await UserService.findUserById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.json(user);
    }
    catch (err) {
        res.status(400).json({message: "Error finding user"});
    }
}