import { ButtonSize, ButtonTheme } from '@/Components/Base/Button/Button'
import {
  SimpleLineIcons,
  Text,
  TouchableOpacity,
  View
} from '@/Components/Nativewind/React'
import { userApi } from '@/Services/User'
import {
  setLoadingData,
  setTokenFromLogin
} from '@/Store/Features/ApplicationSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import InputError from '@/Components/Errors/InputError'
import FormSubmitError from '@/Components/Errors/FormSubmitError'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NotLoggedInStackParamList } from '@/Router/NotLoggedInStackNavigator'
import { TextInput } from '@/Components/Base/Input/TextInput'
import SubmitButton from '@/Components/Base/Button/SubmitButton'

function EmailLogin() {
  const dispatch = useDispatch()

  const navigation =
    useNavigation<StackNavigationProp<NotLoggedInStackParamList>>()

  const [setLoginEmail, setLoginEmailResult] =
    userApi.useSetLoginEmailMutation()

  const requiredFields = ['email', 'password']

  const {
    getValues,
    trigger,
    control,
    formState: { errors, isDirty, dirtyFields, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (setLoginEmailResult.isSuccess) {
      dispatch(setTokenFromLogin(setLoginEmailResult.data.data.token))
    }
  }, [setLoginEmailResult.isSuccess])

  useEffect(() => {
    dispatch(setLoadingData(setLoginEmailResult.isLoading))
  }, [setLoginEmailResult.isLoading])

  return (
    <View className={'flex-1'}>
      <View>
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'The email field is required'
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={'Email'}
              value={value}
              keyboardType="email-address"
              onChangeText={onChange}
              isValid={control.getFieldState('email')}
              leftIcon={
                <SimpleLineIcons
                  name="user"
                  size={16}
                  sx={{ color: '$lightText' }}
                />
              }
            />
          )}
          name="email"
        />
        <InputError error={errors.email} />
      </View>
      <View className="mt-3">
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: 'The password field is required'
            }
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              secureTextEntry={true}
              leftIcon={
                <SimpleLineIcons
                  className={'text-black dark:text-white'}
                  name="lock"
                  sx={{ color: '$lightText' }}
                  size={16}
                />
              }
              placeholder="Password"
              onChangeText={onChange}
              value={value}
              isValid={control.getFieldState('password')}
            />
          )}
          name="password"
        />
        <InputError error={errors.password} />
      </View>

      <View className={'flex-row justify-end mt-5'}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Reset Password')
          }}
        >
          <Text className={'text-[16px]'} sx={{ color: '$linkColor' }}>
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-7">
        <SubmitButton
          theme={ButtonTheme.primary}
          size={ButtonSize.medium}
          onPress={async () => {
            await setLoginEmail(getValues())
          }}
          trigger={trigger}
          enabledUntilTouched={true}
          disabled={!isValid}
          title={'Log in'}
        />
      </View>

      {setLoginEmailResult.isError && (
        <View className={'mt-6'}>
          <FormSubmitError
            header={'Failed to Login'}
            subheader={'Invalid email or password'}
          />
        </View>
      )}
    </View>
  )
}

export default EmailLogin
