import { current } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BaseQueryError, BaseQueryMeta} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {useSelector} from "react-redux";

// const baseUrl = "https://jsonplaceholder.typicode.com/";
const baseUrl = "http://localhost:3000/";


interface IChannel {
    id: string
    title: string
    description: string | null
    customUrl: string | null
    publishedAt: Date
    thumbnails: string | null
    localized: string | null
    likesPlaylists: string | null
    uploadsPlaylists: string | null
    updatedAt: Date
}

interface IVideo {
    id: string
    channelId: string
    title: string
    publishedAt: Date
    description: string
    channelTitle: string | null
    thumbnails: string | null
    tags: string[]
    categoryId: string
    liveBroadcastContent: string
    localized: string | null
    defaultAudioLanguage: string | null
    contentDetails: string | null
    status: string | null
    statistics: string | null
    player: string | null
    topicDetails: string | null
    recordingDetails: string | null
    liveStreamingDetails: string | null
    whenAt: Date
    updatedAt: Date,

    channel: IChannel,
}
type VideosResponse = IVideo[]


/**
 * @see https://redux-toolkit.js.org/rtk-query/usage-with-typescript
 *
 * @see https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced
 */

export const videosApiSlice = createApi({
    reducerPath: "videosApi",

    baseQuery: fetchBaseQuery(
        { baseUrl }
    ),
    tagTypes: ["Videos"],
    endpoints: (builder) => ({
        getVideos: builder.query<VideosResponse, void>({
            query: () => "/videos",
            // transformErrorResponse(baseQueryReturnValue: BaseQueryError<BaseQuery>, meta: BaseQueryMeta<BaseQuery>, arg: QueryArg): unknown {
            //     return []
            // },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Videos' as const, id })),
                        { type: 'Videos', id: 'LIST' },
                    ]
                    : [{ type: 'Videos', id: 'LIST' }],
            // providesTags: ["videos"],
            // transformResponse: (rawResult: { result: { post: Post } }, meta) => {
            //     //                                                        ^
            //     // The optional `meta` property is available based on the type for the `baseQuery` used
            //
            //     // The return value for `transformResponse` must match `ResultType`
            //     return rawResult.result.post
            // },
            // queryFn: (arg, queryApi, extraOptions, baseQuery) => {
            //     if (arg <= 0) {
            //         return {
            //             error: {
            //                 status: 500,
            //                 statusText: 'Internal Server Error',
            //                 data: 'Invalid ID provided.',
            //             },
            //         }
            //     }
            //     const post: Post = {
            //         id: arg,
            //         name: getRandomName(),
            //     }
            //     return { data: post }
            // },
        }),
        // getPost: builder.query({
        //     query: (postId) => `/posts/${postId}`
        // }),
        // editPost: builder.mutation({
        //     query: post => ({
        //         url: `posts/${post.id}`,
        //         method: 'PATCH',
        //         body: post
        //     }),
        //     invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        // }),
        addNewVideo: builder.mutation<IVideo, Pick<IVideo, 'title' | 'description'>>({ // @todo
            query: (videoData) => ({
                url: "/videos",
                method: "POST",
                body: videoData
            }),
            /*
              We can use invalidatesTags in order to re-fetch from server new results.
              We can also use onQueryStarted to update the state directly without re-fetching
            */
            // invalidatesTags: ["Videos"],
            async onQueryStarted(videoData, { dispatch, queryFulfilled }) {
                try {
                    const { data: newVideo } = await queryFulfilled;

                    // Updating getVideos data
                    dispatch(
                        videosApiSlice.util.updateQueryData(
                            "getVideos",
                            undefined,
                            (draft) => {
                                draft.push(newVideo);
                                console.log("after adding", newVideo, "we have", current(draft));
                            }
                        )
                    );

                    // Updating getPost data
                    // dispatch(
                    //     videosApiSlice.util.upsertQueryData("getPost", newPost.id, newPost)
                    // );
                } catch (error) {
                    console.error("error", error);
                }
            }
        })
    })
});

export const {
    useGetVideosQuery,
    // useGetPostQuery,
    useAddNewVideoMutation
} = videosApiSlice;


// export const selectAllUsers = (state ) => state.videos
export const selectVideosByDateNormalised = (state: void) => {
    // @ts-ignore
    const d = videosApiSlice.endpoints.getVideos.select()(state);
    // @ts-ignore
    console.log({d}, d.data)
    // @ts-ignore
    return d.data
}
//
// export const selectVideosByDate = (state, date) =>
//     state.videos.find(user => user.id === userId)

//
// const user = date => useSelector(state => selectVideosByDate(state, date))
