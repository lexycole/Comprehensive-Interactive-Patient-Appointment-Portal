// import * as React from 'react';
import React, { useState, useEffect} from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, Alert, Platform} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Parse from "parse/react-native.js";
import keys from '../../constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

export default function DoctorPhoneAuthScreen() {
    const navigation = useNavigation()
    useEffect(() => {
        const createInstallation = async () => {
          const Installation = Parse.Object.extend(Parse.Installation);
          const installation = new Installation();
      
          installation.set("deviceType", Platform.OS);
      
          await installation.save();
        }
        createInstallation();
      }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   
    const createDoctor = async function (): Promise<boolean> {
      // Note that these values come from state variables that we've declared before
      const usernameValue: string = username;
      const passwordValue: string = password;
      
      return await Parse.User.logIn(usernameValue, passwordValue)
        .then(async (loggedInUser: Parse.User) => {
          // usersCredentials.save();
          // log In returns the corresponding ParseUser object
          Alert.alert(
            'Success!',
            `User ${loggedInUser.get('username')} has successfully signed in!`,
          );
          // To verify that this is in fact the current user, currentAsync can be used
          const currentUser: Parse.User = await Parse.User.currentAsync();
          console.log(loggedInUser === currentUser);
          // Navigation.navigate takes the user to the screen named after the one
          // passed as parameter
          navigation.navigate('DoctorDashboard');
          return true;
        })
        .catch((error: object) => {
          // Error can be caused by wrong parameters or lack of Internet connection
          Alert.alert('Error!', error.message);
          return false;
        });
      }
        // const createDoctor = async function (){
        //   let Doctors: Parse.Object = new Parse.Object('Doctors');
        //   Doctors.set('username', "doctor");
        //   Doctors.set('password', "doctor");

        //   try {
        //     await Doctors.save();
        //         Alert.alert( 
        //           'Success!',
        //           `User ${Doctors.get('username')} has logged in!`,)
        //         navigation.navigate('DoctorDashboard')
        //     return true;
        // } catch(error) {
        //     Alert.alert(`Error: ${error.message}`);
        //     return false;
        // }
        //   };
 
  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
            style={styles.logo}
            source={require('../../assets/images/doctors.png')}
        />
        <TextInput
            style={styles.input}
            value={username}
            placeholder={'Username'}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
        />
        <TextInput
            style={styles.input}
            value={password}
            placeholder={'Password'}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => createDoctor()}>
            <Text style={styles.buttonTitle}>{'Log in'}</Text>
        </TouchableOpacity>
    </KeyboardAwareScrollView>
</View>
)
}