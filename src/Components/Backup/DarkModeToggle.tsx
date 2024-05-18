import React from 'react'
import { styled, useColorScheme } from 'nativewind'

import { Text, TouchableOpacity, View } from '@/Components/Nativewind/React'
import Animated from 'react-native-reanimated'
import { LayoutAnimation } from 'react-native'

/**
 * Probably won't be using it
 * @deprecated
 */
function DarkModeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const AnimatedView = styled(Animated.View)
  const isDark = colorScheme === 'dark'

  const justify = isDark ? 'flex-end' : 'flex-start'

  return (
    <TouchableOpacity
      onPress={() => {
        LayoutAnimation.easeInEaseOut()
        toggleColorScheme()
      }}
    >
      <View className="w-10 mr-2 align-middle">
        <View
          className=" h-6 rounded-full bg-gray-300  flex-row justify-start"
          style={{ elevation: 3, justifyContent: justify }}
        >
          <AnimatedView className="w-6 h-6 rounded-full bg-white dark:bg-blue-300 flex-col justify-center">
            <Text className={'self-center'}>{isDark ? '🌙' : '🌞'}</Text>
          </AnimatedView>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DarkModeToggle
