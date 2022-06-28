import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
  endpoints: (builder) => {
    return {
      fetchActiveCarousel: builder.query({
        query: () => {
          return '/carousels/active';
        },
      }),
    };
  },
});

export const {useFetchActiveCarouselQuery} = userApiSlice;
