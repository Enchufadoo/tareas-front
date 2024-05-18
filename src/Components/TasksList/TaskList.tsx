import React, { useCallback, useEffect, useState } from 'react'

import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { Text, View } from '../Nativewind/React'

import { Task, TaskProgressState, tasksApi } from '@/Services/Tasks'
import { AppDispatch } from '@/Store/Store'
import TaskRow from './TaskRow'
import TaskFilter from './TaskFilter'
import { setLoadingData } from '@/Store/Features/ApplicationSlice'
import { LoggedInStackParamList } from '@/Router/LoggedInStackNavigator'

const TaskList = () => {
  const [taskFilterState, setTaskFilterState] = useState(TaskProgressState.open)
  const navigation =
    useNavigation<StackNavigationProp<LoggedInStackParamList>>()
  const dispatch = useDispatch<AppDispatch>()

  const [getTasksTrigger, getTasksResult] =
    tasksApi.endpoints.getTasks.useLazyQuery()

  useFocusEffect(
    useCallback(() => {
      getTasksTrigger(taskFilterState)
    }, [])
  )

  useEffect(() => {
    dispatch(setLoadingData(getTasksResult.isFetching))
  }, [getTasksResult.isFetching])

  const renderItem = ({ item, index }: { item: Task; index: number }) => {
    return (
      <TaskRow
        index={index}
        onNavigateToTask={() => {
          navigation.navigate('View Task', {
            id: item.id
          })
        }}
        item={item}
      />
    )
  }

  const renderStatusLabel = (state: TaskProgressState) => {
    switch (state) {
      case TaskProgressState.all:
        return 'No tasks'
      case TaskProgressState.open:
        return 'No open tasks'
      case TaskProgressState.finished:
        return 'No finished tasks'
    }
  }

  return (
    <>
      <TaskFilter
        taskFilterState={taskFilterState}
        tasksCount={getTasksResult.data?.data.task_count}
        setTaskFilterState={(filterState: TaskProgressState) => {
          getTasksTrigger(filterState)
          setTaskFilterState(filterState)
        }}
      />

      {getTasksResult.isSuccess &&
        !getTasksResult.isFetching &&
        (getTasksResult.data.data.tasks.length ? (
          <>
            <View className="flex-1 shrink-0">
              <FlatList
                data={getTasksResult.data.data.tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </>
        ) : (
          <View className="items-center flex-1 justify-center basis-4/5 shrink-0 ">
            <View className="flex-row justify-center">
              <Text
                className="text-2xl font-medium "
                sx={{
                  color: '$lightText'
                }}
              >
                {renderStatusLabel(taskFilterState)}
              </Text>
            </View>
          </View>
        ))}
    </>
  )
}

export default TaskList
