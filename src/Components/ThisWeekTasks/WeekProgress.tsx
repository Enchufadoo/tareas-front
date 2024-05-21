import React from 'react'

import { Text, View } from '@/Components/Nativewind/React'
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'

const WeekProgress = (prop: {
  progress: { number: boolean }[]
  isLastElement: boolean
}) => {
  let rowStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    borderTopWidth: 0.3
  }

  if (prop.isLastElement) {
    rowStyle.borderBottomWidth = 0.3
  }

  return (
    <View style={rowStyle}>
      {prop.progress.map((day, index) => {
        let style: StyleProp<ViewStyle> = {
          borderRightWidth: 0.3,
          borderColor: 'black'
        }

        if (index === 0) {
          style.borderLeftWidth = 0.3
        }
        return (
          <View
            className={'justify-center items-center p-2 flex-1'}
            style={style}
          >
            {day ? (
              <Text sx={{ color: '$success' }}>X</Text>
            ) : (
              <Text>{''}</Text>
            )}
          </View>
        )
      })}
    </View>
  )
}

export default WeekProgress
