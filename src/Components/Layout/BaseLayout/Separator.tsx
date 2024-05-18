import React from 'react'
import { View } from '@/Components/Nativewind/React'
import { StyleSheet } from 'react-native'

const Separator = (props: React.ComponentPropsWithoutRef<typeof View>) => {
  return (
    <View className="w-full" style={props.style}>
      <View
        className="h-3 w-full "
        style={{
          borderBottomColor: '#AAA',
          borderBottomWidth: StyleSheet.hairlineWidth
        }}
      ></View>
    </View>
  )
}

export default Separator
