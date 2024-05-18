import React, { FC, useEffect } from 'react'
import { FieldError } from 'react-hook-form'
import { log } from 'expo/build/devtools/logger'
import { Text } from '@/Components/Nativewind/React'

interface InputErrorProps {
  error: FieldError
}

const InputError: FC<InputErrorProps> = (props) => {
  useEffect(() => {}, [props.error])

  if (!props.error) return null

  return <Text>{props.error.message}</Text>
}

export default InputError
