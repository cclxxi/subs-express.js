import {Subscription} from "../models/subscription.model";
import {SubscriptionPeriodicity} from "../types/subscriptionPeriodicity";
import {SubscriptionCreateDto} from "../types/subscriptionCreateDto";
import {AuthRequest} from "../middleware/auth.middleware";

export async function getMySubscriptions(req: AuthRequest) {
    return Subscription
        .find({userId: req.user?.id})
        .populate("cardId", "name last4");
}

export async function getSubscriptionById(id: string) {
    return Subscription
        .findById(id)
        .populate("userId", "email name surname");
}

export async function createSubscription(data: SubscriptionCreateDto) {

    const renewalDate = calculateRenewalDate(
        data.periodicity,
        data.startDate
    );

    return Subscription.create({
        ...data,
        renewalDate
    });
}

export async function deleteSubscription(id: string) {
    return Subscription.findByIdAndDelete(id);
}

export async function changeCardInfo(id: string, cardInfo: any) {
    return Subscription.findByIdAndUpdate(
        id,
        {
            card: {
                name: cardInfo.name,
                last4: cardInfo.last4
            }
        },
        {returnDocument: "after"}
    );
}

export async function updateStatus(
    id: string,
    status: "active" | "cancelled"
) {
    return Subscription.findByIdAndUpdate(
        id,
        {status},
        {returnDocument: "after"}
    );
}

export async function updatePeriodicity(
    id: string,
    periodicity: SubscriptionPeriodicity
) {
    return Subscription.findByIdAndUpdate(
        id,
        {periodicity},
        {returnDocument: "after"}
    )
}

export async function getUpcomingSubscriptions(userId: string) {
    return Subscription.find({
        userId,
        renewalDate: {
            $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        }
    });
}

export function calculateRenewalDate(
    periodicity: SubscriptionPeriodicity,
    startDate: Date
) {
    const date = new Date(startDate);
    switch (periodicity) {
        case SubscriptionPeriodicity.DAILY:
            date.setDate(date.getDate() + 1);
            break;
        case SubscriptionPeriodicity.WEEKLY:
            date.setDate(date.getDate() + 7);
            break;
        case SubscriptionPeriodicity.MONTHLY:
            date.setMonth(date.getMonth() + 1);
            break;
        case SubscriptionPeriodicity.QUARTERLY:
            date.setMonth(date.getMonth() + 3);
            break;
        case SubscriptionPeriodicity.SEMIANNUALLY:
            date.setMonth(date.getMonth() + 6);
            break;
        case SubscriptionPeriodicity.ANNUALLY:
            date.setFullYear(date.getFullYear() + 1);
            break;
    }
    return date;
}