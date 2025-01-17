import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../context/AuthContext';
import { User } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <User size={60} color={theme.colors.primary} />
          </View>
          <Text style={styles.name}>{user?.displayName || 'User'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Account Information</Text>
            {/* Add more profile information here */}
          </View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  name: {
    fontSize: 24,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: 16,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.lg,
  },
  infoContainer: {
    width: '100%',
    padding: theme.spacing.md,
    backgroundColor: '#f8f8f8',
    borderRadius: theme.radius.md,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
}); 