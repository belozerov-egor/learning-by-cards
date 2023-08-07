import { baseApi } from '../base-api.ts'

import { CardsResponse, GetRequestType } from './types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardsResponse, GetRequestType>({
        query: ({ id, question, ...args }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'GET',
          params: { question, ...args },
        }),
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsApi
