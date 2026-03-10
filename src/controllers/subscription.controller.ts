import {Request, Response} from "express";
import * as SubscriptionService from '../services/subscription.service';
import {SubscriptionCreateDto} from "../types/subscriptionCreateDto";
import {AuthRequest} from "../middleware/auth.middleware";
import {SubscriptionPeriodicity} from "../types/subscriptionPeriodicity";

export async function getMySubscriptions(req: AuthRequest, res: Response) {
    try {
        const subs = await SubscriptionService.getMySubscriptions(req);
        res.json(subs);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
}

export async function getSubscriptionById(req: Request, res: Response) {
    try {
        const id = req.params.id as string;

        const sub = await SubscriptionService.getSubscriptionById(id);

        if (!sub) {
            res.status(404).json({message: "Subscription not found!"});
        }

        res.json(sub);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export async function createSubscription(req: AuthRequest, res: Response) {
    try {
        const dto = req.body as SubscriptionCreateDto;

        const sub = await SubscriptionService.createSubscription({
            ...dto,
            userId: req.user!.id
        })

        res.status(201).json(sub);

    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export async function deleteSubscription(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const sub = await SubscriptionService.deleteSubscription(id);
        res.status(200).json({message: "Subscription deleted:" + sub});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export async function updateCardInfo(req: Request, res: Response) {
    try {
        const id = req.body.id as string;
        const card = req.body.card as any;

        const sub = await SubscriptionService.changeCardInfo(id, card);

        res.status(200).json(sub);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
}

export async function updateStatus(req: Request, res: Response) {
    try {
        const id = req.body.id as string;
        const status = req.body.status as "active" | "cancelled";

        const sub = await SubscriptionService.updateStatus(id, status);

        res.status(200).json(sub);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
}

export async function updatePeriodicity(req: Request, res: Response) {
    try {
        const id = req.body.id as string;
        const periodicity = req.body.periodicity as SubscriptionPeriodicity;

        const sub = await SubscriptionService.updatePeriodicity(id, periodicity);

        res.status(200).json(sub);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
}

export async function getUpcomingSubscriptions(req: AuthRequest, res: Response) {
    const subs = await SubscriptionService.getUpcomingSubscriptions(req.user!.id);
    res.json(subs);
}