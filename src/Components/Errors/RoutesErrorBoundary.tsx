import React from 'react'

import { ErrorBoundary } from 'react-error-boundary'

import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { View } from '@/Components/Nativewind/React'
import HeaderWithDescription from '@/Components/Layout/BaseLayout/HeaderWithDescription'

const RoutesErrorBoundary = (props: React.ComponentProps<typeof View>) => {
  return (
    <ErrorBoundary
      onError={(error, info) => {}}
      fallback={
        <BaseLayout>
          <HeaderWithDescription
            title={'Application Error Encountered'}
            description={
              'An error has occurred in the application. ' +
              'This issue will be notified.'
            }
          />
        </BaseLayout>
      }
    >
      {props.children}
    </ErrorBoundary>
  )
}

export const withErrorBoundary = <T extends React.PropsWithChildren>(
  WrappedComponent: React.ComponentType<any>
) => {
  const ComponentWithErrorBoundary = (props: T) => {
    return <WrappedComponent {...(props as T)} />
  }

  return ComponentWithErrorBoundary
}

export default RoutesErrorBoundary
