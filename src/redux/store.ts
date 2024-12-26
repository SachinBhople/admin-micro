import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./api/adminApi";
import { productApi } from "./api/productApi";
import { userApi } from "./api/userApi";
import authSlice from "auth/authSlice";

const reduxStore = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(adminApi.middleware, productApi.middleware, userApi.middleware),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore