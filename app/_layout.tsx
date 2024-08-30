import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <WebView
        source={{ uri: 'https://m.youtube.com/' }}
        style={{ flex: 1 }}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});