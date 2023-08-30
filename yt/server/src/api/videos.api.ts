import {IApiRequest, Part, ResponseKind, Thumbnail} from "./IApiRequest";


export enum VideoBroadcastContent {
    LIVE = 'live',
    NONE = 'none',
    UPCOMING = 'upcoming',
}

export interface IVideoItem {
    "kind": string, //"youtube#playlistItem"
    "etag": string,
    "id": string, //playlistItemId
    "snippet": {
        "title": string,
        "description": string,
        "channelId": string,
        "publishedAt": string, // "2009-06-21T12:12:29Z",
        "thumbnails": {
            "default": Thumbnail,
            "medium": Thumbnail,
            "high": Thumbnail,
            "standard": Thumbnail,
            "maxres": Thumbnail,
        },
        "channelTitle": string,
        tags: string[],
        categoryId: string,
        liveBroadcastContent: VideoBroadcastContent,

        localized: {
            "title": string,
            "description": string,
        },
        defaultAudioLanguage: string,
    },
    "contentDetails": {
        "duration": string,
        "dimension": string,
        "definition": string,
        "caption": string,
        "licensedContent": boolean,
        "contentRating": {},
        "projection": string
    },
    "status": {
        "uploadStatus": string,
        "privacyStatus": string,
        "license": string,
        "embeddable": boolean,
        "publicStatsViewable": boolean,
        "madeForKids": boolean
    },
    "statistics": {
        "viewCount": string,
        "likeCount": string,
        "favoriteCount": string,
        "commentCount": string,
    },
    "player": {
        "embedHtml": string
    },
    "topicDetails": {
        "topicCategories": string[]
    },
    "recordingDetails": object,
    "liveStreamingDetails": {
        "actualStartTime": string,
        "actualEndTime": string,
        "scheduledStartTime": string,
        "activeLiveChatId": string,
    }
}

export interface IVideoResponse {
    kind: ResponseKind.VIDEO,
    etag: string,
    "nextPageToken": string,
    pageInfo: {
        "totalResults": number,
        "resultsPerPage": number,
    },
    items: IVideoItem[]
}

export class ApiVideo implements IApiRequest {
    constructor(private readonly videoIDs: string[]) {}
    getUrl(): string {
        console.log('>>>>>>', this.videoIDs)
        const parts = [
            Part.STATUS,
            Part.SNIPPET,
            Part.CONTENT_DETAILS,
            Part.STATISTICS,
            Part.LIVE_STREAMING_DETAILS,
            Part.PLAYER,
            Part.RECORDING_DETAILS,
            Part.TOPIC_DETAILS,
        ];
        return `videos?id=${this.videoIDs.join(',')}&part=${parts.join(',')}`;
    }
}