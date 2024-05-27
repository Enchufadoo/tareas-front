export default {
  NO_TASKS: {
    method: 'get',
    response: {
      data: {}
    }
  },
  '4_TASKS': {
    method: 'get',
    response: {
      data: {
        progress: {
          '2': [false, true, false, false, false, false, false],
          '3': [false, false, true, true, false, false, false],
          '1': [false, false, true, false, false, false, false],
          '4': [false, false, false, false, false, false, false]
        },
        tasks: [
          {
            id: 1,
            title: 'test 123',
            description: null,
            user_id: 1,
            finished: 0,
            end_date: null,
            created_at: '2024-05-18T19:25:08.000000Z',
            updated_at: '2024-05-18T19:25:08.000000Z',
            deleted_at: null
          },
          {
            id: 2,
            title: 'hola mundo',
            description: null,
            user_id: 1,
            finished: 0,
            end_date: null,
            created_at: '2024-05-19T04:26:20.000000Z',
            updated_at: '2024-05-19T04:26:20.000000Z',
            deleted_at: null
          },
          {
            id: 3,
            title: 'to be finished',
            description: null,
            user_id: 1,
            finished: 1,
            end_date: null,
            created_at: '2024-05-20T17:16:22.000000Z',
            updated_at: '2024-05-20T17:17:55.000000Z',
            deleted_at: null
          },
          {
            id: 4,
            title: 'colorado weekend weekend',
            description: null,
            user_id: 1,
            finished: 0,
            end_date: null,
            created_at: '2024-05-21T04:44:05.000000Z',
            updated_at: '2024-05-21T04:44:05.000000Z',
            deleted_at: null
          }
        ]
      },
      message: 'Progress this week'
    }
  },
  '1_TASK_NO_PROGRESS': {
    method: 'get',
    response: {
      data: {
        progress: {
          '2': [false, false, false, false, false, false, false]
        },
        tasks: [
          {
            id: 2,
            title: 'hola mundo',
            description: null,
            user_id: 1,
            finished: 0,
            end_date: null,
            created_at: '2024-05-19T04:26:20.000000Z',
            updated_at: '2024-05-19T04:26:20.000000Z',
            deleted_at: null
          }
        ]
      },
      message: 'Progress this week'
    }
  }
}
