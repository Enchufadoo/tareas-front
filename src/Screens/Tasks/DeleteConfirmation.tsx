import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import { Text } from '@/Components/Nativewind/React'
import Button, {
  ButtonSize,
  ButtonTheme
} from '@/Components/Base/Button/Button'

type DialogComponentProps = {
  visible: boolean
  toggleVisible: () => void
  deleteAction: () => void
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})

const DeleteConfirmation: React.FunctionComponent<DialogComponentProps> = (
  props
) => {
  return (
    <Modal
      statusBarTranslucent
      animationType="slide"
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text className={'text-lg text-center'}>
            Are you sure you want to delete this task
          </Text>
          <View className={'flex-row  mt-10'}>
            <View className={'mr-2 flex-1'}>
              <Button
                title={'Delete'}
                size={ButtonSize.small}
                theme={ButtonTheme.primary}
                onPress={props.deleteAction}
              />
            </View>
            <View className={'flex-1'}>
              <Button
                title={'Cancel'}
                size={ButtonSize.small}
                theme={ButtonTheme.disabled}
                onPress={props.toggleVisible}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default DeleteConfirmation
