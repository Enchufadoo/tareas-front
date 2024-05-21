import React, { useCallback } from 'react'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { Text, View } from '@/Components/Nativewind/React'
import { useLazyGetWeeksTasksQuery } from '@/Services/Tasks'
import { useLoadingData } from '@/Lib/UseLoadingData'
import { useFocusEffect } from '@react-navigation/native'
import WeekProgress from '@/Components/ThisWeekTasks/WeekProgress'

const ThisWeekTasksScreen = () => {
  const [getWeeksTasksTrigger, getWeeksTasksResult] =
    useLazyGetWeeksTasksQuery()

  useFocusEffect(
    useCallback(() => {
      getWeeksTasksTrigger()
    }, [])
  )

  useLoadingData([getWeeksTasksResult])

  return (
    <BaseLayout>
      <Text className="text-2xl font-bold">Progress This Week</Text>

      {getWeeksTasksResult.isSuccess &&
        !getWeeksTasksResult.isFetching &&
        (getWeeksTasksResult.data.data.tasks.length ? (
          <View className={'flex-1 my-2'}>
            {getWeeksTasksResult.data.data.tasks.map((task, index) => {
              return (
                <View className={'flex-row'}>
                  <View className={'flex-1 justify-center '}>
                    <Text numberOfLines={2}>{task.title}</Text>
                  </View>
                  <View style={{ flex: 3 }}>
                    <WeekProgress
                      progress={getWeeksTasksResult.data.data.progress[task.id]}
                      isLastElement={
                        index === getWeeksTasksResult.data.data.tasks.length - 1
                      }
                    />
                  </View>
                </View>
              )
            })}
          </View>
        ) : (
          <View className="items-center flex-1 justify-center basis-4/5 shrink-0 ">
            <View className="flex-row justify-center">
              <Text
                className="text-2xl font-medium "
                sx={{
                  color: '$lightText'
                }}
              >
                You haven't created any task
              </Text>
            </View>
          </View>
        ))}
    </BaseLayout>
  )
}

export default ThisWeekTasksScreen
