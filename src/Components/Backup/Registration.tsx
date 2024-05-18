import { useDebounceSearch } from '@/Lib/UseDebounceSearch'
import { userApi, useSetUsernameMutation } from '@/Services/User'
import { jc } from '@/Util/NativewindUtil'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { styled, StyledComponent } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, TextInput } from 'react-native'

import { Text, View } from '@/Components/Nativewind/React'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { LoggedInDrawerParamList } from '@/Router/LoggedInNavigator'

const STextInput = styled(TextInput)

type Props = NativeStackScreenProps<
  LoggedInDrawerParamList,
  'Logged In Stack Navigator'
>

const Registration = (props: Props) => {
  const [setRequestUsername, setRequestUsernameResult] =
    useSetUsernameMutation()
  const [validUsername, setValidUsername] = useState(false)
  const [username, setUsername] = useState('')

  const validUsernameLength = username.length > 7 && username.length < 21

  const [usernameAvailableTrigger, usernameAvailableResult] =
    userApi.endpoints.isUsernameAvailable.useLazyQuery()

  const { debounced: debouncedUsername, debouncing: usernameDebouncing } =
    useDebounceSearch(username, 1000, validUsernameLength)

  useEffect(() => {
    if (validUsernameLength) {
      usernameAvailableTrigger(debouncedUsername)
    }
  }, [debouncedUsername])

  const btnClasses = ['btn', 'btn-primary', 'btn-block']
  const textValidUsernameClasses = ['mt-3', 'text-zinc-500']

  const progressIndicatorClasses =
    usernameDebouncing || usernameAvailableResult.isFetching ? [] : ['hidden']

  if (setRequestUsernameResult.isLoading || !validUsername) {
    btnClasses.push('btn-disabled')
  }

  if (validUsernameLength) {
    textValidUsernameClasses.push('hidden')
  }

  useEffect(() => {
    setValidUsername(true)
    if (
      usernameDebouncing ||
      usernameAvailableResult.isFetching ||
      !usernameAvailableResult.isSuccess
    ) {
      setValidUsername(false)
    }
  }, [
    usernameDebouncing,
    usernameAvailableResult.isFetching,
    usernameAvailableResult.isSuccess
  ])

  return (
    <View className="justify-center flex-wrap flex-row flex-1 ">
      <View className=" bg-white flex-1  p-10 items-center">
        <View className="space-y-6 items-center">
          <View className="items-center space-y-3">
            <Text className="text-2xl font-semi-bold pt-12">
              Before we begin hola
            </Text>
            <Text className="text-md max-w-xs text-zinc-500 text-center">
              Pick a username so you can share it with your friends
            </Text>
          </View>

          <View className="w-full flex">
            <View className="flex-row input w-full max-w-xs input-bordered focus-within:input-primary ">
              <STextInput
                placeholder="Username"
                placeholderTextColor="#AAA"
                className="flex-1 outline-none"
                onChangeText={(text) => {
                  setUsername(text)
                }}
              />
              <StyledComponent
                component={ActivityIndicator}
                className={jc(progressIndicatorClasses)}
              />
            </View>

            <Text className={jc(textValidUsernameClasses)}>
              Enter an username between 8 and 20 digits
            </Text>
          </View>

          <Button
            size={ButtonSize.medium}
            theme={ButtonTheme.primary}
            disabled={!validUsername}
            onPress={async () => {
              await setRequestUsername(username)
            }}
            title={'Save'}
          />

          <StyledComponent
            disabled={!validUsername}
            component={Pressable}
            className={jc(btnClasses)}
            onPress={async () => {
              await setRequestUsername(username)
            }}
          >
            <Text className="text-white">Save </Text>
          </StyledComponent>
        </View>
      </View>
    </View>
  )
}

export default Registration
