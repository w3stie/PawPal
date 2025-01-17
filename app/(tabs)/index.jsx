import React from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';

console.log('Loading HomeScreen component');

function HomeScreen() {
  console.log('Rendering HomeScreen');
  const { user } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.displayName || 'User'}</Text>
    </View>
  );
}

console.log('Exporting HomeScreen');
export default HomeScreen; 