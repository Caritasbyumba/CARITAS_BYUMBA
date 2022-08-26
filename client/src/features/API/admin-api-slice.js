import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApiSlice = createApi({
  reducerPath: 'adminAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL + '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().global.token;
      headers.set('Authorization', token);
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
