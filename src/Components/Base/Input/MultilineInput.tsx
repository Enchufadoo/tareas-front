import React from 'react'
import { TextInput, TextInputProps } from '@/Components/Base/Input/TextInput'

type Props = TextInputProps & {
  height: number
}

export function MultilineInput(props: Props) {
  return (
    <TextInput
      {...props}
      multiline={true}
      textAlignVertical={'top'}
      containerStyle={{ height: props.height, paddingTop: 10 }}
      rightIconContainerStyle={{
        alignSelf: 'flex-start',
        marginTop: 5
      }}
    />
  )
}
