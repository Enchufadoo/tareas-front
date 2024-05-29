import React from 'react'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { SimpleLineIcons, Text, View } from '@/Components/Nativewind/React'
import BaseHeader from '@/Components/Layout/BaseLayout/BaseHeader'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { ScrollView } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { isValidForm } from '@/Util/FormUtil'
import InputError from '@/Components/Errors/InputError'
import { useSetPasswordResetMutation } from '@/Services/User'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NotLoggedInStackParamList } from '@/Router/NotLoggedInStackNavigator'
import { TextInput } from '@/Components/Base/Input/TextInput'

const PasswordResetScreen = () => {
  const [setPasswordResetTrigger, setPasswordResetResult] =
    useSetPasswordResetMutation()
  const navigation =
    useNavigation<StackNavigationProp<NotLoggedInStackParamList>>()
  const requiredFields = ['email']

  const {
    getValues,
    control,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  })

  let isValid = isValidForm(errors, requiredFields, dirtyFields)

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <BaseLayout>
        <View className="flex-1 justify-between">
          <View className={'mt-5'}>
            <BaseHeader title={'Password Reset'} subtitle={''} />
            <Text className={'text-lg text-center'}>
              Please enter your{' '}
              <Text className={'font-bold'}>registered email address</Text> in
              the field below. We will send you an email with a code to reset
              your password.
            </Text>

            <View className={'mt-10'}>
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
                        sx={{ color: '$text' }}
                        name="user"
                        size={16}
                      />
                    }
                  />
                )}
                name="email"
              />
              <InputError error={errors.email} />
            </View>
            <Text className={'text-lg text-center mt-10'}>
              Make sure to check your spam/junk folders if you don't see our
              email in your inbox.
            </Text>
          </View>
          <View className={'mt-10'}>
            <Button
              theme={ButtonTheme.primary}
              size={ButtonSize.medium}
              title={'Send Recovery Code'}
              disabled={!isDirty || !isValid}
              loading={
                setPasswordResetResult.isLoading ||
                setPasswordResetResult.isSuccess
              }
              onPress={async () => {
                await setPasswordResetTrigger(getValues())

                navigation.navigate('Reset Code Entry', {
                  email: getValues('email')
                })
              }}
            />
          </View>
        </View>
      </BaseLayout>
    </ScrollView>
  )
}

export default PasswordResetScreen
