import React, {useEffect, useState} from 'react';
import {
  Title,
  IconButton,
  Text as PaperText,
  Button as PaperButton,
  TextInput as PaperTextInput,
} from 'react-native-paper';

import AppointmentButton from '../../components/EditableAppointment/AppointmentButton';
import AppointmentEditable from '../../components/EditableAppointment/AppointmentEditable';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import { SafeAreaView,Alert, StyleSheet, ScrollView, 
  Text, Dimensions, View,} from 'react-native';
import Parse from "parse/react-native.js";
import keys from '../../constants/Keys';
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;
const {width} = Dimensions.get("screen");

export default function HomeScreen({id, isOpen}:{id:any, isOpen:any} ) {
    const [username, setUsername] = useState('');
    const [readResults, setReadResults] = useState<[Parse.Object]>();
    // const [newTodoTitle, setNewTodoTitle] = useState('');
    const [healthConcern, setHealthConcern] = useState('');
    const [gender, setGender] = useState('');
    const [date, setDate] = useState("2021-09-01");
    const [time, setTime] = useState('');
    const [doctor, setDoctor] = useState('');
    const [specialty, setSpecialty] = useState('');

    useEffect(() => {
        // Since the async method Parse.User.currentAsync is needed to
        // retrieve the current user data, you need to declare an async
        // function here and call it afterwards
        async function getCurrentUser() {
          // This condition ensures that username is updated only if needed
          if (username === '') {
            const currentUser: Parse.User = await Parse.User.currentAsync();
            if (currentUser !== null) {
              setUsername(currentUser.getUsername());
            }
          }
        }
        getCurrentUser();
      }, [username]);
      
  // 01.
  const createTodo = async function (): Promise<boolean> {
      // This value comes from a state variable
      // const newTodoTitleValue: string = newTodoTitle;
      const healthConcernValue: string = healthConcern;
      const genderValue: string = gender;
      const dateValue: string = date;
      const timeValue: string =time;
      const doctorValue: string = doctor;
      const specialtyValue: string = specialty;
      // Creates a new Todo parse object instance
      let Appointment: Parse.Object = new Parse.Object('Appointments');
      // Todo.set('title', newTodoTitleValue);
      // Appointment.set('done', false);
      Appointment.set('healthConcern',healthConcernValue);
      Appointment.set('gender', genderValue);
      Appointment.set('date', dateValue);
      Appointment.set('time',  timeValue);
      Appointment.set('doctor', doctorValue);
      Appointment.set('specialty', specialtyValue);

      // After setting the todo values, save it on the server
      try {
        await Appointment.save();
        // Success
        Alert.alert('Appointment created!', 'Please scroll down to appointments');
        // Refresh todos list to show the new one (you will create this function later)
        readTodos();
        return true;
      } catch (error) {
        // Error can be caused by lack of Internet connection
        Alert.alert('Error!', error.message);
        return false;
      };
    };
  // 02. READ appointments
  const readTodos = async function (): Promise<boolean> {
    // Reading parse objects is done by using Parse.Query
    const parseQuery: Parse.Query = new Parse.Query('Appointments');
    try {
      let appointments: Parse.Object[] = await parseQuery.find();
      // Be aware that empty or invalid queries return as an empty array
      // Set results to state variable
      setReadResults(appointments);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      Alert.alert('Error!', error.message);
      return false;
    };
  };
  // 03 Update Appointments
  const updateTodo = async function (
  appointmentId: string,
  // done: boolean,
  ): Promise<boolean> {
  // Create a new todo parse object instance and set todo id
  let Appointment: Parse.Object = new Parse.Object('Appointments');
  Appointment.set('objectId', appointmentId);
  // Set new done value and save Parse Object changes
  // Appointment.set('done', done);
  try {
    await Appointment.save();
    // Success
    Alert.alert('Success!', 'Appointment updated!');
    // Refresh todos list
    readTodos();
    return true;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    Alert.alert('Error!', error.message);
    return false;
    };
  };
  // 04.
  const deleteTodo = async function (appointmentId: string): Promise<boolean> {
  // Create a new todo parse object instance and set todo id
  let Appointment: Parse.Object = new Parse.Object('Appointments');
  Appointment.set('objectId', appointmentId);
  // .destroy should be called to delete a parse object
  try {
    await Appointment.destroy();
    Alert.alert('Appointment deleted!', 'You just deleted appointment');
    // Refresh todos list to remove this one
    readTodos();
    return true;
  } catch (error) {
    // Error can be caused by lack of Internet connection
    Alert.alert('Error!', error.message);
    return false;
    };
  };

      return (
        <ScrollView>
         <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
              <View style={styles.flex_between}>
                <Title style={styles.title}>Click icon to refresh</Title>
              {/* Todo read (refresh) button */}
                 <IconButton
                  icon="refresh"
                  color={'#208AEC'}
                  size={30}
                  onPress={() => readTodos()}
                /> 
                </View>
        {/* Create Appointment form Container */}
          <View style={styles.formContainer}>
          <View style={styles.attributeContainer}>
            <Text style={styles.textInputTitle}>Health</Text>
            <View style={styles.textInputContainer}>
              <Picker style={styles.picker} 
                selectedValue={healthConcern}
                  onValueChange={(itemValue, itemIndex) =>
                      setHealthConcern(itemValue)
                    }>
                  <Picker.Item label="Woman's Health" value="Woman's Health" />
                  <Picker.Item label="Skin and Hair" value="Skin and Hair" />
                  <Picker.Item label="Child Specialist" value="Child Specialist" />
                  <Picker.Item label="General Physician" value="General Physician" />
                  <Picker.Item label="Dental Care" value="Dental Care" />
                  <Picker.Item label="Eye Nose Throst" value="Eye Nose Throst" />
                  <Picker.Item label="Bone and Joints" value="Bone and Joints" />
                  <Picker.Item label="Sex Specialist" value="Sex Specialtist" />
                  <Picker.Item label="Diabetes Management" value="Diabetes Management" />
                  <Picker.Item label="PhycoTherapy" value="PhycoTherapy" />
              </Picker>
            </View>
            </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Gender</Text>
          <View style={styles.textInputContainer}>
            <Picker style={styles.picker}
               selectedValue={gender}
               onValueChange={(itemValue, itemIndex) =>
                setGender(itemValue)}>
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Date</Text>
            <DatePicker
              style={styles.datePicker}
              date={date}
              mode="date"
              placeholder="YYYY-MM-DD"
              format="YYYY-MM-DD"
              minDate="2021-09-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={(date) => setDate(date)}
            />
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Time</Text>
          <View style={styles.textInputContainer}>
             <Picker style={styles.picker}
                 selectedValue={time}
                 onValueChange={(itemValue, itemIndex) =>
                  setTime(itemValue)
                   }>
                <Picker.Item label="8am-9am" value="8am-9am" />
                <Picker.Item label="9am-10am" value="9am-10am" />
                <Picker.Item label="10am-11am" value="10am-11am" />
                <Picker.Item label="11am-12am" value="11am-12am" />
                <Picker.Item label="12pm-1pm" value="12pm-1pm" />
                <Picker.Item label="1pm-2pm" value="1pm-2pm" />
                <Picker.Item label="2pm-3pm" value="2pm-3pm" />
                <Picker.Item label="3pm-4pm" value="3pm-4pm" />
                <Picker.Item label="4pm-5am" value="4pm-5am" />
                <Picker.Item label="5pm-6pm" value="5pm-6pm" />
            </Picker>
          </View>
        </View>

        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Doctor</Text>
          <View style={styles.textInputContainer}>
             <Picker style={styles.picker}
                selectedValue={doctor}
                onValueChange={(itemValue, itemIndex) =>
                 setDoctor(itemValue)
                  }>
                <Picker.Item label="Tawfig Bahri" value="Tawfig Bahri" />
                <Picker.Item label="Josef Bouroumat" value="Josef Bouroumat" />
                <Picker.Item label="Amine Khili" value="Amine Khili" />
                <Picker.Item label="Aboderin Tokyo" value="Aboderin Tokyo" />
                <Picker.Item label="Alese ahmed" value="Alese ahmed" />
                <Picker.Item label="Abimbola micheal" value="Abimbola micheal" />
                <Picker.Item label="Oguntola Messi" value="Oguntola Messi" />
                <Picker.Item label="Alaksa joeb" value="Alaksa joeb" />
                <Picker.Item label="Kai Mendy" value="Kai Mendy" />
                <Picker.Item label="Kean Luiz" value="Kean Luiz" />
                <Picker.Item label="Zaniolo Nicolo" value="Zaniolo Nicolo" />
                <Picker.Item label="Christensen Andres" value="Christensen Andres" />     
            </Picker>
          </View>
        </View>

        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Specialty</Text>
          <View style={styles.textInputContainer}>
            <Picker style={styles.picker}
                selectedValue={specialty}
                onValueChange={(itemValue, itemIndex) =>
                 setSpecialty(itemValue)
                  }>
                <Picker.Item label="Dermatologists" value="Dermatologists" />
                <Picker.Item label="Infectious disease" value="Infectious disease" />
                <Picker.Item label="Ophthalmologists" value="Ophthalmologists" />
                <Picker.Item label="Obstetrician/gynecologists" value="Obstetrician/gynecologists" />
                <Picker.Item label="Cardiologists" value="Cardiologists" />
                <Picker.Item label="Endocrinologists" value="Endocrinologists" />
                <Picker.Item label="Gastroenterologists" value="Gastroenterologists" />
            </Picker>
          </View>
        </View>
            <AppointmentButton
              color="#21BA45"
              title= "+ create new appointment"
              onPress={() => createTodo()}
            />
            </View>
              <ScrollView>
                {/* Todo read results list */}
                {readResults !== null &&
                  readResults !== undefined &&
                  readResults.map((appointment: Parse.Object) => (
                    <AppointmentEditable
                        key={appointment.id}
                        id={appointment.id}
                        healthConcern={appointment.get('healthConcern')}
                        gender={appointment.get('gender')}
                        date={appointment.get('date')}
                        time={appointment.get('time')} 
                        doctor={appointment.get('doctor')} 
                        specialty={appointment.get('specialty')}
                        onFormSubmit={() => updateTodo(appointment.id)}
                        onRemovePress={() => deleteTodo(appointment.id)}
                    />
                  ))}
              </ScrollView>
            </View>
          </SafeAreaView>
      </ScrollView>
      );
    };