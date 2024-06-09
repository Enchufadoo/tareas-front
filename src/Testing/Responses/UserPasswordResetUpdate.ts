export default {
  SUCCESSFUL: {
    method: 'post',
    response: {
      data: [],
      message: 'Password saved succesfully'
    }
  },
  INVALID: {
    method: 'post',
    status: 500,
    response: {
      data: [],
      message: 'Invalid request'
    }
  }
}
