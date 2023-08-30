import { configureStore } from "@reduxjs/toolkit/";

/**
 * @see https://codesandbox.io/s/12-example-of-rtk-query-torm76?file=/src/features/posts/postsSlice.js:0-1715
 * @see https://medium.com/@jannden/rtk-query-2023-crash-course-49f1dcb652e7
 *
 * @see https://codesandbox.io/s/11-react-redux-cafe-rtk-async-dtgd80
 * @see https://medium.com/@jannden/redux-toolkit-rtk-2023-crash-course-bb4edb5177dd
 *
 * @author https://medium.com/@jannden
 */
// import { postsApiSlice } from "../features/posts/postsSlice";
import { videosApiSlice } from "./videoSlice";

/**
 * @see https://redux-toolkit.js.org/rtk-query/usage-with-typescript
 */

export const store = configureStore({
    reducer: {
        [videosApiSlice.reducerPath]: videosApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(videosApiSlice.middleware)
});


