export default {
  SUCCESSFUL: {
    method: 'patch',
    response: {
      data: [],
      message: 'User successfully updated'
    }
  },
  INVALID_NAME: {
    status: 422,
    method: 'patch',
    response: {
      message: 'The name must be at least 8 characters.',
      errors: {
        name: ['The name must be at least 8 characters.']
      }
    }
  }
}
