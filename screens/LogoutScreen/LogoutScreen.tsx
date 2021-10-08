import * as React from 'react';
import { Text, Alert, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Parse from 'parse/react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

export default function LogoutScreen() {
  const navigation = useNavigation(); 

  const signOutUser  = async function (): Promise<boolean> {
    return await Parse.User.logOut()
      .then(async () => {
        // To verify that current user is now empty, currentAsync can be used
        const currentUser: Parse.User = await Parse.User.currentAsync();
        if (currentUser === null) {
          
          Alert.alert('Log Out!', 'No user is logged in anymore!');
        }
        // Navigation dispatch calls a navigation action, and popToTop will take
        // the user back to the very first screen of the stack
        navigation.dispatch(StackActions.popToTop());
        return true;
      })
      .catch((error: object) => {
        Alert.alert('Error!', error.message);
        return false;
      });
  };
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
          <Text style = {styles.textStyle}>
            Good bye
          </Text>

        <TouchableOpacity
            style={styles.button}
            onPress={() => signOutUser()}>
            <Text style={styles.buttonTitle}>{'Log Out'}</Text>
        </TouchableOpacity>

        </KeyboardAwareScrollView>
      </View>
    );
  }
