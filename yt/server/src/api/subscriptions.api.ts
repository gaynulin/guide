import {IApiRequest, Kind, Part, ResponseKind, Thumbnail} from "./IApiRequest";


export interface ISubscriptionItem {
    "kind": Kind.SUBSCRIPTION, //"youtube#subscription"
    "etag": string,
    "id": string, //channelId
    "snippet": {
        "channelId": string, // no this
        "description": string,
        "publishedAt": string, // "2009-06-21T12:12:29Z",
        "thumbnails": {
            "default": Thumbnail,
            "medium": Thumbnail,
            "high": Thumbnail
        },
        resourceId: {
            channelId: string, //"UCQVtD_N4OeD-9PshBq7NwyQ"
            kind: Kind, // "youtube#channel" <!-- only this
        }
        "title": string,
    },
    "contentDetails": {
        activityType: string, //"all"
        newItemCount: number, //1
        totalItemCount: number, //1539
    },
}

export interface ISubscriptionsResponse {
    kind: ResponseKind.SUBSCRIPTIONS,
    etag: string,
    pageInfo: {
        "totalResults": number,
        "resultsPerPage": number,
    },
    items: ISubscriptionItem[]
}

export class ApiSubscriptions implements IApiRequest {
    getUrl(): string {
        const parts = [Part.ID, Part.SNIPPET, Part.CONTENT_DETAILS]
        return `subscriptions?part=${parts.join(',')}&mine=true&maxResults=100`;
    }
}