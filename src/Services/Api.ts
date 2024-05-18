import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './Axios/AxiosBaseQuery'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.PUBLIC_API_URL + '/api'
  }),
  endpoints: () => ({}),
  keepUnusedDataFor: 10,
  tagTypes: ['User', 'TaskView', 'TasksList', 'SettingsList']
})
