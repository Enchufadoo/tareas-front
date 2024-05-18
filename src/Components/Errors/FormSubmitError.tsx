import React from 'react'
import { SimpleLineIcons, Text, View } from '@/Components/Nativewind/React'

interface Props {
  header: string
  subheader: string
}

const FormSubmitError = (props: Props) => {
  return (
    <View
      className={' flex-row flex-wrap'}
      style={{
        backgroundColor: '$background',
        elevation: 0.5,
        shadowColor: 'red'
      }}
    >
      <View
        className={'mr-6 flex-1 max-w-[13px]'}
        sx={{ backgroundColor: '$error' }}
      ></View>
      <View className={'my-3 space-y-2 flex-1 flex-grow'}>
        <Text className={'text-[18px]'}>{props.header}</Text>
        <Text className={'text-md'}>{props.subheader}</Text>
      </View>
      <View className={'flex-col justify-center mr-3 flex-1 max-w-[18px]'}>
        <SimpleLineIcons className={'text-red-400'} name={'close'} size={18} />
      </View>
    </View>
  )
}

export default FormSubmitError
