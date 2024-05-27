export default {
  EMAIL_AVAILABLE: {
    method: 'get',
    response: {
      data: {
        available: true
      },
      message: 'Email available'
    }
  },
  EMAIL_UNAVAILABLE: {
    method: 'get',
    response: {
      data: {
        available: false
      },
      message: 'Email not available'
    }
  }
}
