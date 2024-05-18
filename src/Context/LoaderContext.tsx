import { createContext } from 'react'

export interface LoaderContextValue {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

const value: LoaderContextValue = null

export const LoaderContext = createContext(value)
