import { api } from './Api'

export type SettingsData = {
  [key in 'theme' | string]: {
    default: string
    default_id: number
    id: number
    value: 'light' | 'dark' | 'system'
    options: Array<{
      setting_id: number
      value_id: number
      created_at: string
      updated_at: string
      id: number
      value: string
    }>
  }
}

export type GetSettingsResponse = {
  data: {
    settings: SettingsData
  }
}

export const SettingsApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSettings: build.query<GetSettingsResponse, void>({
      providesTags: ['SettingsList'],
      query: () => {
        return {
          url: `/setting`,
          method: 'GET'
        }
      }
    }),
    setSetting: build.mutation<{}, { settingId: number; settingValue: string }>(
      {
        query: (params) => {
          return {
            url: `/setting/` + params.settingId,
            method: 'PUT',
            data: {
              value: params.settingValue
            }
          }
        }
      }
    )
  })
})

export const { useLazyGetSettingsQuery, useSetSettingMutation } = SettingsApi
