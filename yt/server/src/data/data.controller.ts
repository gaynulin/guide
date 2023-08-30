import {Controller, Get, Param} from '@nestjs/common';
import {DataService} from "./data.service";

@Controller('data')
export class DataController {
    constructor(private readonly dataService: DataService) {
    }

    @Get("/channel/:channelId")
    public getChannelData(@Param("channelId") channelId) {
        return this.dataService.getChannelData(channelId);
    }

    @Get("/channels/:channelIds")
    public getChannelsData(@Param("channelIds") channelIds) {
        return this.dataService.getChannelsData(channelIds.split(','));
    }

    @Get("/channels")
    public getAllChannelsData() {
        return this.dataService.getChannelsData();
    }

    @Get("/subscriptions")
    public getChannels() {
        return this.dataService.getSubscriptions();
    }

    @Get("/playlists")
    public getPlaylists() {
        return this.dataService.getPlaylists();
    }

    @Get("/videos")
    public getVideos() {
        return this.dataService.getPlaylistsVideos();
    }
}
