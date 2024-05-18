import React, { useEffect } from 'react'
import { SimpleLineIcons, Text, View } from '@/Components/Nativewind/React'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NotLoggedInStackParamList } from '@/Router/NotLoggedInStackNavigator'
import BaseHeader from '@/Components/Layout/BaseLayout/BaseHeader'
import { ScrollView } from 'react-native'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { Controller, useForm } from 'react-hook-form'
import InputError from '@/Components/Errors/InputError'
import { isValidForm } from '@/Util/FormUtil'
import { useSetNewPasswordForResetMutation } from '@/Services/User'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from '@/Components/Base/Input/TextInput'
import { StackNavigationProp } from '@react-navigation/stack'

type Props = NativeStackScreenProps<
  NotLoggedInStackParamList,
  'Set New Password From Reset'
>

const SetNewPasswordFromResetScreen = (props: Props) => {
  const {
    getValues,
    control,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const navigation =
    useNavigation<StackNavigationProp<NotLoggedInStackParamList>>()

  let requiredFields = ['password']

  const [setNewPasswordForReset, setNewPasswordForResetResult] =
    useSetNewPasswordForResetMutation()

  useEffect(() => {
    if (setNewPasswordForResetResult.isSuccess) {
      navigation.navigate('Password Reset Success')
    }
  }, [setNewPasswordForResetResult.isSuccess])

  let isValid = isValidForm(errors, requiredFields, dirtyFields)

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <BaseLayout>
        <View className="flex-1">
          <View className={'mt-5'}>
            <BaseHeader title={'Set Your New Password'} subtitle={''} />
          </View>
          <View className={'flex-1 justify-between '}>
            <View>
              <Text className={'text-center text-lg'}>
                Please enter a new password to secure your account.
              </Text>
              <Text className={'text-center text-lg'}>
                Remember to choose a strong password that you haven't used
                elsewhere.
              </Text>

              <View className="mt-10">
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'The password field is required'
                    },
                    minLength: {
                      value: 7,
                      message: 'The password must be at least 7 characters long'
                    }
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      secureTextEntry={true}
                      leftIcon={
                        <SimpleLineIcons
                          sx={{ color: '$text' }}
                          name="lock"
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
            </View>

            <View>
              <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.medium}
                title={'Save Password'}
                disabled={!isValid}
                loading={setNewPasswordForResetResult.isLoading}
                onPress={() => {
                  setNewPasswordForReset({
                    renewal_token: props.route.params.renewalToken,
                    password: getValues('password'),
                    code: props.route.params.code
                  })
                }}
              />
            </View>
          </View>
        </View>
      </BaseLayout>
    </ScrollView>
  )
}

export default SetNewPasswordFromResetScreen
