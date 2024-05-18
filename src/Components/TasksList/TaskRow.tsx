import React, { useRef, useState } from 'react'
import { Animated, StyleSheet } from 'react-native'

import { capitalize } from '@/Util/StringUtil'

import Ionicons from '@expo/vector-icons/Ionicons'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { Octicons, Pressable, Text, View } from '../Nativewind/React'
import {
  Task,
  useSetAddTaskProgressMutation,
  useSetRemoveTaskProgressMutation
} from '@/Services/Tasks'
import { ellapsedTime, hours } from '@/Util/DateUtil'
import moment from 'moment'
import { jc } from '@/Util/NativewindUtil'

const AnimatedView = Animated.createAnimatedComponent(View)

type TaskRowProps = {
  onNavigateToTask: () => void
  index: number
  item: Task
}

export default function TaskRow(props: TaskRowProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [setAddTaskProgress, setAddTaskProgressResult] =
    useSetAddTaskProgressMutation()

  const [setRemoveTaskProgress, setRemoveTaskProgressResult] =
    useSetRemoveTaskProgressMutation()

  let swipeableRow = useRef(null)

  const updateRef = (ref: Swipeable) => {
    swipeableRow.current = ref
  }
  const close = () => {
    swipeableRow.current.close()
  }

  const renderLeftActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 20],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    let style = !props.item.progress_today
      ? styles.leftAddAction
      : styles.leftCloseAction

    let icon: 'close' | 'checkmark-done' = !props.item.progress_today
      ? 'checkmark-done'
      : 'close'

    return (
      <RectButton style={style} onPress={close}>
        <AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]}>
          <Ionicons name={icon} size={32} color="white" />
        </AnimatedView>
      </RectButton>
    )
  }

  const renderRowContent = (c: Task) => {
    let mainClasses = [
      'shadow-sm',
      'lg:rounded-md',
      'flex-column',
      'rounded-sm',
      '-ml-2'
    ]

    let progressDate = c.last_progress?.created_at
      ? moment(c.last_progress.created_at)
      : null

    return (
      <Pressable
        onPress={() => {
          props.onNavigateToTask()
        }}
        className={jc(mainClasses)}
        style={{ elevation: 1, padding: 0, paddingLeft: 0 }}
        sx={{ backgroundColor: '$background' }}
        key={c.id.toString()}
      >
        <View className="ml-3 mr-3">
          <View className="flex-row ">
            <View className="flex-1">
              <Text
                className="text-xl font-medium truncate"
                sx={{
                  color: '$text'
                }}
              >
                {c.title}
              </Text>
              <Text className="text-base truncate" sx={{ color: '$lightText' }}>
                {c.description}
              </Text>
            </View>
            <View className="justify-center">
              {props.item.progress_today && (
                <Octicons sx={{ color: '$success' }} name="check" size={24} />
              )}
            </View>
          </View>
        </View>
        <View className={'ml-3 mr-3'}>
          <View
            className="h-2 w-full mb-2  "
            style={{
              borderBottomColor: '#AAA',
              borderBottomWidth: StyleSheet.hairlineWidth
            }}
          ></View>
          <View>
            {progressDate ? (
              <Text className="flex-row space-x-1 text-sm py-1">
                <Text>
                  {capitalize(ellapsedTime(c.last_progress.created_at))}
                </Text>
                <Text>{' ' + hours(progressDate)}</Text>
              </Text>
            ) : (
              <View>
                <Text className="text-sm py-1" sx={{ color: '$lightText' }}>
                  No progress yet
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    )
  }

  return (
    <Swipeable
      ref={updateRef}
      friction={3}
      leftThreshold={20}
      enableTrackpadTwoFingerGesture
      renderLeftActions={renderLeftActions}
      overshootLeft={false}
      onSwipeableOpen={close}
      containerStyle={{ marginBottom: 10 }}
      onSwipeableWillOpen={() => {
        setIsOpen(true)
      }}
      onSwipeableClose={() => {
        if (isOpen) {
          if (props.item.progress_today) {
            setRemoveTaskProgress(props.item.id)
          } else {
            setAddTaskProgress(props.item.id)
          }

          setIsOpen(false)
        }
      }}
    >
      {renderRowContent(props.item)}
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  leftAddAction: {
    flex: 1,
    maxWidth: 80,
    width: '100%',
    backgroundColor: '#5c5de5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  leftCloseAction: {
    flex: 1,
    maxWidth: 80,
    width: '100%',
    backgroundColor: '#e10808',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  actionIcon: {}
})
