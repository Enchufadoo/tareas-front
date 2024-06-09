import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { UseQueryHookResult } from '@reduxjs/toolkit/src/query/react/buildHooks'

/**
 * Stolen from
 * https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
 */

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export function getErrorMessage(
  result: UseQueryHookResult<any, any>,
  defaultErrorMessage: string
): string {
  if (isErrorWithMessage(result.error)) {
    return result.error.data.message
  }

  return defaultErrorMessage
}
