import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, View } from '../Themed';
import PropTypes from 'prop-types';
import AppointmentButton from './AppointmentButton';

import Parse from "parse/react-native.js";
import keys from '../../constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;


export default class Appointment extends React.Component {
    static propTypes = {
      id: PropTypes.string.isRequired,
      healthConcern: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      doctor: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
    };
  
    handleRemovePress = () => {
      const { id, onRemovePress } = this.props;
      onRemovePress(id);
      // 04. Delete Appointments
      (async () => {
        let appointments = new Parse.Object('Appointments');
          appointments.set('objectId', id)
        try {
          await appointments.destroy();
            console.log('Appointment deleted!');
        } catch {
          console.error('Error while creating Project: ', error.message);
        }
      })();
    };
  
    renderActionButton() {
      return (
        <AppointmentButton
          color="#21BA45"
          title="Confirm"
          onPress={() => Alert.alert('Confirm Successful!')}
        />
      );
    }
  
    render() {
      const {  healthConcern, gender, date, time, doctor, specialty } = this.props;
      return (
        <View style={styles.appointerContainer}>
          <View style={styles.titleProject}> 
            <Text><Text style={styles.title}>Health: </Text> {healthConcern}</Text>
            <Text><Text style={styles.title}>Gender: </Text> {gender}</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.titleProject}>
            <Text><Text style={styles.title}>Date: </Text> {date}</Text>
            <Text><Text style={styles.title}>Time: </Text>{time}</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.titleProject}>
            <Text><Text style={styles.title}>Specialty: </Text>{specialty}</Text>
            <Text>
            <Text style={styles.title}>Doctor: </Text>{doctor}</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.buttonGroup}>
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    appointerContainer: {
      backgroundColor: 'white',
      borderColor: '#d6d7da',
      borderWidth: 2,
      borderRadius: 10,
      padding: 15,
      margin: 15,
      marginBottom: 0,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleProject: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    separator: {
      marginVertical: 10,
      height: 0.1,
      width: '80%',
    },
  });