/**
 * Mocking server for doing integration tests, need to look up
 * how to organize the responses @todo
 */

import { http, HttpResponse } from 'msw'
import TaskWeek from '@/Testing/Responses/TaskWeek'
import UserEmailAvailable from '@/Testing/Responses/UserEmailAvailable'
import UserUsernameAvailable from '@/Testing/Responses/UserUsernameAvailable'
import UserRegistrationEmail from '@/Testing/Responses/UserRegistrationEmail'
import UserLoginEmail from '@/Testing/Responses/UserLoginEmail'
import UserPasswordReset from '@/Testing/Responses/UserPasswordReset'

const { setupServer } = require('msw/node')

const BASE_URL = process.env.PUBLIC_API_URL + '/api'

export const createHandler = (url: string, code: string) => {
  const data = RESPONSES[url][code]

  return {
    handler: http[data.method](getUrl(url), () => {
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

export const createHandlerResponse = (server, url: string, code: string) => {
  server.use(createHandler(url, code))
  return getResponseData(url, code)
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
  '/user/email/available': UserEmailAvailable,
  '/user/username/available': UserUsernameAvailable,
  '/user/registration/email': UserRegistrationEmail,
  '/user/login/email': UserLoginEmail,
  '/user/password/reset': UserPasswordReset,
  '/task': {
    '1_UNFINISHED': {
      method: REQUEST_METHODS.get,
      response: {
        data: {
          task_count: {
            finished: 0,
            unfinished: 1
          },
          tasks: [
            {
              id: 1,
              title: 'Test',
              description: 'Testttsltksskl',
              user_id: 2,
              finished: 0,
              end_date: null,
              created_at: '2024-03-06T22:59:48.000000Z',
              updated_at: '2024-03-06T22:59:48.000000Z',
              deleted_at: null,
              hours_since_progress: 722,
              last_progress: {
                id: 1,
                task_id: 1,
                user_id: 2,
                created_at: '2024-03-06T23:00:44.000000Z',
                updated_at: '2024-03-06T23:00:44.000000Z'
              },
              progress_today: false,
              user: {
                username: 'ariel123',
                email: 'ariel@mooo.com',
                avatar: null
              }
            }
          ]
        },
        message: 'List of tasks'
      }
    },
    '0_TASKS': {
      method: REQUEST_METHODS.get,
      response: {
        data: {
          task_count: {
            finished: 0,
            unfinished: 0
          },
          tasks: []
        },
        message: 'List of tasks'
      }
    },
    '1_FINISHED': {
      method: REQUEST_METHODS.get,
      response: {
        data: {
          task_count: {
            finished: 1,
            unfinished: 0
          },
          tasks: [
            {
              id: 1,
              title: 'Test',
              description: 'finished task 99',
              user_id: 2,
              finished: 1,
              end_date: null,
              created_at: '2024-03-06T22:59:48.000000Z',
              updated_at: '2024-03-06T22:59:48.000000Z',
              deleted_at: null,
              hours_since_progress: 722,
              last_progress: {
                id: 1,
                task_id: 1,
                user_id: 2,
                created_at: '2024-03-06T23:00:44.000000Z',
                updated_at: '2024-03-06T23:00:44.000000Z'
              },
              progress_today: false,
              user: {
                username: 'ariel123',
                email: 'ari@ari.com',
                avatar: null
              }
            }
          ]
        },
        message: 'List of tasks'
      }
    }
  }
}

export const server = initMSW()
