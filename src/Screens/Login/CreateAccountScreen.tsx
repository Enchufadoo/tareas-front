import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { SimpleLineIcons, View } from '@/Components/Nativewind/React'
import { userApi } from '@/Services/User'
import { setTokenFromLogin } from '@/Store/Features/ApplicationSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScrollView } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import InputError from '@/Components/Errors/InputError'

import { isValidForm } from '@/Util/FormUtil'

import FormSubmitError from '@/Components/Errors/FormSubmitError'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import BaseHeader from '@/Components/Layout/BaseLayout/BaseHeader'
import { TextInput } from '@/Components/Base/Input/TextInput'
import { LoggedInDrawerParamList } from '@/Router/LoggedInNavigator'
import { useSx } from 'dripsy'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

const CreateAcount = () => {
  const sx = useSx()
  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<LoggedInDrawerParamList>>()

  const [usernameAvailableTrigger, usernameAvailableResult] =
    userApi.endpoints.isUsernameAvailable.useLazyQuery()

  const [emailAvailableTrigger, emailAvailableResult] =
    userApi.endpoints.isEmailAvailable.useLazyQuery()

  const [setRegistrationEmail, setRegistrationEmailResult] =
    userApi.useSetRegistrationEmailMutation()

  useEffect(() => {
    if (setRegistrationEmailResult.isSuccess) {
      dispatch(setTokenFromLogin(setRegistrationEmailResult.data.data.token))
    }
  }, [setRegistrationEmailResult.isSuccess])

  const requiredFields = ['email', 'username', 'password']

  const {
    getValues,
    control,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: ''
    }
  })

  let isValid = isValidForm(errors, requiredFields, dirtyFields)

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <BaseLayout>
        <View className="flex-1">
          <BaseHeader
            title={'New Account'}
            subtitle={'Create an account with your email'}
          />

          <View className={'flex-1 mt-12'}>
            <View className={'flex-1'}>
              <View>
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
                        'The name must be no longer than 50 characters long'
                    }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
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
              <View className={'mt-4'}>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'The email field is required'
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address'
                    },
                    validate: {
                      emailAvailable: AwesomeDebouncePromise(
                        async (fieldValue: string) => {
                          const res =
                            await emailAvailableTrigger(fieldValue).unwrap()

                          return res.data.available
                            ? true
                            : 'Email not available'
                        },
                        900
                      )
                    }
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder={'Email'}
                      onBlurForm={onBlur}
                      onChangeText={onChange}
                      value={value}
                      isValid={control.getFieldState('email')}
                      leftIcon={
                        <SimpleLineIcons
                          name="envelope"
                          size={16}
                          color={sx({ color: '$text' })['color']}
                        />
                      }
                      keyboardType="email-address"
                      inProgress={emailAvailableResult.isFetching}
                    />
                  )}
                  name="email"
                />

                <InputError error={errors.email} />
              </View>
              <View className="mt-4">
                <View>
                  <Controller
                    control={control}
                    rules={{
                      minLength: {
                        value: 7,
                        message:
                          'The username must be at least 8 characters long'
                      },
                      maxLength: {
                        value: 20,
                        message:
                          'The username must be no longer than 20 characters long'
                      },
                      required: {
                        value: true,
                        message: 'The username field is required'
                      },
                      validate: {
                        usernameAvailable: AwesomeDebouncePromise(
                          async (fieldValue: string) => {
                            const res =
                              await usernameAvailableTrigger(
                                fieldValue
                              ).unwrap()

                            return res.data.available
                              ? true
                              : 'Username not available'
                          },
                          900
                        )
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onBlurForm={onBlur}
                        onChangeText={onChange}
                        value={value}
                        isValid={control.getFieldState('username')}
                        placeholder={'Username'}
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
                <View className="mt-4">
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'The password field is required'
                      },
                      minLength: {
                        value: 7,
                        message:
                          'The password must be at least 7 characters long'
                      },
                      maxLength: {
                        value: 20,
                        message:
                          'The password must be no longer than 20 characters long'
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        secureTextEntry={true}
                        leftIcon={
                          <SimpleLineIcons
                            name="lock"
                            size={16}
                            color={sx({ color: '$text' })['color']}
                          />
                        }
                        placeholder="Password"
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
              {setRegistrationEmailResult.isError && (
                <View className={'mt-6'}>
                  <FormSubmitError
                    header={'Registration failed'}
                    subheader={'Please try again later'}
                  />
                </View>
              )}
            </View>

            <View className={'mt-12 mb-12'}>
              <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.medium}
                title={'Create Account'}
                disabled={!isDirty || !isValid}
                outline={false}
                loading={
                  setRegistrationEmailResult.isLoading ||
                  setRegistrationEmailResult.isSuccess
                }
                onPress={async () => {
                  await setRegistrationEmail(getValues())
                }}
              />
            </View>
          </View>
        </View>
      </BaseLayout>
    </ScrollView>
  )
}

export default CreateAcount
