import { api } from './Api'
import moment from 'moment'

export type Task = {
  id: number
  title: string
  description: string
  created_at: string
  created_at_date: string
  hours_since_progress: number
  progress_today: boolean
  last_progress?: {
    created_at: string
    id: number
  }
}

export type TaskCount = { finished: number; unfinished: number }

export enum TaskProgressState {
  open,
  finished,
  all
}

interface TaskWithUser extends Task {
  user: {
    username: string
    email: string
    avatar: string
  }
}

export type GetTasksResponse = {
  data: {
    tasks: Task[]
    task_count: TaskCount
  }
}

type GetTaskResponse = {
  data: {
    task: TaskWithUser
  }
}

type getCreateTaskDataResponse = {
  data: {
    friends: string[]
  }
}
type setAddTaskProgressResponse = {
  data: {}
}
type setRemoveTaskProgressResponse = {
  data: {}
}

type setDeleteTaskResponse = {
  data: {}
}

type CreateTaskData = {
  title: string
  description: string
}

export enum FinishTask {
  unfinished,
  finished
}

type FinishTaskData = {
  taskId: number
  finishTask: FinishTask
}

type setCreateTaskResponse = {}

export const tasksApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, number>({
      providesTags: ['TasksList'],
      query: (finished: number) => {
        return {
          url: `/task`,
          method: 'GET',
          params: {
            finished: finished
          }
        }
      }
    }),
    getTask: build.query<GetTaskResponse, number>({
      query: (id: number) => {
        return {
          url: `/task/${id}`,
          method: 'GET'
        }
      },
      transformResponse: (response: GetTaskResponse) => {
        response.data.task.created_at_date = moment().format('YYYY-MM-DD')
        return response
      },
      providesTags: ['TaskView']
    }),
    setCreateTask: build.mutation<setCreateTaskResponse, CreateTaskData>({
      query: (taskData) => {
        return {
          url: `/task`,
          method: 'POST',
          data: taskData
        }
      },
      invalidatesTags: ['TasksList']
    }),
    setAddTaskProgress: build.mutation<setAddTaskProgressResponse, number>({
      query: (taskId) => {
        return {
          url: `/task/progress/${taskId}`,
          method: 'POST',
          data: {}
        }
      },
      invalidatesTags: ['TaskView', 'TasksList']
    }),
    setRemoveTaskProgress: build.mutation<
      setRemoveTaskProgressResponse,
      number
    >({
      query: (taskId) => {
        return {
          url: `/task/progress/${taskId}`,
          method: 'DELETE',
          data: {}
        }
      },
      invalidatesTags: ['TaskView', 'TasksList']
    }),
    setDeleteTask: build.mutation<setDeleteTaskResponse, number>({
      query: (taskId) => {
        return {
          url: `/task/${taskId}`,
          method: 'DELETE',
          data: {}
        }
      },
      invalidatesTags: ['TasksList']
    }),
    setFinishTask: build.mutation<setDeleteTaskResponse, FinishTaskData>({
      query: (finishTaskData) => {
        return {
          url: `/task/finish/${finishTaskData.taskId}/${finishTaskData.finishTask}`,
          method: 'PUT',
          data: {}
        }
      },
      invalidatesTags: ['TasksList']
    }),
    getCreteTaskData: build.query<getCreateTaskDataResponse, void>({
      query: () => {
        return {
          url: `/task/store/data`,
          method: 'GET'
        }
      }
    }),
    getWeeksTasks: build.query<
      {
        data: {
          progress: {
            [key: number]: boolean[]
          }
          tasks: {
            id: number
            title: string
          }[]
        }
      },
      void
    >({
      query: () => {
        return {
          url: `/task/week`,
          method: 'GET'
        }
      },
      providesTags: []
    })
  })
})

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useGetCreteTaskDataQuery,
  useSetCreateTaskMutation,
  useSetAddTaskProgressMutation,
  useSetRemoveTaskProgressMutation,
  useSetFinishTaskMutation,
  useLazyGetWeeksTasksQuery
} = tasksApi
