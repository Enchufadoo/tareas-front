import React from 'react'
import { Text, View } from '@/Components/Nativewind/React'
import BaseHeader from '@/Components/Layout/BaseLayout/BaseHeader'

type Props = {
  title: string
  description: string
}

const HeaderWithDescription = (props: Props) => {
  return (
    <View className={'mt-5'}>
      <BaseHeader title={props.title} subtitle={''} />
      <Text className={'text-lg text-center'}>{props.description}</Text>
    </View>
  )
}

export default HeaderWithDescription
