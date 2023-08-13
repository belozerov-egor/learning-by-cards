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
    }
  },
})

type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  orderBy: string | null
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
