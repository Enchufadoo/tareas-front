import { Entypo, Text, View } from '@/Components/Nativewind/React'

import { FinishTask, tasksApi } from '@/Services/Tasks'
import { capitalize } from '@/Util/StringUtil'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DeleteConfirmation from './DeleteConfirmation'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { withErrorBoundary } from '@/Components/Errors/RoutesErrorBoundary'
import { LoggedInStackParamList } from '@/Router/LoggedInStackNavigator'
import { useLoadingData } from '@/Lib/UseLoadingData'
import { useSx } from 'dripsy'

type Props = NativeStackScreenProps<LoggedInStackParamList, 'View Task'>
const ViewTaskScreen = (props: Props) => {
  const getTasksResult = tasksApi.useGetTaskQuery(props.route.params.id)
  const sx = useSx()

  const { isSuccess, data } = getTasksResult

  const { showActionSheetWithOptions } = useActionSheet()

  const [setAddTaskProgress, setAddTaskProgressResult] =
    tasksApi.useSetAddTaskProgressMutation()

  const [setDeleteTaskMutation, setDeleteTaskResult] =
    tasksApi.useSetDeleteTaskMutation()

  const [setFinishTaskMutation, setFinishTaskResult] =
    tasksApi.useSetFinishTaskMutation()

  const task = data?.data.task

  const onSetProgress = async () => {
    await setAddTaskProgress(task.id)
  }

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

  useLoadingData([
    getTasksResult,
    setAddTaskProgressResult,
    setDeleteTaskResult
  ])

  useEffect(() => {
    if (isSuccess) {
      props.navigation.setOptions({
        title: 'Task details',
        headerRight: () => {
          return (
            <View className="px-8">
              <TouchableOpacity onPress={showTasksMenu}>
                <Entypo
                  sx={{ color: '$text' }}
                  name="dots-three-horizontal"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )
        }
      })
    }
  }, [isSuccess])

  const showTasksMenu = () => {
    const options = ['Delete Task', 'Finish Task', 'Cancel']

    const destructiveButtonIndex = 0
    const finishTaskIndex = 1
    const cancelButtonIndex = 2

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        containerStyle: sx({ backgroundColor: '$background' }),
        textStyle: sx({ color: '$text' }),
        destructiveColor: sx({ color: '$text' })['color']
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case destructiveButtonIndex:
            setDeleteTaskMutation(task.id)
            props.navigation.navigate('Home Screen')

            setDeleteDialogVisible(true)
            break
          case finishTaskIndex:
            setFinishTaskMutation({
              finishTask: FinishTask.finished,
              taskId: props.route.params.id
            })
            break
          case cancelButtonIndex:
          // Canceled
        }
      }
    )
  }

  return (
    <BaseLayout>
      {isSuccess && (
        <View className="flex-1 justify-between">
          <View className=" flex-1">
            <View className="flex-row"></View>
            <View className="mt-5">
              <Text className="text-xl">
                {capitalize(data.data.task.title)}
              </Text>
            </View>
            <View className="mt-5">
              {data.data.task.description ? (
                <>
                  <Text className="font-semibold text-sm">Description</Text>
                  <Text className="text-md">{data.data.task.description}</Text>
                </>
              ) : (
                <>
                  <Text className="font-semibold text-sm">No description</Text>
                </>
              )}
            </View>
            <DeleteConfirmation
              deleteAction={async () => {
                await setDeleteTaskMutation(task.id)
                props.navigation.navigate('Home Screen')
              }}
              visible={deleteDialogVisible}
              toggleVisible={() => {
                setDeleteDialogVisible(!deleteDialogVisible)
              }}
            ></DeleteConfirmation>

            <View className="mt-7">
              {data.data.task.progress_today ? (
                <View
                  className="flex flex-row w-full max-w-lg overflow-hidden  border border-solid"
                  sx={{ borderColor: '$lightText' }}
                >
                  <View
                    className="w-1"
                    sx={{ backgroundColor: '$success' }}
                  ></View>

                  <View className="flex px-2 py-3 w-full flex-row justify-between">
                    <View>
                      <Text className="font-bold mx-3 mb-1">Status</Text>
                      <Text className=" mx-3">Progress added today</Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  className="flex flex-row w-full max-w-lg overflow-hidden border border-solid"
                  sx={{ borderColor: '$lightText' }}
                >
                  <View
                    className="w-1"
                    sx={{ backgroundColor: '$text' }}
                  ></View>
                  <View className="flex px-2 py-3 w-full">
                    <Text
                      className="font-bold mx-3 mb-1"
                      sx={{ color: '$text' }}
                    >
                      Status
                    </Text>
                    <Text className="mx-3" sx={{ color: '$text' }}>
                      Task still pending
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View>
            <Button
              size={ButtonSize.medium}
              theme={ButtonTheme.primary}
              onPress={() => {
                onSetProgress()
              }}
              title="Add Progress"
            />
          </View>
        </View>
      )}
    </BaseLayout>
  )
}

export default withErrorBoundary(ViewTaskScreen)
