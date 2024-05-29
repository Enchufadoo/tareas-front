export default {
  SUCCESSFUL_LOGIN: {
    method: 'post',
    response: {
      data: {
        data: {
          token: '11|aftod6UPi6uQDMwgxYe5jIhTufwRAkwGWIiEVoYUc9dd4850'
        },
        message: 'Login successful with EMAIL'
      }
    }
  },
  FAILED_LOGIN: {
    method: 'post',
    response: {
      data: {
        data: ['Invalid username or password'],
        message: 'Invalid username or password'
      }
    },
    status: 401
  }
}
