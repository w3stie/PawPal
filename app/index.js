import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the Onboarding screen after 2 seconds
    const timer = setTimeout(() => {
      router.push('OnBoardingScreen'); // Make sure you create an onboarding.js file in the `app` folder
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.logoText}>PawPal</Text>
        <Text style={styles.versionText}>Version 1.0</Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  versionText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 10,
  },
});

export default Index;
