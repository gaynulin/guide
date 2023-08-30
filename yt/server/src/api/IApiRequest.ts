export interface IApiRequest {
    getUrl: () => string;
}


export enum Part {
    SNIPPET = 'snippet',
    CONTENT_DETAILS = 'contentDetails',
    BRANDING_SETTINGS = 'brandingSettings',
    CONTENT_OWNER_DETAILS = 'contentOwnerDetails',
    ID = 'id',
    LOCALIZATIONS = 'localizations',
    STATISTICS = 'statistics',
    STATUS = 'status',
    TOPIC_DETAILS = 'topicDetails',
    LIVE_STREAMING_DETAILS = 'liveStreamingDetails',
    PLAYER = 'player',
    RECORDING_DETAILS = 'recordingDetails',
}


export type Thumbnail = {
    "url": string, // "https://yt3.ggpht.com/ytc/AOPolaSmstGDMhPrfKwW_Z1xbGbFT7VoCBkNyBPnVLbA6g=s88-c-k-c0x00ffffff-no-rj",
    "width": number, // 88,
    "height": number, // 88
}

export enum ResponseKind {
    CHANNELS = "youtube#channelListResponse",
    SUBSCRIPTIONS = "youtube#SubscriptionListResponse",
    PLAYLIST = "youtube#playlistItemListResponse",
    VIDEO = "youtube#videoListResponse",
}


export enum Kind {
    CHANNEL = "youtube#channel",
    SUBSCRIPTION = "youtube#subscription",
    VIDEO = "youtube#video",
}