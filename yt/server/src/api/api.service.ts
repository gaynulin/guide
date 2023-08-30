import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {catchError, lastValueFrom} from "rxjs";
import {AxiosError, AxiosRequestConfig} from "axios";
import {CachedApiReq} from "./api.decorator";
import {ApiSubscriptions, ISubscriptionItem, ISubscriptionsResponse} from "./subscriptions.api";
import {IApiRequest} from "./IApiRequest";
import {ApiPlaylist, IPlaylistItem, IPlaylistResponse} from "./playlistItems.api";
import {ApiChannels, IChannelItem, IChannelsResponse} from "./channels.api";
import {ApiVideo, IVideoItem, IVideoResponse} from "./videos.api";


@Injectable()
export class ApiService {
    private static YT_DATA_V3_BASE_URL = "https://www.googleapis.com/youtube/v3/";

    constructor(private readonly httpService: HttpService) {}

    /**
     * @todo return Observable not Promise
     * @todo and how to inject redis-cache here also!
     * @see https://blog.theuiguy.com/nest-js-caching-service-methods-with-custom-decorators
     */
    private async processRequest<T>(apiRequest: IApiRequest, options?: AxiosRequestConfig): Promise<T> {
        // TODO get key from configModule
        const url = `${ApiService.YT_DATA_V3_BASE_URL}${apiRequest.getUrl()}${!options ? `&key=${process.env.YT_DATA_V3_KEY}` : ''}`;

        console.log({url, options})
        const request = await this.httpService.get<T>(url, options)
            .pipe(
                // map((item) => {
                //     return item.data.routes;
                // }),
                catchError((err: AxiosError) => {
                    console.warn(`Catch Error! [url=${url}]`, {err});
                    // return null;
                    throw 'Error!';
                })

        // catchError((err: AxiosError) => {
        //     logger.error(err);
        //
        //     // Error handling Logic skipped for brevity.
        //     return of([]);
        // }),
            );
        const {data} = await lastValueFrom(request);

        return data;
    }

    private async processSSORequest<T>(apiRequest: IApiRequest): Promise<T> {
        const encodeToken = "ya29.a0AfB_byBOCzGmRBXbB5U-y17c30J7g8ED5_dS1uYTIrhBCpaLdpeXthMEHCRmKsDe7RGjSfkBFqmLzOP7I9d4cjtWP0VNwDw0ShpTx3UzqO4XB2tiepZyA5bg7Fm8lcE9eEQIoMwN0t-NXeI2TYq25bpJ5S4wh5SEn8VW2gaCgYKAYUSARASFQHsvYlsMfCNRhkmFhyyKRyJX71GOA0173";
        const options = {
            headers: {
                'Authorization': `Bearer ${encodeToken}`,
            }
        };

        return this.processRequest<T>(apiRequest, options);
    }

    @CachedApiReq({ttl: 24 * 60 * 60 * 1000})
    async channelsData(ids: string[]): Promise<IChannelItem[]> {
        const res = await this.processRequest<IChannelsResponse>(new ApiChannels(ids));
        return res.items;
    }

    @CachedApiReq()
    async channelPlaylistItems(channelId: string): Promise<IPlaylistItem[]> { // TODO
        const res = await this.processRequest<IPlaylistResponse>(new ApiPlaylist(channelId));
        return res.items;
    }

    @CachedApiReq()
    async subscriptions(): Promise<ISubscriptionItem[]> {
        const res = await this.processSSORequest<ISubscriptionsResponse>(new ApiSubscriptions());
        return res.items;
    }

    @CachedApiReq()
    async videos(IDs: string[]): Promise<IVideoItem[]> {
        console.log({IDs})
        const res = await this.processRequest<IVideoResponse>(new ApiVideo(IDs));
        return res.items;
    }
}
