import { Text, TouchableOpacity, View } from '@/Components/Nativewind/React'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useSx } from 'dripsy'
import { getVariant } from '@/Themes/ThemeManager'

type Props = React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
  disabled?: boolean
  title: string
  icon?: JSX.Element
  classes?: string[]
  size: ButtonSize
  theme: ButtonTheme
  outline?: boolean
  loading?: boolean
}

type ThemeItem = {
  [key in ButtonTheme]?: {
    bg: string
    fg: string
    outlineFg: string
    outlineBorder: string
  }
}

export enum ButtonSize {
  small,
  medium
}

export enum ButtonTheme {
  primary = 'primary',
  secondary = 'secondary',
  disabled = 'disabled'
}

const themes: ThemeItem = {
  [ButtonTheme.primary]: {
    fg: 'text-white',
    bg: 'bg-primary-800',
    outlineFg: 'text-primary-800',
    outlineBorder: 'border-primary-800'
  },
  [ButtonTheme.secondary]: {
    fg: 'text-white',
    bg: 'bg-secondary-1000',
    outlineFg: 'text-secondary-1000',
    outlineBorder: 'border-secondary-1000'
  },
  [ButtonTheme.disabled]: {
    fg: 'text-white',
    bg: 'bg-gray-500',
    outlineFg: 'text-gray-500',
    outlineBorder: 'border-gray-500'
  }
}

const Button = (props: Props) => {
  const [maxWidth, setMaxWidth] = useState<{ maxWidth?: number }>()
  const [maxHeight, setMaxHeight] = useState<{
    maxHeight?: number
    height?: number
  }>()

  let themeName = props.theme
  if (props.disabled || props.loading) {
    themeName = ButtonTheme.disabled
  }

  const sx = useSx()

  const maxWidthCalc = () => {
    switch (props.size) {
      case ButtonSize.small:
        setMaxWidth({ maxWidth: 150 })
        setMaxHeight({ maxHeight: 40, height: 40 })
        break
      case ButtonSize.medium:
        setMaxHeight({ maxHeight: 50, height: 50 })
        setMaxWidth({ maxWidth: 600 })
        break
      default:
        setMaxWidth({})
    }
  }

  useEffect(() => {
    maxWidthCalc()
  }, [props.size])

  let textClasses = 'text-sm font-bold '

  let buttonClasses = ' items-center w-full rounded-xl'

  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      className={buttonClasses + ' '}
      style={[{ elevation: 3 }, maxWidth, maxHeight]}
      variant={getVariant(themeName, 'button.container')}
    >
      <View className="flex-row flex-1">
        <View className="flex-column justify-evenly flex-1">
          <View className="flex-row justify-center align-middle ">
            {props.icon ? <View className="pl-4 ">{props.icon}</View> : <></>}
            {props.loading && (
              <ActivityIndicator
                size={16}
                color={'white'}
                style={{ marginRight: 20 }}
              />
            )}

            <Text
              variant={getVariant(themeName, 'button.text')}
              className={textClasses}
            >
              {props.title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Button
