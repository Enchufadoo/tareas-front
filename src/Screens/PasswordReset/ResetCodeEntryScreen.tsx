import * as React from 'react'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import BaseHeader from '@/Components/Layout/BaseLayout/BaseHeader'
import { Text, TextInput, View } from '@/Components/Nativewind/React'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { NotLoggedInStackParamList } from '@/Router/NotLoggedInStackNavigator'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { useSetPasswordEnterResetCodeMutation } from '@/Services/User'
import FormSubmitError from '@/Components/Errors/FormSubmitError'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useSx } from 'dripsy'
import { getErrorMessage } from '@/Util/ApiUtil'

type Props = NativeStackScreenProps<
  NotLoggedInStackParamList,
  'Reset Code Entry'
>

const ResetCodeEntryScreen = (props: Props) => {
  const navigation =
    useNavigation<StackNavigationProp<NotLoggedInStackParamList>>()
  const sx = useSx()
  const [code, setCode] = useState('')
  const [setPasswordEnterResetCode, setPasswordEnterResetCodeResult] =
    useSetPasswordEnterResetCodeMutation()
  const email = props.route.params.email

  const validCode = code.length === 4

  useEffect(() => {}, [setPasswordEnterResetCodeResult.error])

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <BaseLayout>
        <View className="flex-1">
          <View className={'mt-5'}>
            <BaseHeader title={'Reset Code Entry'} subtitle={''} />
          </View>
          <View className={'flex-1 justify-between '}>
            <View>
              <Text className={'text-lg text-center'}>
                Enter the recovery code sent to your email address:{' '}
                <Text className={'font-bold'}>{email}</Text>
              </Text>
              <View className={' flex-row justify-center mt-10'}>
                <TextInput
                  onChangeText={setCode}
                  value={code}
                  keyboardType={'number-pad'}
                  className={'border-b-2 max-w-[250px] w-full text-lg'}
                  maxLength={4}
                  selectionColor={sx({ color: '$lightText' })['color']}
                  style={{ fontSize: 40, lineHeight: 40, letterSpacing: 40 }}
                  sx={{
                    color: '$text',
                    borderColor: '$text'
                  }}
                />
              </View>
              {setPasswordEnterResetCodeResult.isError && (
                <View className={'mt-10'}>
                  <FormSubmitError
                    header={'Password Reset Failed'}
                    subheader={getErrorMessage(
                      setPasswordEnterResetCodeResult,
                      "We're sorry, but an unexpected error has occurred. "
                    )}
                  />
                </View>
              )}
            </View>
            <View>
              <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.medium}
                title={'Submit Code'}
                disabled={!validCode}
                loading={
                  setPasswordEnterResetCodeResult.isLoading ||
                  setPasswordEnterResetCodeResult.isSuccess
                }
                onPress={async () => {
                  let result = await setPasswordEnterResetCode({
                    email: email,
                    code: code
                  })

                  if ('data' in result) {
                    let renewalToken = navigation.navigate(
                      'Set New Password From Reset',
                      {
                        email: email,
                        renewalToken: result.data.data.renewal_token,
                        code: code
                      }
                    )
                  }
                }}
              />
            </View>
          </View>
        </View>
      </BaseLayout>
    </ScrollView>
  )
}

export default ResetCodeEntryScreen
