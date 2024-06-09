export default {
  GET_TASK_SUCCESSFULLY: {
    method: 'get',
    response: {
      data: {
        task: {
          id: 3,
          title: 'the title of the task',
          description: 'the description of the task',
          user_id: 1,
          finished: 1,
          end_date: null,
          created_at: '2024-05-20T17:16:22.000000Z',
          updated_at: '2024-05-20T17:17:55.000000Z',
          deleted_at: null,
          user: {
            username: 'ariel12345',
            email: 'ariel@ariel.com',
            avatar: null
          },
          progress_today: 0
        }
      },
      message: 'Task data'
    }
  },
  GET_TASK_SUCCESSFULLY_PROGRESS_ADDED: {
    method: 'get',
    response: {
      data: {
        task: {
          id: 3,
          title: 'the title of the task',
          description: 'the description of the task',
          user_id: 1,
          finished: 1,
          end_date: null,
          created_at: '2024-05-20T17:16:22.000000Z',
          updated_at: '2024-05-20T17:17:55.000000Z',
          deleted_at: null,
          user: {
            username: 'ariel12345',
            email: 'ariel@ariel.com',
            avatar: null
          },
          progress_today: 1
        }
      },
      message: 'Task data'
    }
  },
  DELETE_SUCCESSFUL: {
    method: 'delete',
    response: {
      data: [],
      message: 'Task deleted'
    }
  },
  DELETE_ERROR: {
    method: 'delete',
    status: 500,
    response: {
      data: [],
      message: 'Some error'
    }
  }
}
