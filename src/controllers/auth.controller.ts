import {Request, Response} from 'express';
import * as UserService from '../services/user.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from "../config/env"
import { UserCreateDto } from "../types/userCreateDto";

// function hasWhitespace(value: string): boolean {
//     return /\s/.test(value);
// }

export async function registerUser(req: Request, res: Response) {
    try {
        const dto = req.body as UserCreateDto;

        const firstName = (dto.name ?? '').trim();
        const surname = (dto.surname ?? '').trim();

        if (!firstName || !surname )
            return res.status(400).json({message: "Both first name and surname are required"});

        // if (hasWhitespace(firstName) || hasWhitespace(surname))
        //     return res.status(400).json({message: "First name and last name must not contain spaces"})

        const exists = await UserService.existsUserByEmail(dto.email);

        if (exists) {
            return res.status(400).json({message: "User with that email already exists"});
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await UserService.createUser(
            {
                ...dto,
                name: firstName,
                surname: surname,
                password: hashedPassword,
            }
        );
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        const email = String(req.body?.email ?? '').trim().toLowerCase();
        const password = String(req.body?.password ?? '').trim();

        if (!email || !password)
            return res.status(400).json({message: "Email and password are required"})


        const user = await UserService.getUserByEmail(email);

        if (!user || !user.password) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch)
            return res.status(400).json({message: "Invalid credentials"})

        const token = jwt.sign(
            {userId: user._id},
            env.JWT_SECRET,
            {expiresIn: "1d"},
        );

        res.json({
            token,
        });

    } catch (err) {
        res.status(400).json(err.message);
    }
}