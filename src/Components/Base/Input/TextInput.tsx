import React, { useState } from 'react'
import { ActivityIndicator, Animated, Platform, StyleSheet } from 'react-native'
import {
  Text,
  TextInput as ElementInput,
  View
} from '@/Components/Nativewind/React'
import { NativeSyntheticEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import { TextInputFocusEventData } from 'react-native/Libraries/Components/TextInput/TextInput'
import { styled, StyledComponent } from 'nativewind'
import { SimpleLineIcons as SSimpleLineIcons } from '@expo/vector-icons'
import { useSx } from 'dripsy'

const SimpleLineIcons = styled(SSimpleLineIcons)

const ORIGINAL_VALUE = 0
const BASE_VALUE = 1

export type TextInputProps = React.ComponentPropsWithoutRef<
  typeof ElementInput
> & {
  inProgress?: boolean
  isValid?: any
  onBlurForm?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined
  containerStyle?: {}
  leftIcon?: React.ReactElement
  rightIcon?: React.ReactElement
  rightIconContainerStyle?: {}
  label?: string
}

export function TextInput(props: TextInputProps) {
  const [borderColor] = useState(new Animated.Value(0))
  const sx = useSx()
  const { testID, ...otherProps } = props

  const styles = StyleSheet.create({
    textInput: {
      paddingTop: 0,
      margin: 0,
      fontSize: 18,
      flex: 1,

      ...Platform.select({
        web: {
          outlineStyle: 'none'
        }
      })
    },
    containerStyle: {
      height: 46,
      margin: 0,
      padding: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingTop: 0,
      marginTop: 0
    },
    textInputContainer: {
      height: 46,
      marginTop: 0,
      paddingTop: 0,
      borderBottomWidth: 0,

      margin: 0
    }
  })

  let rightIcon = null

  let originalColor = sx({ color: '$borderActive' })['color']
  if (props.isValid) {
    if (props.isValid.invalid === false && props.isValid.isDirty === true) {
      rightIcon = (
        <View className={'mr-2'}>
          <SimpleLineIcons
            name="check"
            size={16}
            className={'color-green-600'}
          />
        </View>
      )
    } else if (props.isValid.invalid === true) {
      originalColor = sx({ color: '$error' })['color']
    }
  }

  const onBlur = () => {
    Animated.timing(borderColor, {
      toValue: ORIGINAL_VALUE,
      duration: 130,
      useNativeDriver: false
    }).start()
  }

  const onFocus = () => {
    Animated.timing(borderColor, {
      toValue: BASE_VALUE,
      duration: 130,
      useNativeDriver: false
    }).start()
  }

  let color = borderColor.interpolate({
    inputRange: [ORIGINAL_VALUE, BASE_VALUE],
    outputRange: [originalColor, sx({ color: '$primary' })['color']]
  })

  if (props.inProgress) {
    rightIcon = (
      <StyledComponent
        component={ActivityIndicator}
        className={'mr-2 dark:text-white'}
      />
    )
  }

  return (
    <View testID={testID}>
      {props.label && (
        <View className={'mb-1'}>
          <Text className={'font-semibold'}>{props.label}</Text>
        </View>
      )}
      <Animated.View
        style={{
          borderWidth: 1,
          borderColor: color,
          borderRadius: 6,
          paddingLeft: 15
        }}
      >
        <View
          style={{
            ...styles.containerStyle,
            ...(typeof props.containerStyle === 'object' &&
              props.containerStyle),
            flexDirection: 'row'
          }}
        >
          {props.leftIcon && (
            <View className={' justify-center pr-[10]'}>{props.leftIcon}</View>
          )}
          <ElementInput
            placeholderTextColor={sx({ color: '$lightText' })['color']}
            sx={{ color: '$text' }}
            autoCapitalize={'none'}
            onBlur={(e) => {
              onBlur()
              if (props.onBlurForm) {
                props.onBlurForm(e)
              }
            }}
            onFocus={onFocus}
            selectionColor={sx({ color: '$primary' })['color']}
            style={styles.textInput}
            {...otherProps}
          />
          {rightIcon && (
            <View
              testID={'ProgressIndicator'}
              className={' justify-center pr-2 pl-1'}
              style={props.rightIconContainerStyle}
            >
              {rightIcon}
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  )
}
