import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { View } from '@/Components/Nativewind/React'
import React from 'react'
import { ScrollView } from 'react-native'
import EmailLogin from './EmailLogin'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import BaseHeader from '@/Components/Layout/BaseLayout/BaseHeader'
import Separator from '@/Components/Layout/BaseLayout/Separator'
import { useSelector } from 'react-redux'
import { selectThemeName } from '@/Store/Features/ApplicationSlice'
import { NotLoggedInStackParamList } from '@/Router/NotLoggedInStackNavigator'

const LoginScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<NotLoggedInStackParamList>>()
  const themeName = useSelector(selectThemeName)

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <BaseLayout>
        <View className="flex-1">
          <BaseHeader
            title={'Welcome Back'}
            subtitle={
              'Enter your account details or create a free account to get started.'
            }
          />

          <View className="mt-12 flex-1">
            <EmailLogin></EmailLogin>
          </View>

          <Separator
            style={{
              marginBottom: 30,
              marginTop: 40
            }}
          />
        </View>

        <View>
          <Button
            theme={ButtonTheme.secondary}
            size={ButtonSize.medium}
            outline={true}
            onPress={() => {
              navigation.navigate('Create Account Screen')
            }}
            title={'Create an account'}
          />
        </View>
      </BaseLayout>
    </ScrollView>
  )
}

export default LoginScreen
