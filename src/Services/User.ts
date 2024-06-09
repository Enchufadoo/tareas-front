import { api } from './Api'

type User = {
  data: {
    user: {
      username: string
      name: string
      email: string
      id: number
    }
  }
}
type SetLoginResponse = { token: string }
type SetLoginEmailResponse = { data: { token: string } }
type SetLoginEmailParams = {
  email: string
  password: string
}

export const userApi = api.injectEndpoints({
  overrideExisting: true,

  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => {
        return {
          url: `/user/`,
          method: 'GET'
        }
      },

      providesTags: ['User']
    }),
    setUsername: build.mutation<{ data: { username: string } }, string>({
      query: (username) => {
        return {
          url: `/user/username`,
          method: 'POST',
          params: {
            username
          }
        }
      },
      invalidatesTags: []
    }),
    setLogin: build.mutation<SetLoginResponse, string>({
      query: (accessToken) => {
        return {
          url: `/login/oauth`,
          method: 'POST',
          params: {
            accessToken
          }
        }
      },
      invalidatesTags: []
    }),

    setLoginEmail: build.mutation<SetLoginEmailResponse, SetLoginEmailParams>({
      query: (loginParams) => {
        return {
          url: `/user/login/email`,
          method: 'POST',
          data: loginParams
        }
      },
      invalidatesTags: []
    }),

    setPasswordReset: build.mutation<{}, { email: string }>({
      query: (params) => {
        return {
          url: `/user/password/reset`,
          method: 'POST',
          params: params
        }
      },
      invalidatesTags: []
    }),
    setPasswordEnterResetCode: build.mutation<
      { data: { renewal_token: string }; message: string },
      { email: string; code: string }
    >({
      query: (params) => {
        return {
          url: `/user/password/code`,
          method: 'POST',
          params: params
        }
      },
      invalidatesTags: []
    }),
    setNewPasswordForReset: build.mutation<
      {},
      { password: string; renewal_token: string; code: string }
    >({
      query: (params) => {
        return {
          url: `/user/password/reset/update`,
          method: 'POST',
          params: params
        }
      },
      invalidatesTags: []
    }),
    setUpdateProfile: build.mutation<{}, { username: string; name: string }>({
      query: (params) => {
        return {
          url: `/user`,
          method: 'PATCH',
          params: params
        }
      },
      invalidatesTags: ['User']
    }),
    setUpdatePassword: build.mutation<
      {},
      { password: string; old_password: string }
    >({
      query: (params) => {
        return {
          url: `/user/password`,
          method: 'PATCH',
          params: params
        }
      }
    }),
    isUsernameAvailable: build.query<{ data: { available: boolean } }, string>({
      query: (username) => {
        return {
          url: `/user/username/available`,
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
          url: `/user/email/available`,
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
  useSetPasswordEnterResetCodeMutation,
  useSetPasswordResetMutation,
  useSetUsernameMutation,
  useLazyGetUserQuery,
  useSetLoginMutation,
  useSetUpdateProfileMutation,
  useSetNewPasswordForResetMutation,
  useSetUpdatePasswordMutation,
  useLazyIsUsernameAvailableQuery,
  useLazyIsEmailAvailableQuery
} = userApi
