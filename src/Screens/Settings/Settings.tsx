import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { logout } from '@/Store/Features/ApplicationSlice'
import { MaterialIcons, Text, View } from '@/Components/Nativewind/React'
import { StackNavigationProp } from '@react-navigation/stack'
import { SettingsStackParamList } from '@/Router/SettingsStackNavigator'
import BaseLayout from '@/Components/Layout/BaseLayout/BaseLayout'

type Props = NativeStackScreenProps<SettingsStackParamList, 'Settings Screen'>

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    marginVertical: 8
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  title: {
    marginLeft: 10
  }
})

const Settings = (props: Props) => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<StackNavigationProp<SettingsStackParamList>>()

  const DATA = [
    {
      id: 'theme',
      title: 'Theme',
      description: 'Change the application theme',
      icon: (
        <MaterialIcons sx={{ color: '$text' }} size={22} name={'contrast'} />
      ),
      onPress: () => {
        navigation.navigate('Theme Screen')
      }
    },
    {
      id: 'profile',
      title: 'Profile',
      description: 'Edit your account details',
      icon: (
        <MaterialIcons sx={{ color: '$text' }} size={22} name={'engineering'} />
      ),
      onPress: () => {
        navigation.navigate('Edit Profile Screen')
      }
    },
    {
      id: 'password',
      title: 'Password',
      description: 'Change your password',
      icon: (
        <MaterialIcons sx={{ color: '$text' }} size={22} name={'password'} />
      ),
      onPress: () => {
        navigation.navigate('Change Password Screen')
      }
    },
    {
      id: 'logout',
      title: 'Log Out',
      icon: <MaterialIcons sx={{ color: '$text' }} size={22} name={'logout'} />,
      onPress: () => {
        props.navigation.dispatch(DrawerActions.closeDrawer())
        dispatch(logout())
      }
    }
  ]

  const renderItem = ({ item }) => (
    <Item
      onPress={item.onPress}
      description={item.description}
      title={item.title}
      icon={item.icon}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <BaseLayout>
        <FlatList
          ListHeaderComponent={
            <View>
              <View style={[styles.item]}>
                <Text style={styles.headerText}>General</Text>
              </View>
            </View>
          }
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </BaseLayout>
    </SafeAreaView>
  )
}

const Item = ({ title, icon, description, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.item} className={'py-2'}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row'
        }}
      >
        <View className={' justify-center'}>{icon}</View>
        <View className={'justify-center'}>
          <Text className={'text-[17px]'} style={styles.title}>
            {title}
          </Text>
          {description && <Text style={styles.title}>{description}</Text>}
        </View>
      </View>
    </View>
  </TouchableOpacity>
)

export default Settings
