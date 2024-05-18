import { ButtonSize, ButtonTheme } from '@/Components/Base/Button/Button'
import { SimpleLineIcons, Text, View } from '@/Components/Nativewind/React'
import { useSetUpdatePasswordMutation } from '@/Services/User'
import React from 'react'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScrollView, ToastAndroid } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import InputError from '@/Components/Errors/InputError'

import { isValidForm } from '@/Util/FormUtil'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { TextInput } from '@/Components/Base/Input/TextInput'
import { LoggedInDrawerParamList } from '@/Router/LoggedInNavigator'
import { useSx } from 'dripsy'
import Separator from '@/Components/Layout/BaseLayout/Separator'
import SubmitButton from '@/Components/Base/Button/SubmitButton'

const ChangePasswordScreen = () => {
  const sx = useSx()

  const navigation =
    useNavigation<StackNavigationProp<LoggedInDrawerParamList>>()

  const [setUpdatePassword, setUpdatePasswordResult] =
    useSetUpdatePasswordMutation()

  const requiredFields = ['password', 'current_password']

  const {
    getValues,
    control,
    trigger,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      current_password: ''
    }
  })

  let isValid = isValidForm(errors, requiredFields, dirtyFields, false)

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <BaseLayout>
        <View>
          <Text className={'text-lg'}>
            Please enter your new password in the field below. Your password
            should be a minimum of 7 characters.
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
                required: {
                  value: true,
                  message: 'The current password field is required'
                },
                minLength: {
                  value: 7,
                  message: 'The password must be at least 7 characters long'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={'Current Password'}
                  secureTextEntry={true}
                  leftIcon={
                    <SimpleLineIcons
                      name="lock"
                      size={16}
                      color={sx({ color: '$text' })['color']}
                    />
                  }
                  placeholder="Current Password"
                  onBlurForm={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isValid={control.getFieldState('current_password')}
                />
              )}
              name="current_password"
            />
            <InputError error={errors.current_password} />
          </View>

          <View className={'mt-3'}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'The new password field is required'
                },
                minLength: {
                  value: 7,
                  message: 'The password must be at least 7 characters long'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={'New Password'}
                  secureTextEntry={true}
                  leftIcon={
                    <SimpleLineIcons
                      name="lock"
                      size={16}
                      color={sx({ color: '$text' })['color']}
                    />
                  }
                  placeholder="New Password"
                  onBlurForm={onBlur}
                  onChangeText={onChange}
                  value={value}
                  isValid={control.getFieldState('password')}
                />
              )}
              name="password"
            />
            <InputError error={errors.password} />
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
              let res = await setUpdatePassword({
                password: getValues('password'),
                old_password: getValues('current_password')
              })
              if (!('error' in res)) {
                ToastAndroid.show(
                  'Password successfully updated',
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

export default ChangePasswordScreen
