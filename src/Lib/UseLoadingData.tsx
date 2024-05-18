import { useEffect } from 'react'
import { setLoadingData } from '@/Store/Features/ApplicationSlice'
import { useDispatch } from 'react-redux'
import { UseQueryHookResult } from '@reduxjs/toolkit/src/query/react/buildHooks'

/**
 * Sets the loading state based on the isLoading property of the given query hook results.
 */
export const useLoadingData = (results: UseQueryHookResult<any, any>[]) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const anyLoading = results.some((result) => result.isLoading)
    dispatch(setLoadingData(anyLoading))
  }, [results])
}
