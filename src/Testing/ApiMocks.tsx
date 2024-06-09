/**
 * Mocking server for doing integration tests, need to look up
 * how to organize the responses @todo
 */

import { http, HttpResponse } from 'msw'
import TaskWeek from '@/Testing/Responses/TaskWeek'
import GuestEmailAvailable from '@/Testing/Responses/GuestEmailAvailable'
import GuestUsernameAvailable from '@/Testing/Responses/GuestUsernameAvailable'
import GuestRegistrationEmail from '@/Testing/Responses/GuestRegistrationEmail'
import UserLoginEmail from '@/Testing/Responses/UserLoginEmail'
import UserPasswordReset from '@/Testing/Responses/UserPasswordReset'
import UserPasswordCode from '@/Testing/Responses/UserPasswordCode'
import UserPassword from '@/Testing/Responses/UserPassword'
import UserPasswordResetUpdate from '@/Testing/Responses/UserPasswordResetUpdate'
import Task from '@/Testing/Responses/Task'
import UserUsernameAvailable from '@/Testing/Responses/UserUsernameAvailable'
import User from '@/Testing/Responses/User'
import Setting from '@/Testing/Responses/Setting'
import SettingId from '@/Testing/Responses/SettingId'
import TaskStoreData from '@/Testing/Responses/TaskStoreData'
import TaskId from '@/Testing/Responses/TaskId'
import taskProgressId from '@/Testing/Responses/TaskProgressId'

const { setupServer } = require('msw/node')

const BASE_URL = process.env.PUBLIC_API_URL + '/api'

export const createHandler = (url: string, code: string) => {
  const data = RESPONSES[url][code]

  return {
    handler: http[data.method](getUrl(url), ({ params }) => {
      return HttpResponse.json(data.response, {
        status: RESPONSES[url][code].status || 200
      })
    }),
    response: data.response
  }
}

export const getResponseData = (url: string, code: string) => {
  return RESPONSES[url][code].response
}

export const initMSW = () => {
  const server = setupServer(...[])

  beforeAll(() => server.listen()) // Enable API mocking before tests
  afterEach(() => server.resetHandlers()) // Reset any runtime handlers
  afterAll(() => server.close()) // Clean up API mocking after tests

  return server
}

const getUrl = (url: string) => {
  return `${BASE_URL}` + url
}

export enum REQUEST_METHODS {
  'get' = 'get',
  'post' = 'post'
}

type Endpoints = {
  [key: string]: {
    [key: string]: {
      method: string
      response: any
      status?: number
    }
  }
}

const RESPONSES: Endpoints = {
  '/task/week': TaskWeek,
  '/guest/email/available': GuestEmailAvailable,
  '/guest/username/available': GuestUsernameAvailable,
  '/guest/registration/email': GuestRegistrationEmail,
  '/user/login/email': UserLoginEmail,
  '/user/password/reset': UserPasswordReset,
  '/user/password/code': UserPasswordCode,
  '/user/password': UserPassword,
  '/user/password/reset/update': UserPasswordResetUpdate,
  '/user/username/available': UserUsernameAvailable,
  '/task': Task,
  '/task/:id': TaskId,
  '/user': User,
  '/setting': Setting,
  '/setting/:id': SettingId,
  '/task/store/data': TaskStoreData,
  '/task/progress/:id': taskProgressId
}

export const server = initMSW()
