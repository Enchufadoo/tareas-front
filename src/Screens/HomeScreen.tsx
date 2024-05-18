import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import { Text, View } from '@/Components/Nativewind/React'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment'
import TaskList from '@/Components/TasksList/TaskList'
import { useSelector } from 'react-redux'
import { RootState } from '@/Store/Store'
import React from 'react'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { LoggedInStackParamList } from '@/Router/LoggedInStackNavigator'

type Props = NativeStackScreenProps<LoggedInStackParamList, 'Home Screen'>

const nowDate = moment()

const MainScreen = (props: Props) => {
  const user = useSelector((state: RootState) => state.application.user)

  return (
    <BaseLayout>
      <View className="flex-col flex-1 max-w-2xl">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-2xl font-bold">Tasks</Text>

            <Text className="text-base">{nowDate.format('dddd, D MMM')}</Text>
          </View>
          <View className={'flex-row justify-end items-center flex-1'}>
            <Button
              theme={ButtonTheme.primary}
              onPress={() => {
                props.navigation.navigate('Create Task')
              }}
              title="Create"
              size={ButtonSize.small}
            />
          </View>
        </View>
        <TaskList />
      </View>
    </BaseLayout>
  )
}

export default MainScreen
