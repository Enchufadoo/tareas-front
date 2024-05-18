import React from 'react'
import { Text, View } from '@/Components/Nativewind/React'

import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import RadioButton from '@/Components/Base/RadioButton'
import RadioButtonGroup from '@/Components/Base/RadioButtonGroup'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSettings,
  selectThemeName,
  setTheme,
  ThemeSetting
} from '@/Store/Features/ApplicationSlice'
import { useSetSettingMutation } from '@/Services/Settings'
import { Themes } from '@/Themes/ThemeCollection'
import Separator from '@/Components/Layout/BaseLayout/Separator'

let debounced: number = 0

function ThemesScreen() {
  const radioContext = React.createContext(null)
  const dispatch = useDispatch()
  const settings = useSelector(selectSettings)
  const themeName = useSelector(selectThemeName)

  const [setSettingTrigger, setSettingResult] = useSetSettingMutation()

  const setValue = (value: ThemeSetting) => {
    dispatch(setTheme(value))
    if (debounced) {
      clearTimeout(debounced)
    }
    debounced = setTimeout(() => {
      setSettingTrigger({ settingId: settings.theme.id, settingValue: value })
    }, 3000)
  }

  return (
    <BaseLayout>
      <View>
        <Text className={'text-lg'}>
          Select a theme to personalize your app's appearance. Changes will
          apply across the entire app.
        </Text>
        <Separator
          style={{
            marginBottom: 20,
            marginTop: 20
          }}
        />
        <RadioButtonGroup
          context={radioContext}
          className={'space-y-3'}
          value={themeName}
          setValue={setValue}
        >
          <RadioButton
            buttonId={'system'}
            text={'System Default'}
            context={radioContext}
          />

          <RadioButton
            buttonId={Themes.dark}
            text={'Dark Theme'}
            context={radioContext}
          />

          <RadioButton
            buttonId={Themes.light}
            text={'Light Theme'}
            context={radioContext}
          />
        </RadioButtonGroup>
      </View>
    </BaseLayout>
  )
}

export default ThemesScreen
