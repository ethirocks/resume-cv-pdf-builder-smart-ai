import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { FontAwesome } from '@expo/vector-icons';

// Fetching environment variables with fallback values
const GOOGLE_IOS_CLIENT_ID = Constants.expoConfig?.extra?.GOOGLE_IOS_CLIENT_ID ?? 'default-ios-client-id';
const GOOGLE_ANDROID_CLIENT_ID = Constants.expoConfig?.extra?.GOOGLE_ANDROID_CLIENT_ID ?? 'default-android-client-id';
const GOOGLE_WEB_CLIENT_ID = Constants.expoConfig?.extra?.GOOGLE_WEB_CLIENT_ID ?? 'default-web-client-id';

// Set the redirect URI manually
const REDIRECT_URI = 'http://localhost:8081';

export default function LoginScreen() {
  const [error, setError] = useState('');
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: REDIRECT_URI,
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    if (response) {
      if (response.type === 'success') {
        const { authentication } = response;
        router.push('/Dashboard');
      } else if (response.type === 'error') {
        setError('Google login failed. Please try again.');
      }
    }
  }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  const handleGuestLogin = () => {
    router.push('/Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Resume Builder</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]} onPress={handleGoogleLogin}>
        <FontAwesome name="google" size={24} color="#ffffff" />
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.socialButton, styles.guestButton]} onPress={handleGuestLogin}>
        <FontAwesome name="user" size={24} color="#ffffff" />
        <Text style={styles.buttonText}>Continue as Guest</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  guestButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
