import React from 'react'
import { Text, View } from '../Nativewind/React'

type Props = {
  count: number
  selected: boolean
} & React.ComponentPropsWithoutRef<typeof View>

const Badge = (props: Props) => {
  return (
    <View
      className="justify-center flex-1"
      {...props}
      sx={{ maxWidth: 24, maxHeight: 24 }}
    >
      <View
        sx={{
          borderColor: props.selected ? '$primary' : '$text'
        }}
        className={'rounded-xl  border flex-1  items-center justify-center'}
      >
        <Text
          sx={{
            color: props.selected ? '$primary' : '$text'
          }}
        >
          {props.count}
        </Text>
      </View>
    </View>
  )
}

export default Badge
