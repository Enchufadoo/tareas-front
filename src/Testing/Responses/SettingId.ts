export default {
  SUCCESSFUL: {
    method: 'put',
    response: {
      data: [],
      message: 'Setting updated successfully'
    }
  },
  FAILURE: {
    method: 'put',
    status: 422,
    response: {
      message: 'Value not available for this setting',
      errors: { value: ['Value not available for this setting'] }
    }
  }
}
