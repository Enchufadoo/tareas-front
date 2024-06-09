export default {
  '1_UNFINISHED': {
    method: 'get',
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
    method: 'get',
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
    method: 'get',
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
  },
  SUCCESSFULLY_SAVED: {
    method: 'post',
    response: {
      data: {
        task: {
          title: 'hola mundo',
          description: null,
          end_date: null,
          user_id: 1,
          updated_at: '2024-06-04T02:13:43.000000Z',
          created_at: '2024-06-04T02:13:43.000000Z',
          id: 6
        }
      },
      message: 'created'
    }
  },
  GET_TASK_SUCCESSFULLY: {
    method: 'get',
    response: {
      data: {
        task: {
          id: 3,
          title: 'to be finished',
          description: null,
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
  }
}
