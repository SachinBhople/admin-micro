import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ApiResponse, Product } from "./adminApi"

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5500/api/products", credentials: "include" }),
    tagTypes: ["product"],
    endpoints: (builder) => {
        return {
            adminGetAllProducts: builder.query<Product[], void>({
                query: () => ({
                    url: "/get-products",
                    method: "GET",
                }),
                providesTags: ["product"],
                transformResponse: (data: ApiResponse<Product[]>) => data.result,
            }),
            adminAddProduct: builder.mutation<void, Partial<Product>>({
                query: (userData) => ({
                    url: "/add-product",
                    method: "POST",
                    body: userData,
                }),
                invalidatesTags: ["product"],
            }),
            adminUpdateProduct: builder.mutation<void, Product>({
                query: (userData) => ({
                    url: `/update-product/${userData._id}`,
                    method: "PUT",
                    body: userData.formData,
                }),
                invalidatesTags: ["product"],
            }),
            adminDeleteProduct: builder.mutation<void, { _id: string }>({
                query: (userData) => ({
                    url: `/delete-product/${userData}`,
                    method: "DELETE",
                    // body: userData,
                }),
                invalidatesTags: ["product"],
            }),
            deactivateProduct: builder.mutation<void, { _id: string }>({
                query: (userData) => ({
                    url: `/deactivate-product/${userData}`,
                    method: "PUT",
                    // body: userData,
                }),
                invalidatesTags: ["product"],
            }),
            activateProduct: builder.mutation<void, { _id: string }>({
                query: (userData) => ({
                    url: `/activate-product/${userData}`,
                    method: "PUT",
                    // body: userData,
                }),
                invalidatesTags: ["product"],
            }),
            getProductDetails: builder.query<Product, string>({
                query: (id) => ({
                    url: `/product-details/${id}`,
                    method: "GET",
                }),
                providesTags: ["product"],
                transformResponse: (data: ApiResponse<Product>) => data.result,
            }),
        }
    }
})

export const {
    useAdminGetAllProductsQuery,
    useAdminAddProductMutation,
    useAdminUpdateProductMutation,
    useAdminDeleteProductMutation,
    useDeactivateProductMutation,
    useActivateProductMutation,
    useGetProductDetailsQuery,
} = productApi
