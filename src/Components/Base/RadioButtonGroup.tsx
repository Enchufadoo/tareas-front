import React, { Context, Dispatch, SetStateAction } from 'react'
import { View } from '@/Components/Nativewind/React'

type Props = React.ComponentPropsWithoutRef<typeof View> & {
  context: Context<{
    radioValue: string
    setRadioValue: Dispatch<SetStateAction<string>>
  }>
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

const RadioButtonGroup = (props: Props) => {
  const RadioButtonProvider = props.context.Provider

  return (
    <RadioButtonProvider
      value={{ radioValue: props.value, setRadioValue: props.setValue }}
    >
      <View>{props.children}</View>
    </RadioButtonProvider>
  )
}

export default RadioButtonGroup
