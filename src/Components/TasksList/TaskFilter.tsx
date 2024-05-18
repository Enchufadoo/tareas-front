import { TaskCount, TaskProgressState } from '@/Services/Tasks'
import { jc } from '@/Util/NativewindUtil'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from '../Nativewind/React'
import Badge from './Badge'

interface CountResult {
  number: number
}

type Props = {
  taskFilterState: number
  setTaskFilterState: (arg0: number) => void
  tasksCount?: TaskCount
}

export const listStates = [
  { value: TaskProgressState.open, text: 'Open' },
  { value: TaskProgressState.finished, text: 'Finished' },
  { value: TaskProgressState.all, text: 'All' }
]

const calculateCount = (taskCount: TaskCount) => {
  let result = {} as CountResult

  let finished = taskCount['finished']
  let unfinished = taskCount['unfinished']

  result[TaskProgressState.finished] = finished
  result[TaskProgressState.open] = unfinished
  result[TaskProgressState.all] = finished + unfinished

  return result
}

const TaskFilter = (props: Props) => {
  let textClassList = ['text-lg ']

  const [count, setCount] = useState<CountResult>()

  useEffect(() => {
    if (props.tasksCount) {
      setCount(calculateCount(props.tasksCount))
    }
  }, [props.tasksCount])

  const renderStates = listStates.map((el, index) => {
    let textClassListCopy = textClassList.slice()
    let selected = props.taskFilterState === el.value

    return (
      <View key={el.text} className="flex-row flex-1 py-3">
        <TouchableOpacity
          key={el.text}
          className="focus:outline-none flex-row flex-1 justify-center items-center"
          onPress={() => {
            props.setTaskFilterState(el.value)
          }}
        >
          <View className={'flex-row flex-1  items-center'}>
            {count && (
              <Badge
                count={count[el.value]}
                selected={selected}
                style={{ marginRight: 6 }}
              />
            )}
            <Text
              sx={{
                color: selected ? '$primary' : '$text'
              }}
              className={jc(textClassListCopy)}
            >
              {el.text}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  })

  return (
    <View className="flex-row justify-between mt-3 mb-3 text-center mr-2">
      {renderStates}
    </View>
  )
}

export default TaskFilter
