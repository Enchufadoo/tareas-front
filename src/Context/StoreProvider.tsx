import { injectStore } from '@/Services/Axios/AxiosConfig'
import { store } from '@/Store/Store'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

injectStore(store)

export const StoreProvider = (props: PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>
}
