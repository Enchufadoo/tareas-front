import React from 'react'
import { Text, View } from '@/Components/Nativewind/React'

type Props = {
  title: string
  subtitle: string
}

const BaseHeader = (props: Props) => {
  return (
    <View className="space-y-3">
      <Text className="text-3xl  font-bold pt-12 text-center">
        {props.title}
      </Text>
      <Text
        className="text-md text-lg text-center"
        sx={{ color: '$lightText' }}
      >
        {props.subtitle}
      </Text>
    </View>
  )
}

export default BaseHeader
