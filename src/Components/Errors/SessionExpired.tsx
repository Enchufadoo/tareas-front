import React, { useEffect } from 'react'

import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { View } from '@/Components/Nativewind/React'
import HeaderWithDescription from '@/Components/Layout/BaseLayout/HeaderWithDescription'
import { useDispatch } from 'react-redux'
import { logout } from '@/Store/Features/ApplicationSlice'

const SessionExpired = (props: React.ComponentProps<typeof View>) => {
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(logout())
    }, 7000)
  }, [])

  return (
    <BaseLayout>
      <HeaderWithDescription
        title={'Session Expired'}
        description={
          'Your session has expired due to inactivity.' +
          ' For your security, we have logged you out. ' +
          'You will be redirected to the login screen in a few seconds ' +
          'to start a new session. Please log in again to continue.'
        }
      />
    </BaseLayout>
  )
}

export default SessionExpired
