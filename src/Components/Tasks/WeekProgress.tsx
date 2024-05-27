import React from 'react'

import { Entypo, Text, View } from '@/Components/Nativewind/React'
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet'
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes'
import { useSx } from 'dripsy'

const BORDER_WIDTH = 0.3

type Props = {
  progress: boolean[]
  isLastElement: boolean
}

const WeekProgress = (props: Props) => {
  const sx = useSx()

  let rowStyle: StyleProp<ViewStyle> = {
    flexDirection: 'row',
    borderTopWidth: BORDER_WIDTH
  }

  if (props.isLastElement) {
    rowStyle.borderBottomWidth = BORDER_WIDTH
  }

  return (
    <View style={rowStyle}>
      {props.progress.map((day, index) => {
        let style: StyleProp<ViewStyle> = {
          borderRightWidth: BORDER_WIDTH,
          borderColor: 'black'
        }

        if (index === 0) {
          style.borderLeftWidth = BORDER_WIDTH
        }
        return (
          <View
            key={index}
            className={'justify-center items-center p-2 flex-1'}
            style={style}
          >
            {day ? (
              <Entypo
                name={'cross'}
                size={24}
                color={sx({ color: '$success' })['color']}
              />
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
