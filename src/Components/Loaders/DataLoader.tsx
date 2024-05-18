import { RootState } from '@/Store/Store'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { View } from '@/Components/Nativewind/React'
import { useSx } from 'dripsy'

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.02)',
    zIndex: 300
  }
})

const DataLoader = () => {
  const loadingData = useSelector(
    (state: RootState) => state.application.loadingData
  )

  const sx = useSx()

  return (
    <>
      {loadingData && (
        <View style={styles.loading}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ActivityIndicator
              style={{ marginTop: 8 }}
              size="large"
              color={sx({ color: '$primary' })['color']}
            />
          </View>
        </View>
      )}
    </>
  )
}

export default DataLoader
