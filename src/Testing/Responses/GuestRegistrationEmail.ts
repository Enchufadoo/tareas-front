export default {
  SUCCESSFUL_REGISTRATION: {
    method: 'post',
    response: {
      data: {
        token: '8|cnxa4cvh4L886CEnHy1q4f6LQB6bmaNYTWLgn3GB5f1c6e3a'
      },
      message: 'Login successful with EMAIL'
    }
  },
  RANDOM_ERROR: {
    method: 'post',
    status: 500,
    response: {}
  },
  FAILED_VALIDATION: {
    method: 'post',
    status: 422,
    response: {
      message: 'The username has already been taken. (and 1 more error)',
      errors: {
        username: ['The username has already been taken.'],
        email: ['The email has already been taken.']
      }
    }
  }
}
