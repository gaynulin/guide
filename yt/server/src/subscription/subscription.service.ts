import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import { Subscription, Prisma} from "@prisma/client";

@Injectable()
export class SubscriptionService {
    constructor(private prisma: PrismaService) {
    }

    async subscription(
        where: Prisma.SubscriptionWhereUniqueInput,
    ): Promise<Subscription | null> {
        return this.prisma.subscription.findUnique({
            where,
        });
    }

    async subscriptions(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.SubscriptionWhereUniqueInput;
        where?: Prisma.SubscriptionWhereInput;
        orderBy?: Prisma.SubscriptionOrderByWithRelationInput;
    }): Promise<Subscription[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.subscription.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createSubscription(data: Prisma.SubscriptionCreateInput): Promise<Subscription> {
        return this.prisma.subscription.create({
            data,
        });
    }

    async upsertSubscription(data: Prisma.SubscriptionCreateInput): Promise<Subscription> {
        return this.prisma.subscription.upsert({
            where: {
                channelId: data.channelId
            },
            update: {
                title: data.title,
                publishedAt: data.publishedAt,
            },
            create: data,
        });
    }

    async updateSubscription(params: {
        where: Prisma.SubscriptionWhereUniqueInput;
        data: Prisma.SubscriptionUpdateInput;
    }): Promise<Subscription> {
        const {where, data} = params;
        return this.prisma.subscription.update({
            data,
            where,
        });


    }

    async deleteSubscription(where: Prisma.SubscriptionWhereUniqueInput): Promise<Subscription> {
        return this.prisma.subscription.delete({
            where,
        });
    }
}
