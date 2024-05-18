import { useEffect, useState } from 'react'

/**
 * Hook that makes debouncing a hook (awful) but it's useful to work with
 * functional components, probably stole it from somewhere
 */
export function useDebounceSearch<T>(
  value: T,
  delay: number,
  canSearch: boolean
) {
  const [debounced, setDebounced] = useState<T>(value)
  const [debouncing, setDebouncing] = useState(false)

  useEffect(() => {
    let handler = null

    if (canSearch) {
      setDebouncing(true)
      handler = setTimeout(() => {
        setDebounced(value)
        setDebouncing(false)
      }, delay)
    }

    return () => {
      if (handler) {
        setDebouncing(false)
        clearTimeout(handler)
      }
    }
  }, [value, delay])

  return { debounced, debouncing }
}
