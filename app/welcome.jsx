import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';

const Welcome = () => {
  return (
    <ScreenWrapper bg="#F7F8FA">
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to PawPal!</Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Welcome;
