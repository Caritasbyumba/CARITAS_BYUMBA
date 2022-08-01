import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApiSlice = createApi({
  reducerPath: 'adminAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL + '/api',
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmI3YTM2NWMwMzMwZWQwNzNiYTY4NDQiLCJuYW1lIjoiVHV5aXplcmUgUGFjaWZpcXVlIiwicm9sZSI6ImNvbnRlbnQgY3JlYXRvciIsImlhdCI6MTY1NjQyMjQ2Mn0.qUpJbgXr2obfniINLHVMGFm-bAG8OzRuGrH0DLY8TJk'
      );
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      fetchAllCarousels: builder.query({
        query: () => {
          return '/carousels';
        },
      }),
    };
  },
});

export const { useFetchAllCarouselsQuery } = adminApiSlice;
