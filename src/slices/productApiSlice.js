
import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Injecting product-related endpoints
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, // This keeps the data for 5 seconds after it is no longer used
      providesTags: ["Product"], // This allows caching and invalidation based on tags
    }),
    getProductById: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`, // Assuming you fetch by product ID
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),

  overrideExisting: false, // You can set this to true if you need to override any existing endpoints
});

// Export the hook for using the query
export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;