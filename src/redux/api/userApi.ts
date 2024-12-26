import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse, Order, User } from "./adminApi"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5002/api", credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getAllUsers: builder.query<User[], void>({
                query: () => ({
                    url: "/auth/user",
                    method: "GET",
                }),
                providesTags: ["user"],
                transformResponse: (data: ApiResponse<User[]>) => data.result,
            }),
            getUserDetails: builder.query<User, string>({
                query: (id) => ({
                    url: `/user-details/${id}`,
                    method: "GET",
                }),
                providesTags: ["user"],
                transformResponse: (data: ApiResponse<User>) => data.result,
            }),
            getUserOrders: builder.query<Order[], void>({
                query: () => ({
                    url: `/order/get-all-orders`,
                    method: "GET",
                }),
                providesTags: ["user"],
                transformResponse: (data: ApiResponse<Order[]>) => data.result,
            }),
            blockUsers: builder.mutation<void, { _id: string }>({
                query: (userData) => ({
                    url: `/block-user/${userData._id}`,
                    method: "PUT",
                    body: userData,
                }),
                invalidatesTags: ["user"],
            }),
            unblockUsers: builder.mutation<void, { _id: string }>({
                query: (userData) => ({
                    url: `/unblock-user/${userData._id}`,
                    method: "PUT",
                    body: userData,
                }),
                invalidatesTags: ["user"],
            }),
        }
    }
})

export const {
    useGetAllUsersQuery,
    useGetUserDetailsQuery,
    useGetUserOrdersQuery,
    useBlockUsersMutation,
    useUnblockUsersMutation, } = userApi
