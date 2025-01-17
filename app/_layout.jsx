import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack 
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="welcome" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="loginScreen" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="signUpScreen" 
            options={{ headerShown: false }} 
          />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}