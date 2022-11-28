import {configureStore} from "@reduxjs/toolkit";
import {manageSlice} from "../features/manageSlice";

export const store = configureStore({
    reducer: {
        manage: manageSlice.reducer
    }
    // middleware: getDefaultMiddleware => getDefaultMiddleware()
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// export type AccountState = ReturnType<typeof accountSlice.reducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch