import React, { Context, Dispatch, SetStateAction, useContext } from 'react'

import { Text, TouchableOpacity, View } from '@/Components/Nativewind/React'

type ExtendedRadioButtonAnimatedProps = {
  text?: string
  buttonId: string
  context: Context<{
    radioValue: string
    setRadioValue: Dispatch<SetStateAction<string>>
  }>
  radioClassName?: string
} & React.ComponentPropsWithoutRef<typeof View>

const RadioButton = (props: ExtendedRadioButtonAnimatedProps) => {
  const { radioValue, setRadioValue } = useContext(props.context)

  const isActive = radioValue === props.buttonId

  return (
    <View className={props.radioClassName} style={props.style}>
      <View className={'flex-row'}>
        <View className={'flex-col justify-center'}>
          <TouchableOpacity
            sx={{
              borderRadius: 50,
              borderColor: isActive ? '$primary' : '$text',
              borderWidth: 1,
              width: 20,
              height: 20
            }}
            onPress={() => {
              setRadioValue(props.buttonId)
            }}
          >
            <View
              className={'justify-center rounded-full'}
              sx={{
                margin: 2,
                backgroundColor: isActive ? '$primary' : 'transparent',
                flex: 1
              }}
            ></View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPressIn={() => {
            setRadioValue(props.buttonId)
          }}
          className={'justify-center flex-1'}
        >
          <Text className={'text-md ml-2'}>{props.text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RadioButton
