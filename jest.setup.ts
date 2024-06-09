import '@testing-library/react-native/extend-expect'
import {
  mockedDispatch,
  mockedGoBack,
  mockedNavigate
} from '@/Testing/TestUtil'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => {
      return {
        navigate: mockedNavigate,
        goBack: mockedGoBack,
        dispatch: mockedDispatch
      }
    }
  }
})
