import { ButtonSize, ButtonTheme } from '@/Components/Base/Button/Button'
import { SimpleLineIcons, Text, View } from '@/Components/Nativewind/React'
import {
  useLazyIsUsernameAvailableQuery,
  useSetUpdateProfileMutation
} from '@/Services/User'
import { selectUserData } from '@/Store/Features/ApplicationSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScrollView, ToastAndroid } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import InputError from '@/Components/Errors/InputError'

import { existsValidationRule, isValidForm } from '@/Util/FormUtil'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { TextInput } from '@/Components/Base/Input/TextInput'
import { LoggedInDrawerParamList } from '@/Router/LoggedInNavigator'
import { useSx } from 'dripsy'
import Separator from '@/Components/Layout/BaseLayout/Separator'
import SubmitButton from '@/Components/Base/Button/SubmitButton'

const EditProfileScreen = () => {
  const sx = useSx()
  const userData = useSelector(selectUserData)

  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<LoggedInDrawerParamList>>()

  const [usernameAvailableTrigger, usernameAvailableResult] =
    useLazyIsUsernameAvailableQuery()

  const [setUpdateProfile, setUpdateProfileResult] =
    useSetUpdateProfileMutation()

  const requiredFields = ['email', 'username']

  const {
    getValues,
    control,
    trigger,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: userData.name,
      username: userData.username
    }
  })

  let isValid = isValidForm(errors, requiredFields, dirtyFields, false)

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <BaseLayout>
        <View>
          <Text className={'text-lg'}>
            Update your personal and account details here to keep your profile
            up-to-date.
          </Text>
          <Separator
            style={{
              marginBottom: 20,
              marginTop: 20
            }}
          />
          <View>
            <Controller
              control={control}
              rules={{
                minLength: {
                  value: 8,
                  message: 'The username must be at least 8 characters long'
                },
                maxLength: {
                  value: 20,
                  message:
                    "The username shouldn't be longer than 20 characters long"
                },
                required: {
                  value: true,
                  message: 'The username field is required'
                },
                validate: {
                  validateUser: (value, formValues) => {
                    if (value === userData.username) {
                      return true
                    }
                    let vr = existsValidationRule(
                      usernameAvailableTrigger,
                      'Username not available'
                    )
                    return vr(value)
                  }
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlurForm={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isValid={control.getFieldState('username')}
                  placeholder={'Username'}
                  label={'Username'}
                  leftIcon={
                    <SimpleLineIcons
                      name="user"
                      size={16}
                      color={sx({ color: '$text' })['color']}
                    />
                  }
                  keyboardType="ascii-capable"
                  inProgress={usernameAvailableResult.isFetching}
                />
              )}
              name="username"
            />
            <InputError error={errors.username} />
          </View>
          <View className="mt-3">
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'The name field is required'
                },
                minLength: {
                  value: 3,
                  message: 'The name must be at least 3 characters long'
                },
                maxLength: {
                  value: 50,
                  message:
                    'The name should not be longer than 50 characters long'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={'Name'}
                  placeholder={'Name'}
                  onBlurForm={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="default"
                  isValid={control.getFieldState('name')}
                  leftIcon={
                    <SimpleLineIcons
                      name="doc"
                      size={16}
                      color={sx({ color: '$text' })['color']}
                    />
                  }
                />
              )}
              name="name"
            />

            <InputError error={errors.name} />
          </View>
        </View>

        <View className={'mt-12 mb-12'}>
          <SubmitButton
            theme={ButtonTheme.primary}
            size={ButtonSize.medium}
            title={'Save Changes'}
            enabledUntilTouched={true}
            disabled={!isValid}
            trigger={trigger}
            onPress={async () => {
              let res = await setUpdateProfile(getValues())
              if (!('error' in res)) {
                ToastAndroid.show(
                  'Profile information successfully updated',
                  ToastAndroid.LONG
                )
                navigation.goBack()
              }
            }}
          />
        </View>
      </BaseLayout>
    </ScrollView>
  )
}

export default EditProfileScreen
