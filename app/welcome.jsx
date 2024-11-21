import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../constants/theme';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../assets/images/Pawpal_logo-removebg-preview.png')} // Ensure you have your logo image in the assets folder
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>PawPal</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
          
          <Text style={styles.continueText}>Continue With Accounts</Text>
          
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <Text style={styles.googleButtonText}>GOOGLE</Text>
            </TouchableOpacity>
            <View style={styles.buttonSpacer} />
            <TouchableOpacity style={styles.facebookButton}>
              <Text style={styles.facebookButtonText}>FACEBOOK</Text>
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
    backgroundColor: '#F5F5F5',
  },
  logo: {
    flex: 1,
    width: '50%', // Adjust logo size as before
    height: '50%', // Adjust logo size as before
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
    marginTop: 40,
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueText: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  googleButton: {
    flex: 1,
    backgroundColor: '#FFCCCB',
    borderRadius: 25,
    paddingVertical: 12,
  },
  googleButtonText: {
    color: '#D32F2F',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  facebookButton: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    borderRadius: 25,
    paddingVertical: 12,
  },
  facebookButtonText: {
    color: '#3B5998',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonSpacer: {
    width: 10,
  },
});