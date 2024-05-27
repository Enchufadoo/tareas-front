export default {
  USERNAME_AVAILABLE: {
    method: 'get',
    response: {
      data: {
        available: true
      },
      message: 'Username available'
    }
  },
  USERNAME_UNAVAILABLE: {
    method: 'get',
    response: {
      data: {
        available: false
      },
      message: 'Username not available'
    }
  }
}
