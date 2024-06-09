export default {
  SUCCESSFUL: {
    method: 'post',
    response: {
      data: {
        renewal_token: 'f998a4e5a2eddb57c9d4db488635ca'
      },
      message: 'Correct recovery code'
    }
  },
  ALREADY_REDEEMED: {
    method: 'post',
    status: 410,
    response: {
      data: [],
      message: 'Code already entered',
      errors: {
        code: 'The recovery code has already been entered'
      }
    }
  },
  SERVER_ERROR: {
    method: 'post',
    status: 500,
    response: {}
  }
}
