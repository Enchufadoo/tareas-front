import React from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { Text, TouchableOpacity, View } from 'react-native'
import { reloadAsync } from 'expo-updates'

const ApplicationErrorBoundary = (
  props: React.ComponentProps<typeof View>
) => {
  return (
    <ErrorBoundary
      onError={(error, info) => {
        console.log(error, info)
      }}
      fallback={
        <View
          className={
            'bg-black h-full w-full flex-1 justify-center items-center text-white'
          }
        >
          <View className={'mx-4 items-center max-w-xs'}>
            <View>
              <Text
                style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}
              >
                Unexpected Error Encountered
              </Text>
            </View>
            <View>
              <View className={'mt-6'}>
                <Text
                  style={{ color: 'white', fontSize: 16, textAlign: 'center' }}
                >
                  We're sorry, but an unexpected error occurred while processing
                  your request.
                </Text>
              </View>
              <View className={'mt-2'}>
                <Text
                  style={{ color: 'white', fontSize: 16, textAlign: 'center' }}
                >
                  Our team has been notified and will look into the issue as
                  soon as possible. Please try again later. We apologize for any
                  inconvenience caused.
                </Text>
              </View>
            </View>
          </View>

          <View className={'mt-6'}>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                height: 40,
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 3
              }}
              onPress={() => {
                reloadAsync()
              }}
            >
              <View>
                <Text style={{ color: 'black' }}>Reload Application</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      }
    >
      {props.children}
    </ErrorBoundary>
  )
}

export default ApplicationErrorBoundary
