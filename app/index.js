import React, { useEffect } from 'react';
import { View, Text, Image,  StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the Onboarding screen after 2 seconds
    const timer = setTimeout(() => {
      router.push('OnBoardingScreen');
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
      <Image
          source={require('../assets/images/Pawpal_logo-removebg-preview.png')} // Ensure you have your logo image in the assets folder
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.bottomTextContainer}>
          <Text style={styles.logoText}>PawPal</Text>
          <Text style={styles.versionText}>Version 1.0</Text>
        </View>
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
    fontWeight: theme.fonts.bold,  // Using theme font weight
    color: theme.colors.primary,  // Logo text color from theme
  },
  versionText: {
    fontSize: 16,
    color: theme.colors.textLight,  // Version text color from theme
    marginTop: 10,
  },
  logo: {
    flex: 1,
    width: '50%', // Adjust logo size as before
    height: '50%', // Adjust logo size as before
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTextContainer: {
    marginBottom: 40, // Margin to keep the text at the bottom
    alignItems: 'center',
  },
});

export default Index;
