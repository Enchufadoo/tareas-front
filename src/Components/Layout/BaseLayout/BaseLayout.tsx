import React, { PropsWithChildren } from 'react'
import { View } from '@/Components/Nativewind/React'
import DataLoader from '@/Components/Loaders/DataLoader'

const BaseLayout = (props: PropsWithChildren) => {
  return (
    <View
      className={`justify-center flex-wrap flex-row flex-1 pt-3`}
      sx={{
        backgroundColor: '$background'
      }}
    >
      <DataLoader></DataLoader>
      <View className="flex-1 p-5 pt-0 justify-between">{props.children}</View>
    </View>
  )
}

export default BaseLayout
