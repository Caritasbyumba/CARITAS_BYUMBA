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
      fetchAllMoreonus: builder.query({
        query: () => {
          return '/moreonus';
        },
      }),
      fetchAllProjects: builder.query({
        query: () => {
          return '/projects';
        },
      }),
      fetchAllPartners: builder.query({
        query: () => {
          return '/partners';
        },
      }),
      fetchAllAboutus: builder.query({
        query: () => {
          return '/aboutus';
        },
      }),
      fetchAllQuotes: builder.query({
        query: () => {
          return '/quotes';
        },
      }),
      fetchAllProjectsIntro: builder.query({
        query: () => {
          return '/projectsintro';
        },
      }),
      fetchAllPartnersIntro: builder.query({
        query: () => {
          return '/partnersintro';
        },
      }),
      fetchAllPublicationsIntro: builder.query({
        query: () => {
          return '/publicationsintro';
        },
      }),
      fetchAllPublications: builder.query({
        query: () => {
          return '/publications';
        },
      }),
      fetchAllFaqs: builder.query({
        query: () => {
          return '/faqs';
        },
      }),
    };
  },
});

export const {
  useFetchAllCarouselsQuery,
  useFetchAllMoreonusQuery,
  useFetchAllProjectsQuery,
  useFetchAllPartnersQuery,
  useFetchAllAboutusQuery,
  useFetchAllQuotesQuery,
  useFetchAllFaqsQuery,
  useFetchAllPartnersIntroQuery,
  useFetchAllProjectsIntroQuery,
  useFetchAllPublicationsIntroQuery,
  useFetchAllPublicationsQuery,
} = adminApiSlice;
