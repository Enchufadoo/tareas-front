import React from 'react'
import HeaderWithDescription from '@/Components/Layout/BaseLayout/HeaderWithDescription'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { View } from '@/Components/Nativewind/React'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { NotLoggedInStackParamList } from '@/Router/NotLoggedInStackNavigator'

function PasswordResetSuccessScreen() {
  const title = 'Password Successfully Saved'
  const navigation =
    useNavigation<StackNavigationProp<NotLoggedInStackParamList>>()

  const description =
    'Your password has been updated successfully. You can now proceed to the login ' +
    'page and access your account with your new password.'

  return (
    <BaseLayout>
      <View className={'flex-1 justify-between'}>
        <HeaderWithDescription title={title} description={description} />
        <Button
          title={'Continue to Login'}
          size={ButtonSize.medium}
          theme={ButtonTheme.primary}
          onPress={() => {
            navigation.navigate('Login Screen')
          }}
        />
      </View>
    </BaseLayout>
  )
}

export default PasswordResetSuccessScreen
