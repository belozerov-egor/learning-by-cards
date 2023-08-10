import { baseApi } from '../base-api.ts'

import { Deck, DecksResponse } from './types.ts'

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
        query: ({ name }) => ({
          url: 'v1/decks',
          method: 'POST',
          body: { name },
        }),
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<any, { id: string; name: string }>({
        query: ({ id, name }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body: { name },
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
    }
  },
})

type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: number
  itemsPerPage?: number
}

export const {
  useGetDecksQuery,
  useGetDeckQuery,
  useCreateDeckMutation,
  useDeletedDeckMutation,
  useUpdateDeckMutation,
  useCreateCardMutation,
} = decksApi
