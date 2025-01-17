import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/Pawpal_logo-removebg-preview.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>PawPal</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('loginScreen')}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.signupButton}
            onPress={() => router.push('signUpScreen')}
          >
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
          
          <Text style={styles.continueText}>Continue With Accounts</Text>
          
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity 
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => console.log('Google login')}
            >
              <Text style={styles.socialButtonText}>GOOGLE</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity 
              style={[styles.socialButton, styles.facebookButton]}
              onPress={() => console.log('Facebook login')}
            >
              <Text style={styles.socialButtonText}>FACEBOOK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginTop: theme.spacing.xl,
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: theme.fonts.bold,
  },
  signupButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  signupButtonText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: theme.fonts.bold,
  },
  continueText: {
    textAlign: 'center',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  socialButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#FFCCCB',
  },
  facebookButton: {
    backgroundColor: '#E6E6FA',
  },
  socialButtonText: {
    color: '#D32F2F',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: theme.fonts.bold,
  },
  buttonSpacer: {
    width: 10,
  },
});