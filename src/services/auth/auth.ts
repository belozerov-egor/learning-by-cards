import { baseApi } from '../base-api.ts'

import { ResponseUserType } from './types.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      me: builder.query<ResponseUserType, void>({
        query: () => ({
          url: 'v1/auth/me',
          method: 'GET',
        }),
      }),
    }
  },
})

export const { useMeQuery } = authApi
