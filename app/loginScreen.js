import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { theme } from '../constants/theme';
import ScreenWrapper from '../components/ScreenWrapper';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Clear any previous errors
      setError('');

      // Basic validation
      if (!email.trim() || !password.trim()) {
        setError('Please fill all fields.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }

      setLoading(true);
      await signIn(email.trim(), password);
      router.push('(tabs)');
    } catch (error) {
      console.error('Login Error:', error.code, error.message);
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/missing-password':
        case 'auth/missing-credentials':
          setError('Please enter your password.');
          break;
        case 'auth/invalid-credential':
          setError('The email or password is incorrect.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled. Please contact support.');
          break;
        default:
          console.log('Unhandled error code:', error.code); // For debugging
          setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>

          <Text style={styles.title}>Login Your Account</Text>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Mail size={20} color={theme.colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
              placeholder="Enter Your Email"
                placeholderTextColor="#666666"
              value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Lock size={20} color={theme.colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
              placeholder="Password"
                placeholderTextColor="#666666"
              value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                {showPassword ? 
                  <EyeOff size={20} color={theme.colors.textLight} /> : 
                  <Eye size={20} color={theme.colors.textLight} />
                }
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push('forgot-password')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('signUpScreen')}>
              <Text style={styles.signUpText}>
                Create New Account? <Text style={styles.signUpLink}>Sign up</Text>
              </Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <Text style={styles.continueText}>Continue With Accounts</Text>

            <View style={styles.socialContainer}>
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
                <Text style={styles.facebookButtonText}>FACEBOOK</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.sm + 4,
    marginBottom: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: theme.spacing.sm,
    color: theme.colors.text,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  eyeIcon: {
    padding: theme.spacing.sm,
  },
  forgotPassword: {
    textAlign: 'right',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
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
  signUpText: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.lg,
  },
  signUpLink: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.bold,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: theme.spacing.lg,
  },
  continueText: {
    textAlign: 'center',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  socialContainer: {
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
    paddingVertical: 16,
  },
  facebookButton: {
    backgroundColor: '#E6E6FA',
    paddingVertical: 16,
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
  facebookButtonText: {
    color: '#483D8B',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
});
