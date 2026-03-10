import { Request, Response } from "express";
import * as CardService from '../services/card.service';
import { CardCreateDto } from "../types/cardCreateDto";
import { AuthRequest } from "../middleware/auth.middleware";

export async function createCard(req: AuthRequest, res: Response) {
    try {
        const dto = req.body as CardCreateDto;

        const card = await CardService.createCard({
            ...dto,
            userId: req.user!.id
        })

        res.status(201).json(card);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function updateCardInfo(req: Request, res: Response) {
    try {
        const id = req.body.id as string;
        const card = await CardService.updateCard(id, req.body);
        if (!card) {
            res.status(404).json({ message: "Card not found!" });
        }
        res.status(200).json(card);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function deleteCard(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const card = await CardService.deleteCard(id);
        if (!card) {
            res.status(404).json({ message: "Card not found!" });
        }
        res.status(200).json({ message: "Card deleted:" + card });
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export async function getMyCards(req: AuthRequest, res: Response) {
    try {
        const cards = await CardService.getMyCards(req);
        if (!cards) {
            res.status(404).json({ message: "Cards not found!" });
        }
        res.status(200).json(cards);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}