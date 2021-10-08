import React, {useEffect, useState} from 'react';
import {
  List,
  Title,
  IconButton,
  Text as PaperText,
  Button as PaperButton,
  TextInput as PaperTextInput,
} from 'react-native-paper';

import { SafeAreaView,Alert, StyleSheet, ScrollView, Dimensions, View,} from 'react-native';
import Parse from "parse/react-native.js";
import keys from '../../constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppointmentEditable from '../EditableAppointment/AppointmentEditable';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;
const {width} = Dimensions.get("screen");

export default function PendingAppointment() {
    const [username, setUsername] = useState('');
    const [readResults, setReadResults] = useState<[Parse.Object]>();
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
      Alert.alert('Success!', 'Appointment created!');
      // Refresh todos list to show the new one (you will create this function later)
      readTodos();
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      Alert.alert('Error!', error.message);
      return false;
    };
  };
  // 02.
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
  // 03  UPDATE
  const updateTodo = async function (
    appointmentId: string
    // done: boolean,
  ): Promise<boolean> {
  // Create a new todo parse object instance and set todo id
  let Appointment: Parse.Object = new Parse.Object('Appointments');
  Appointment.set('objectId', appointmentId);
  // Set new done value and save Parse Object changes
  // Appointment.set('done', done);
  try {
      await Appointment.save();
        // const response = await Appointment.destory();
    // Success
    // Alert.alert('Success!', 'Appointment updated!');
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
    Alert.alert('Success!', 'Appointment deleted!');
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
    }
      
    const styles = StyleSheet.create({
      header: {
        paddingVertical:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      },
      profileImage:{
        height:50,
        width:50,
        borderRadius:25
      },
      profileCard:{
          padding: 10, 
          borderRadius:20, 
          alignItems:'center', 
          justifyContent:'flex-start', 
          borderColor: 'grey', 
          borderWidth:2
      },
      optionListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20
      },
      optionCard: {
        height: 200,
        width: width / 2 - 20,
        elevation: 5,
        backgroundColor:'#ffffff', 
        alignItems: 'center',
        borderRadius: 20
      },
      optionCardImage: {
        height: 140,
        borderRadius: 10,
        width: width -40
      },
      card: {
        height: 200,
        backgroundColor: '#788eec',
        elevation: 10,
        width: width -40,
        marginRight: 50,
        padding: 15,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 20,
      },
      doctorsCard: {
        height: 180,
        elevation: 10,
        width:width -40,
        padding: 10,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      cardImage: {
        width: '100',
        height: 120,
        borderRadius: 15,
      },
      wrapper: {
        width: '90%',
        alignSelf: 'center',
      },
      headerTodo: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#208AEC',
      },
      container: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      header_logo: {
        width: 170,
        height: 40,
        marginBottom: 10,
        resizeMode: 'contain',
      },
      header_text_bold: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      header_text: {
        marginTop: 3,
        color: '#fff',
        fontSize: 14,
      },
      flex_between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title:{
        fontSize: 14,
      },
      create_todo_container: {
        flexDirection: 'row',
      },
      create_todo_input: {
        flex: 1,
        height: 38,
        marginBottom: 16,
        backgroundColor: '#FFF',
        fontSize: 14,
      },
      create_todo_button: {
        marginTop: 6,
        marginLeft: 15,
        height: 40,
      },
      todo_item: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
      },
      todo_text: {
        fontSize: 15,
      },
      todo_text_done: {
        color: 'rgba(0, 0, 0, 0.3)',
        fontSize: 15,
        textDecorationLine: 'line-through',
      },
      formContainer: {
        backgroundColor: 'white',
        borderColor: '#D6D7DA',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
      },
      attributeContainer: {
        marginVertical: 8,
      },
      textInputContainer: {
        borderColor: '#D6D7DA',
        borderRadius: 2,
        borderWidth: .5,
        height: 30,
        backgroundColor: "#EFEFEF",
      },
      textInputDatepicker:{
        borderColor: '#D6D7DA',
        borderRadius: 2,
        borderWidth: .01,
        marginBottom: 5,
      },
      datePicker: {
        width: "100%",
        backgroundColor: "#EFEFEF",
      },
      textInput: {
        height: 30,
        marginTop: 2,
        fontSize: 14,
      },
      textInputTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      picker: {
        padding: 9,
        borderRadius: 2
      },
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
      // buttonGroup: {
      //   flexDirection: 'row',
      //   justifyContent: 'space-between',
      // },
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