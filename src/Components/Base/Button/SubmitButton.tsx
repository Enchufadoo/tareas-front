import React, { useState } from 'react'
import Button from '@/Components/Base/Button/Button'
import { UseFormTrigger } from 'react-hook-form'

type Props = React.ComponentPropsWithoutRef<typeof Button> & {
  enabledUntilTouched: boolean
  trigger: UseFormTrigger<any>
}

const SubmitButton = (props: Props) => {
  const [touched, setTouched] = useState(false)

  const isEnabled = !touched || (touched && !props.disabled)

  return (
    <Button
      {...props}
      onPress={(event) => {
        if (props.enabledUntilTouched && !touched) {
          setTouched(true)
          props.trigger()

          if (props.disabled) {
            return
          }
        }
        props.onPress(event)
      }}
      disabled={!isEnabled}
    />
  )
}

export default SubmitButton
