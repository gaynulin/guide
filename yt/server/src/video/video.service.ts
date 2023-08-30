import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Prisma, Video} from "@prisma/client";

@Injectable()
export class VideoService {
    constructor(private prisma: PrismaService) {
    }

    async video(
        where: Prisma.VideoWhereUniqueInput,
    ): Promise<Video | null> {
        return this.prisma.video.findUnique({
            where,
        });
    }

    async videos(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.VideoWhereUniqueInput;
        where?: Prisma.VideoWhereInput;
        orderBy?: Prisma.VideoOrderByWithRelationInput;
        include?: Prisma.VideoInclude;
    }): Promise<Video[]> {
        const {include, skip, take, cursor, where, orderBy} = params;
        return this.prisma.video.findMany({
            include,
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createVideo(data: Prisma.VideoCreateInput): Promise<Video> {
        return this.prisma.video.create({
            data,
        });
    }

    async upsertVideo(data: Prisma.VideoCreateInput): Promise<Video> {
        return this.prisma.video.upsert({
            where: {
                id: data.id
            },
            update: {
                title: data.title,
                thumbnails: data.thumbnails,
                description: data.description,
                publishedAt: data.publishedAt,
                statistics: data.statistics,
                liveBroadcastContent: data.liveBroadcastContent,
                whenAt: data.whenAt,
            },
            create: data,
        });
    }

    async updateVideo(params: {
        where: Prisma.VideoWhereUniqueInput;
        data: Prisma.VideoUpdateInput;
    }): Promise<Video> {
        const {where, data} = params;
        return this.prisma.video.update({
            data,
            where,
        });


    }

    async deleteVideo(where: Prisma.VideoWhereUniqueInput): Promise<Video> {
        return this.prisma.video.delete({
            where,
        });
    }
}
