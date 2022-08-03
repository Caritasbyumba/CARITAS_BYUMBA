import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL + '/api',
  }),
  endpoints: (builder) => {
    return {
      fetchActiveCarousel: builder.query({
        query: () => {
          return '/carousels/active';
        },
      }),
      fetchActiveMoreOnUs: builder.query({
        query: () => {
          return '/moreonus/active';
        },
      }),
      fetchActiveMainProjects: builder.query({
        query: () => {
          return '/projects/main';
        },
      }),
      fetchActivePartners: builder.query({
        query: () => {
          return '/partners/active';
        },
      }),
      fetchActiveAboutus: builder.query({
        query: () => {
          return '/aboutus/active';
        },
      }),
      fetchActiveQuotes: builder.query({
        query: () => {
          return '/quotes/active';
        },
      }),
    };
  },
});

export const {
  useFetchActiveCarouselQuery,
  useFetchActiveMoreOnUsQuery,
  useFetchActiveMainProjectsQuery,
  useFetchActivePartnersQuery,
  useFetchActiveAboutusQuery,
  useFetchActiveQuotesQuery,
} = userApiSlice;
