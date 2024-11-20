import { View, Text } from 'react-native'
import React, { Children } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ScreenWrapper = ({children, bg}) => {

    const {top} = useSafeAreaInsets();
    const paddingTop = top>0? top+5: 30;
  return (
    <View style={{flex:1, paddingTop, backgroundColor: bg}}>
      {
        children
      }
    </View>
  )
}

export default ScreenWrapper