import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Pawpal_logo-removebg-preview.png')}
        style={styles.pawPrint}
      />
      <Text style={styles.appName}>PawPal</Text>
      <Text style={styles.version}>Version 1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  pawPrint: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C', // Red color
    marginTop: 20,
  },
  version: {
    fontSize: 16,
    color: '#7F8C8D', // Gray color
    marginTop: 10,
  },
});
