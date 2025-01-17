import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ScreenWrapper({ children, bg = '#fff' }) {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 5 : 30;

  return (
    <View style={{ 
      flex: 1, 
      paddingTop, 
      backgroundColor: bg 
    }}>
      {children}
    </View>
  );
}