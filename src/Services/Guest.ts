import { api } from './Api'

export const userApi = api.injectEndpoints({
  overrideExisting: true,

  endpoints: (build) => ({
    setRegistrationEmail: build.mutation<
      { data: { token: string } },
      {
        name: string
        email: string
        password: string
        username: string
      }
    >({
      query: (params) => {
        return {
          url: `/guest/registration/email`,
          method: 'POST',
          data: params
        }
      },
      invalidatesTags: []
    }),
    isUsernameAvailable: build.query<{ data: { available: boolean } }, string>({
      query: (username) => {
        return {
          url: `/guest/username/available`,
          method: 'GET',
          params: {
            username
          }
        }
      },
      providesTags: []
    }),
    isEmailAvailable: build.query<{ data: { available: boolean } }, string>({
      query: (email) => {
        return {
          url: `/guest/email/available`,
          method: 'GET',
          params: {
            email
          }
        }
      },
      providesTags: []
    })
  })
})

export const {
  useSetRegistrationEmailMutation,
  useLazyIsEmailAvailableQuery,
  useLazyIsUsernameAvailableQuery
} = userApi
