import {SubscriptionPeriodicity} from "./subscriptionPeriodicity";

export interface SubscriptionCreateDto {
    userId: string
    service: string;
    price: number;
    currency: string;
    periodicity: SubscriptionPeriodicity;
    startDate: Date;
    cardId: string;
}