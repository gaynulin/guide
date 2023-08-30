import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, PlaylistItem } from "@prisma/client";

@Injectable()
export class PlaylistService {
    constructor(private prisma: PrismaService) {
    }

    async playlistItem(
        where: Prisma.PlaylistItemWhereUniqueInput,
    ): Promise<PlaylistItem | null> {
        return this.prisma.playlistItem.findUnique({
            where,
        });
    }

    async playlistItems(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PlaylistItemWhereUniqueInput;
        where?: Prisma.PlaylistItemWhereInput;
        orderBy?: Prisma.PlaylistItemOrderByWithRelationInput;
    }): Promise<PlaylistItem[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.playlistItem.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createPlaylist(data: Prisma.PlaylistItemCreateInput): Promise<PlaylistItem> {
        return this.prisma.playlistItem.create({
            data,
        });
    }

    async upsertPlaylistItem(data: Prisma.PlaylistItemCreateInput): Promise<PlaylistItem> {
        return this.prisma.playlistItem.upsert({
            where: {
                id: data.id
            },
            update: {},
            create: data,
        });
    }

    async updatePlaylistItem(params: {
        where: Prisma.PlaylistItemWhereUniqueInput;
        data: Prisma.PlaylistItemUpdateInput;
    }): Promise<PlaylistItem> {
        const {where, data} = params;
        return this.prisma.playlistItem.update({
            data,
            where,
        });


    }

    async updateVideoProcessedPlaylistItem(params: {
        where: Prisma.PlaylistItemWhereInput;
    }): Promise<{ count: number }> {
        const {where} = params;
        return this.prisma.playlistItem.updateMany({
            data: { videoProcessed: new Date() },
            where,
        });

    }

    async deletePlaylistItem(where: Prisma.PlaylistItemWhereUniqueInput): Promise<PlaylistItem> {
        return this.prisma.playlistItem.delete({
            where,
        });
    }
}
