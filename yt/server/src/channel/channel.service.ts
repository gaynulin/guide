import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Channel, Prisma} from '@prisma/client';

@Injectable()
export class ChannelService {
    constructor(private prisma: PrismaService) {
    }

    async channel(
        where: Prisma.ChannelWhereUniqueInput,
    ): Promise<Channel | null> {
        return this.prisma.channel.findUnique({
            where,
        });
    }

    async channels(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ChannelWhereUniqueInput;
        where?: Prisma.ChannelWhereInput;
        orderBy?: Prisma.ChannelOrderByWithRelationInput;
    }): Promise<Channel[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.channel.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createChannel(data: Prisma.ChannelCreateInput): Promise<Channel> {
        return this.prisma.channel.create({
            data,
        });
    }

    async upsertChannel(data: Prisma.ChannelCreateInput): Promise<Channel> {
        return this.prisma.channel.upsert({
            where: {
                id: data.id
            },
            update: {
                description: data.description,
                likesPlaylists: data.likesPlaylists,
                uploadsPlaylists: data.uploadsPlaylists,
                customUrl: data.customUrl,
                thumbnails: data.thumbnails,
                title: data.title,
            },
            create: data,
        });
    }

    async updateChannel(params: {
        where: Prisma.ChannelWhereUniqueInput;
        data: Prisma.ChannelUpdateInput;
    }): Promise<Channel> {
        const {where, data} = params;
        return this.prisma.channel.update({
            data,
            where,
        });


    }

    async deleteChannel(where: Prisma.ChannelWhereUniqueInput): Promise<Channel> {
        return this.prisma.channel.delete({
            where,
        });
    }

}
