import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { id: string }
}

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({message: "No token"});

    const token = header.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = {id: payload.userId};
        next();
    } catch {
        res.status(401).json({message: "Invalid token"});
    }
}