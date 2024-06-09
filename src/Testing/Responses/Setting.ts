export default {
  SUCCESSFUL_LISTING: {
    method: 'get',
    response: {
      data: {
        settings: {
          theme: {
            id: 1,
            value: 'light',
            default: 'system',
            default_id: 3,
            options: [
              {
                id: 1,
                value: 'light',
                setting_id: 1,
                created_at: '2024-06-02T12:46:53.000000Z',
                updated_at: '2024-06-02T12:46:53.000000Z'
              },
              {
                id: 2,
                value: 'dark',
                setting_id: 1,
                created_at: '2024-06-02T12:46:53.000000Z',
                updated_at: '2024-06-02T12:46:53.000000Z'
              },
              {
                id: 3,
                value: 'system',
                setting_id: 1,
                created_at: '2024-06-02T12:46:53.000000Z',
                updated_at: '2024-06-02T12:46:53.000000Z'
              }
            ]
          }
        }
      },
      message: 'List of settings'
    }
  }
}
