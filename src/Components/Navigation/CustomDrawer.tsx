import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import React from 'react'
import { Text, View } from '@/Components/Nativewind/React'

import { useSelector } from 'react-redux'
import { RootState } from '@/Store/Store'
import { styled, useSx } from 'dripsy'

function CustomDrawerContent(props) {
  const Scroll = styled(DrawerContentScrollView)()
  const sx = useSx()
  const username = useSelector((state: RootState) => state.application.user)
  return (
    <Scroll
      {...props}
      /*// @ts-ignore */
      variant={'variants.scroll'}
      sx={{
        flex: 1
      }}
      contentContainerStyle={{
        flex: 1
      }}
    >
      <View className={'h-32 p-5 flex-col justify-center '}>
        <View className="flex-row">
          <View className=" space-y-1 grow pr-10 ">
            <Text className="font-semibold text-xl text-white">
              {username.name}
            </Text>
            <Text className=" text-lg text-white">@{username.username}</Text>
          </View>
        </View>
      </View>
      <View className={'h-full flex-1'} sx={{ backgroundColor: '$background' }}>
        <DrawerItemList {...props} />
      </View>
    </Scroll>
  )
}

export default CustomDrawerContent
