import React, { useEffect } from 'react'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { AntDesign } from '@expo/vector-icons'
import * as Google from 'expo-auth-session/providers/google'
import { useSetLoginMutation } from '@/Services/User'

const GoogleLoginButton: React.FC<{}> = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    // redirectUri: makeRedirectUri({
    //   scheme: 'my-scheme',
    //   path: '/auth/callback'
    // }),
    // webClientId:
    //   '-',
    webClientId: '-',
    // expoClientId:
    //   '-'
    expoClientId: '-',
    androidClientId: '-'
  })

  const [setLogin, setLoginResult] = useSetLoginMutation()

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response
      setLogin(authentication.accessToken)
    }
  }, [response])

  return (
    <>
      <Button
        theme={ButtonTheme.secondary}
        size={ButtonSize.medium}
        onPress={() => {
          promptAsync()
        }}
        disabled={false}
        title={'Log in with Google'}
        icon={
          <AntDesign
            name="google"
            style={{ marginRight: 10 }}
            size={22}
            color="white"
          ></AntDesign>
        }
      />
    </>
  )
}

export default GoogleLoginButton
