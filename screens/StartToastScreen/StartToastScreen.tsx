import * as React from 'react';
import {ImageBackground, Text, View, TouchableHighlight, Image, KeyboardAvoidingView} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export default function StartToastScreen() {
  const navigation = useNavigation()

  const onPatientLinkPress = () => {
    navigation.navigate('Login')
  }
  const onDoctorLinkPress = () => {
      navigation.navigate('DoctorPhoneAuthScreen')
  }

  return (
    <View style={styles.container}>
     <ImageBackground 
     source={require('../../assets/images/StartToast-bg.png')} 
     style={styles.image}>
      <Image 
        style={styles.logo}
        source={require('../../assets/images/icon.png')}    
        />
      <View>
        <View style={styles.textxE}>
        <Text style={styles.textOne}>Interactive Patient Appointment Portal</Text>
        <Text style={styles.textTwo}>
          Please sign in to schedule your next appointment or see list of scheduled appointments
        </Text>
        </View>
       
        <View>
            <TouchableHighlight onPress={onPatientLinkPress}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Patient Login</Text>
              </View>
            </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={onDoctorLinkPress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Doctor Login</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.footer}>
          <Text>By Omotosi Abayomi, 150805021</Text>
          <Text> Department of Computer Sciences, UNILAG 2021</Text>
        </View>
      </View>
    </ImageBackground>
  </View>
  );
}