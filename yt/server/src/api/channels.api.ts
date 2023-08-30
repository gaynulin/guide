import {IApiRequest, Part, ResponseKind, Thumbnail} from "./IApiRequest";


export interface IChannelItem {
    "kind": string, //"youtube#channel"
    "etag": string,
    "id": string, //channelId
    "snippet": {
        "title": string, //"ФЕЙГИН LIVE",
        "description": string,
        "customUrl": string, //"@feyginlive",
        "publishedAt": string, // "2009-06-21T12:12:29Z",
        "thumbnails": {
            "default": Thumbnail,
            "medium": Thumbnail,
            "high": Thumbnail
        },
        "localized": {
            "title": string,
            "description": string
        },
        "country": string
    },
    "contentDetails": {
        "relatedPlaylists": {
            "likes": string,
            "uploads": string, //"UUQVtD_N4OeD-9PshBq7NwyQ"
        }
    },
}

export interface IChannelsResponse {
    kind: ResponseKind.CHANNELS,
    etag: string,
    pageInfo: {
        "totalResults": number,
        "resultsPerPage": number,
    },
    items: IChannelItem[]
}

export class ApiChannels implements IApiRequest {
    // private readonly ids: string[];
    constructor(private readonly ids: string[]) {}
    getUrl(): string {
        const parts = [
            Part.SNIPPET,
            Part.CONTENT_DETAILS,
            Part.BRANDING_SETTINGS,
            Part.CONTENT_OWNER_DETAILS,
            Part.ID,
            Part.LOCALIZATIONS,
            Part.STATISTICS,
            Part.STATUS,
            Part.TOPIC_DETAILS,
        ];
        return `channels?id=${this.ids.join(',')}&part=${parts.join(',')}`;
    }
}