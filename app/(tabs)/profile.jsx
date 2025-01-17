import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
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
  },
  email: {
    fontSize: 16,
    color: theme.colors.textLight,
    marginTop: theme.spacing.sm,
  },
}); 