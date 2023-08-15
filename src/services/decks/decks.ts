import { baseApi } from '../base-api.ts'

import { Deck, DecksResponse, GetDecksArgs, LearnDeckResponse } from './types.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksResponse, GetDecksArgs>({
        query: args => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      getDeck: builder.query<Deck, { id: string | undefined }>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'GET',
        }),
        providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<any, any>({
        query: ({ name, isPrivate }) => ({
          url: 'v1/decks',
          method: 'POST',
          body: { name, isPrivate },
        }),
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<any, { id: string; name: string; isPrivate: boolean }>({
        query: ({ id, name, isPrivate }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body: { name, isPrivate },
        }),
        invalidatesTags: ['Decks'],
      }),
      createCard: builder.mutation<
        any,
        { id: string | undefined; question: string; answer: string }
      >({
        query: ({ id, ...args }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'POST',
          body: { ...args },
        }),
        invalidatesTags: ['Cards'],
      }),

      deletedDeck: builder.mutation<any, any>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks'],
      }),
      learnDeck: builder.query<
        LearnDeckResponse,
        { id: string | undefined; previousCardId?: string }
      >({
        query: ({ id, previousCardId }) => {
          return {
            url: `v1/decks/${id}/learn`,
            method: 'GET',
            params: { previousCardId },
          }
        },
        providesTags: ['Cards'],
      }),
      updateGradeCard: builder.mutation<
        LearnDeckResponse,
        { id: string | undefined; cardId: string | undefined; grade: number }
      >({
        query: ({ id, cardId, grade }) => ({
          url: `v1/decks/${id}/learn`,
          method: 'POST',
          body: { cardId, grade },
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useGetDeckQuery,
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useUpdateDeckMutation,
  useCreateCardMutation,
  useLearnDeckQuery,
  useUpdateGradeCardMutation,
} = decksApi
