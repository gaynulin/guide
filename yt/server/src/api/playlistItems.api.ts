import {IApiRequest, Part, ResponseKind, Thumbnail} from "./IApiRequest";


export interface IPlaylistItem {
    "kind": string, //"youtube#playlistItem"
    "etag": string,
    "id": string, //playlistItemId
    "snippet": {
        "title": string, //"ФЕЙГИН LIVE",
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
        "playlistId": string,
        "position": number,
        resourceId: {
            kind: string, // VIDEO -> youtube#video
            videoId: string,
        },
        "videoOwnerChannelTitle": string,
        "videoOwnerChannelId": string,
    },
    "contentDetails": {
        "videoId": string,
        "videoPublishedAt": string, //"2023-08-17T16:29:58Z"
    },
    "status": {
        "privacyStatus": string, //"public"
    }
}

export interface IPlaylistResponse {
    kind: ResponseKind.PLAYLIST,
    etag: string,
    "nextPageToken": string,
    pageInfo: {
        "totalResults": number,
        "resultsPerPage": number,
    },
    items: IPlaylistItem[]
}

export class ApiPlaylist implements IApiRequest {
    constructor(private readonly channelId: string) {}
    getUrl(): string {
        const parts = [Part.STATUS, Part.SNIPPET, Part.CONTENT_DETAILS];
        return `playlistItems?playlistId=${this.channelId}&part=${parts.join(',')}&maxResults=50`; // TODO
    }
}