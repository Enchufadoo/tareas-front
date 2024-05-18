import { styled as nativewindStyled } from 'nativewind'
import * as ReactNative from 'react-native'
import * as VectorIcons from '@expo/vector-icons'
import { styled } from 'dripsy'

export const Text = styled(nativewindStyled(ReactNative.Text))({
  color: '$text'
})

export const View = styled(nativewindStyled(ReactNative.View))()

export const Pressable = styled(nativewindStyled(ReactNative.Pressable))()
export const TextInput = styled(nativewindStyled(ReactNative.TextInput))()
export const TouchableOpacity = styled(
  nativewindStyled(ReactNative.TouchableOpacity)
)()
export const Switch = styled(nativewindStyled(ReactNative.Switch))()
export const SimpleLineIcons = styled(
  nativewindStyled(VectorIcons.SimpleLineIcons)
)()
export const MaterialIcons = styled(
  nativewindStyled(VectorIcons.MaterialIcons)
)()

export const Entypo = styled(nativewindStyled(VectorIcons.Entypo))()

export const Octicons = styled(nativewindStyled(VectorIcons.Octicons))()
