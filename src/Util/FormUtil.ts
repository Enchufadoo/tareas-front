import AwesomeDebouncePromise from 'awesome-debounce-promise'

export const existsValidationRule = (triggerFunction: any, message: string) => {
  return AwesomeDebouncePromise(async (value) => {
    let result = await triggerFunction(value)
    if (result.isSuccess) {
      if (result.data['data']['available']) {
        return true
      }
    }
    return message
  }, 900)
}

export const isValidForm = (
  errors: {},
  requiredFields: string[],
  dirtyFields: {},
  checkDirtyFields: boolean = true
) => {
  for (let a in errors) {
    if (errors[a]) {
      return false
    }
  }

  if (checkDirtyFields) {
    for (let a in requiredFields) {
      if (typeof dirtyFields[requiredFields[a]] === 'undefined') {
        return false
      }
    }
  }

  return true
}
