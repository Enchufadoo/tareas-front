export const prueba = (mockedNavigate: jest.Mock<any, any, any>) => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => {
      return {
        navigate: mockedNavigate
      }
    }
  }d
}
