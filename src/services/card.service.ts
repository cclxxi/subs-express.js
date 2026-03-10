import { Card } from "../models/card.model";
import { CardCreateDto } from "../types/cardCreateDto";
import { AuthRequest } from "../middleware/auth.middleware";

export async function getMyCards(req: AuthRequest){
    return Card
        .find({userId: req.user?.id})
        .populate("userId", "email name surname")
}

export async function createCard(data: CardCreateDto) {
    return Card.create(data);
}

export async function deleteCard(id: string) {
    return Card.findByIdAndDelete(id)
}

export async function updateCard(Id: string, data: CardCreateDto) {
    return Card.findByIdAndUpdate(
        Id,
        data,
        {returnDocument: "after"}
    )
}