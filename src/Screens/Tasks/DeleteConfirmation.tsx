import React from 'react'
import { View } from 'react-native'

type DialogComponentProps = {
  visible: boolean
  toggleVisible: () => void
  deleteAction: () => void
}

const DeleteConfirmation: React.FunctionComponent<DialogComponentProps> = (
  props
) => {
  return (
    <View>
      {/*<Dialog isVisible={props.visible} onBackdropPress={props.toggleVisible}>
        <Dialog.Title title="Delete Task Confirmation" />
        <Text>Are you sure you want to delete this task</Text>
        <Dialog.Actions>
          <Dialog.Button title="Delete" onPress={props.deleteAction} />
          <Dialog.Button title="Cancel" onPress={() => props.toggleVisible()} />
        </Dialog.Actions>
      </Dialog>*/}
    </View>
  )
}

export default DeleteConfirmation
