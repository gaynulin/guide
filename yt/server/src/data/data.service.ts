import {Injectable} from '@nestjs/common';
import {ApiService} from "../api/api.service";
import {ChannelService} from "../channel/channel.service";
import {Channel, PlaylistItem, Subscription, Video} from "@prisma/client";
import {Kind} from "../api/IApiRequest";
import {SubscriptionService} from "../subscription/subscription.service";
import {PlaylistService} from "../playlist/playlist.service";
import {VideoService} from "../video/video.service";
import {IVideoItem, VideoBroadcastContent} from "../api/videos.api";

@Injectable()
export class DataService {

    constructor(
        private readonly apiService: ApiService,
        private readonly subscriptionService: SubscriptionService,
        private readonly channelService: ChannelService,
        private readonly playlistService: PlaylistService,
        private readonly videoService: VideoService,
    ) {
    }

    async getSubscriptions(): Promise<Subscription[]> {
        const data = await this.apiService.subscriptions();
        console.log({data})
        return Promise.all(
            data.filter(d => d.snippet.resourceId.kind === Kind.CHANNEL)
                .map(d => this.subscriptionService.upsertSubscription({
                    channelId: d.snippet.resourceId.channelId,
                    title: d.snippet.title,
                    publishedAt: d.snippet.publishedAt,
                }))
        );
    }

    async getChannelsData(ids: string[] = []): Promise<Channel[]> {
        ids = ids.length ? ids : (await this.subscriptionService.subscriptions({
            where: {}
        })).map(i => i.channelId);

        console.log({ids});

        const data = await this.apiService.channelsData(ids);

        return Promise.all(data.map(item => this.channelService.upsertChannel({
            title: item.snippet.title,
            thumbnails: JSON.stringify(item.snippet.thumbnails),
            id: item.id,
            customUrl: item.snippet.customUrl,
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description,
            localized: JSON.stringify(item.snippet.localized),
            uploadsPlaylists: item.contentDetails.relatedPlaylists.uploads,
            likesPlaylists: item.contentDetails.relatedPlaylists.likes,
        })));
    }

    async getPlaylists(): Promise<PlaylistItem[][]> {
        const channelIds = (await this.channelService.channels({
            where: {}
        })).flatMap(pl => pl.uploadsPlaylists.split(','));

        console.log({channelIds})

        return Promise.all(channelIds
            .map(id => this.getChannelData(id)))
            .then(
                (res: PlaylistItem[][]) => res.filter(Boolean));
    }

    async getChannelData(channelId: string): Promise<PlaylistItem[]> {
        const data = await this.apiService.channelPlaylistItems(channelId);

        return data ? Promise.all(data
            .filter(item => item.snippet.resourceId.kind === Kind.VIDEO)
            .map(item => this.playlistService.upsertPlaylistItem({
                id: item.id,
                playlistId: item.snippet.playlistId,
                playlistItemId: item.id,
                position: item.snippet.position,
                channelId: item.snippet.channelId,
                title: item.snippet.title,
                publishedAt: item.snippet.publishedAt,
                description: item.snippet.description,
                channelTitle: item.snippet.channelTitle,
                thumbnails: JSON.stringify(item.snippet.thumbnails),
                videoId: item.snippet.resourceId.videoId,
                videoOwnerChannelTitle: item.snippet.videoOwnerChannelTitle,
                videoOwnerChannelId: item.snippet.videoOwnerChannelId,
            }))) : [];
    }

    async getPlaylistsVideos() {
        const videoIDs = (await this.playlistService.playlistItems({
            where: {
                videoProcessed: null,
            }
        })).map(pl => pl.videoId);

        console.log({videoIDs});

        const chunkSize = 10;
        let chunks = [];
        while (videoIDs.length > 0) {
            chunks.push(videoIDs.splice(0, chunkSize));
        }

        const result = [];

        for (const chunk of chunks) {
            result.push(await this.getVideosByIDs(chunk));
        }

        return result;
    }

    private async getVideosByIDs(ids: string[]): Promise<Video[]> {
        const data = await this.apiService.videos(ids);

        return Promise.all(
            data.map(async item => {
                const whenAt = this.getWhenAtBasedOnBroadcastContent(item);
                // console.log({whenAt})
                try {
                    const video = await this.videoService.upsertVideo({
                        channel: {connect: {id: item.snippet.channelId}},
                        title: item.snippet.title,
                        publishedAt: item.snippet.publishedAt,
                        description: item.snippet.description,
                        localized: JSON.stringify(item.snippet.localized),
                        thumbnails: JSON.stringify(item.snippet.thumbnails),
                        channelTitle: item.snippet.channelTitle,
                        id: item.id,
                        contentDetails: JSON.stringify(item.contentDetails),
                        categoryId: item.snippet.categoryId,
                        defaultAudioLanguage: item.snippet.defaultAudioLanguage,
                        liveBroadcastContent: item.snippet.liveBroadcastContent,
                        liveStreamingDetails: JSON.stringify(item.liveStreamingDetails),
                        player: JSON.stringify(item.player),
                        recordingDetails: JSON.stringify(item.recordingDetails),
                        statistics: JSON.stringify(item.statistics),
                        status: JSON.stringify(item.status),
                        tags: item.snippet.tags,
                        topicDetails: JSON.stringify(item.topicDetails),
                        whenAt,
                    });

                    if (video.liveBroadcastContent !== VideoBroadcastContent.UPCOMING) {
                        await this.playlistService.updateVideoProcessedPlaylistItem(
                            {where: {videoId: video.id}}
                        );
                    }

                    return video;
                } catch (e) {
                    console.error({e})
                    console.warn({item})
                    return null;
                }

            })
        );
    }

    private getWhenAtBasedOnBroadcastContent(video: IVideoItem): string {
        if (video.snippet.liveBroadcastContent === VideoBroadcastContent.UPCOMING) {
            return video.liveStreamingDetails.scheduledStartTime ??
                video.liveStreamingDetails.actualStartTime;
        }

        if (video.snippet.liveBroadcastContent === VideoBroadcastContent.LIVE) {
            return video.liveStreamingDetails.actualStartTime ??
                video.liveStreamingDetails.scheduledStartTime ??
                video.snippet.publishedAt;
        }

        return video.snippet.publishedAt;
    }
}
