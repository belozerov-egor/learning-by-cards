import { baseApi } from '../base-api.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<any, any>({
        query: ({ id }) => ({
          url: `v1/cards/${id}`,
          method: 'GET',
        }),
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsApi
