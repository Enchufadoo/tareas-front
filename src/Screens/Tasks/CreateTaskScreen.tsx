import { Text, View } from '@/Components/Nativewind/React'
import {
  useGetCreteTaskDataQuery,
  useSetCreateTaskMutation
} from '@/Services/Tasks'
import { setLoadingData } from '@/Store/Features/ApplicationSlice'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { isValidForm } from '@/Util/FormUtil'
import InputError from '@/Components/Errors/InputError'

import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'
import FormSubmitError from '@/Components/Errors/FormSubmitError'
import { MultilineInput } from '@/Components/Base/Input/MultilineInput'
import { TextInput } from '@/Components/Base/Input/TextInput'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'
import { LoggedInStackParamList } from '@/Router/LoggedInStackNavigator'

type Props = NativeStackScreenProps<LoggedInStackParamList, 'Create Task'>

const CreateTaskScreen = (props: Props) => {
  const { isFetching, isSuccess, isError, data } = useGetCreteTaskDataQuery()

  const [setCreateTask, setCreateTaskResult] = useSetCreateTaskMutation()

  const dispatch = useDispatch()

  const requiredFields = ['title']

  const {
    getValues,
    control,
    formState: { errors, isDirty, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: ''
    }
  })

  let isValid = isValidForm(errors, requiredFields, dirtyFields)

  useEffect(() => {
    if (setCreateTaskResult.isSuccess) {
      props.navigation.navigate('Home Screen')
    }
  }, [setCreateTaskResult.isSuccess])

  useEffect(() => {
    dispatch(setLoadingData(isFetching))
  }, [isFetching])

  return (
    <>
      {isSuccess && (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <BaseLayout>
            <View className="flex-1">
              <View className="mb-5">
                <Text className="text-2xl font-bold">New Task</Text>
                <Text>Create a new task</Text>
              </View>
              <View className="flex-1 space-y-4">
                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'The title field is required'
                      },
                      minLength: {
                        value: 4,
                        message: 'The title must be at least 4 characters long'
                      },
                      maxLength: {
                        value: 30,
                        message: 'The title must be at most 30 characters'
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        placeholder={'Title'}
                        onBlurForm={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="default"
                        isValid={control.getFieldState('title')}
                      />
                    )}
                    name="title"
                  />

                  <InputError error={errors.title} />
                </View>
                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: false,
                        message: 'The description field is required'
                      },
                      minLength: {
                        value: 4,
                        message:
                          'The description must be at least 4 characters long'
                      },
                      maxLength: {
                        value: 3000,
                        message: 'The title must be at most 3000 characters'
                      }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <MultilineInput
                        height={300}
                        placeholder={'Description'}
                        onBlurForm={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="default"
                        isValid={control.getFieldState('description')}
                      />
                    )}
                    name="description"
                  />

                  <InputError error={errors.title} />
                </View>
                {setCreateTaskResult.isError && (
                  <View className={'mt-6'}>
                    <FormSubmitError
                      header={'Creating a task failed'}
                      subheader={'Please try again later'}
                    />
                  </View>
                )}
              </View>
            </View>
            <View className={'mt-12 mb-12'}>
              <Button
                theme={ButtonTheme.primary}
                size={ButtonSize.medium}
                title={'Create Task'}
                disabled={!isDirty || !isValid}
                outline={false}
                loading={
                  setCreateTaskResult.isLoading || setCreateTaskResult.isSuccess
                }
                onPress={async () => {
                  await setCreateTask(getValues())
                }}
              />
            </View>
          </BaseLayout>
        </ScrollView>
      )}
    </>
  )
}

export default CreateTaskScreen
