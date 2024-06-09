export default {
  CURRENT_PASSWORD_INCORRECT: {
    method: 'patch',
    response: {
      message: 'The current password is incorrect.',
      errors: {
        old_password: ['The old password is incorrect.']
      }
    },
    status: 422
  },
  SUCCESSFUL: {
    method: 'patch',
    response: {
      data: [],
      message: 'Password successfully changed'
    }
  }
}
