import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

function Ball() {
  const isPressed = useSharedValue(false)
  const offset = useSharedValue({ x: 0, y: 0 })
  const [texto, setTexto] = useState('')

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) }
      ],
      backgroundColor: isPressed.value ? 'yellow' : 'blue'
    }
  })

  const gesture = Gesture.Pan()
    .onBegin(() => {
      'worklet'
      isPressed.value = true
      runOnJS(setTexto)('presionado')
    })
    .onChange((e) => {
      'worklet'
      isPressed.value = true
      offset.value = {
        x: e.changeX + offset.value.x,
        y: e.changeY + offset.value.y
      }
    })
    .onFinalize(() => {
      'worklet'
      isPressed.value = false
      runOnJS(setTexto)('soltadoo')
    })

  const derived = useDerivedValue(() => {
    return isPressed.value
  }, [])

  return (
    <>
      <Text>{texto}</Text>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.ball, animatedStyles]}></Animated.View>
      </GestureDetector>
    </>
  )
}

export default function Prueba() {
  return (
    <View style={styles.container}>
      <Ball />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center'
  }
})
