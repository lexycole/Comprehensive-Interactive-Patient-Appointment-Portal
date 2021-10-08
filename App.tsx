import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
const Parse = require('parse/react-native.js');
import keys from './constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

export default function App() {
  useEffect(() => {
    const createInstallation = async () => {
      const Installation = Parse.Object.extend(Parse.Installation);
      const installation = new Installation();
  
      installation.set("deviceType", Platform.OS);
  
      await installation.save();
    }

    createInstallation();
  }, []);
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
