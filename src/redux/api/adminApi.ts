import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
    _id: string | null;
    [key: string]: any;
}

export interface User {
    _id: string;
    [key: string]: any;
}

export interface Order {
    _id: string;
    [key: string]: any;
}

export interface ApiResponse<T> {
    result: T;
}

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/order", credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => ({
        getAllOrder: builder.query<Order[], void>({
            query: () => ({
                url: "/get-all-orders",
                method: "GET",
            }),
            providesTags: ["admin"],
            transformResponse: (data: ApiResponse<Order[]>) => data.result,
        }),
        getReturnRequestedOrder: builder.query<Order[], void>({
            query: () => ({
                url: "/get-return-requested-order",
                method: "GET",
            }),
            providesTags: ["admin"],
            transformResponse: (data: ApiResponse<Order[]>) => data.result,
        }),
        ReturnRequestedOrderUpdate: builder.mutation<void, { _id: string }>({
            query: (userData) => ({
                url: `/return-order/${userData._id}`,
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["admin"],
        }),
        getOrderDetails: builder.query<Order, string>({
            query: (id) => ({
                url: `/orders-details/${id}`,
                method: "GET",
            }),
            providesTags: ["admin"],
            transformResponse: (data: ApiResponse<Order>) => data.result,
        }),
        cancelOrder: builder.mutation<void, { _id: string }>({
            query: (userData) => ({
                url: `/cancel-order/${userData._id}`,
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["admin"],
        }),
        updateOrderStatus: builder.mutation<void, { _id: string; status: string }>({
            query: (userData) => ({
                url: `/update-status/${userData._id}`,
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["admin"],
        }),
    }),
});

export const {
    useGetAllOrderQuery,
    useGetReturnRequestedOrderQuery,
    useReturnRequestedOrderUpdateMutation,
    useGetOrderDetailsQuery,
    useCancelOrderMutation,
    useUpdateOrderStatusMutation,

} = adminApi;
