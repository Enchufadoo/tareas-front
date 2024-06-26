import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { axiosInstance } from './AxiosConfig'

/**
 * Custom axios request for RTK query
 * @link https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#axios-basequery
 */
const axiosBaseQuery =
  ({
    baseUrl
  }: {
    baseUrl: string
  }): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance.request({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          Aceept: 'application/json'
        }
      })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      let data = err.response.data

      let message = null

      if (
        typeof data === 'object' &&
        data != null &&
        'message' in data &&
        typeof (data as any).message === 'string'
      ) {
        message = data.message
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
          message: message
        }
      }
    }
  }

export { axiosBaseQuery }
