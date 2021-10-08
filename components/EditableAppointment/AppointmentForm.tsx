import * as React from 'react';
import { StyleSheet, Alert} from 'react-native';
import { Text, View } from '../Themed';
import AppointmentButton from './AppointmentButton';
import PropTypes from 'prop-types';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';

import Parse from "parse/react-native.js";
import keys from '../../constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

export default class AppointmentForm extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    healthConcern: PropTypes.string,
    gender: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    doctor: PropTypes.string,
    specialty: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    id: '',
    healthConcern: '',
    gender: ' ',
    date: ' ',
    time: ' ',
    doctor: ' ',
    specialty: ' ',
  };

  constructor(props: {} | Readonly<{}>) {
    super(props);

    const { id, healthConcern, gender, date, time, doctor, specialty, newAppointment } = props;

    this.state = {
      newAppointment: [ 
        { 
          id: id ? id : '',
          healthConcern: id ? healthConcern : '',
          gender: id ? gender : '',
          date: id ? date : '',
          time: id ? time : '',
          specialty: id ? specialty: '',
          doctor: id ? doctor: '',
        }
      ],
    }

  }

  handleHealthConcernChange = (healthConcern: any) => {
    this.setState({ healthConcern});
  };
  handleGenderChange = (gender: any) => {
    this.setState({ gender });
  };
  handleDateChange = (date: any) => {
    this.setState({ date });
  };
  handleTimeChange = (time: any) => {
    this.setState({ time });
  };
  handleDoctorChange = (doctor: any) => {
    this.setState({ doctor });
  };
  handleSpecialtyChange =  (specialty: any) => {
    this.setState({  specialty });
  };
  handleSpecialtyDoctorChange = (doctor: any, specialty: any) => {
    this.setState({  doctor, specialty });
  }

  handleCreateFormSubmit =  newappointer => {

    const { appointment } = this.state;

    const newAppointer = (attrs = {}) => {
      const newappointer = {
        id: '',
        healthConcern: attrs.healthConcern || '',
        gender: attrs.gender || '',
        date: attrs.date || '',
        time: attrs.time || '',
        doctor: attrs.doctor || '',
        specialty: attrs.specialty || '',
       
      };
      return newappointer;
    };
    this.setState({
      appointment: [newAppointer(newappointer), ...appointment],
    });
  };

  handleFormSubmit = attrs => {
    const { onFormSubmit, id } = this.props;
    const { healthConcern, gender, date, time, doctor, specialty, newAppointment  } = this.state;

    onFormSubmit({
      id,
      healthConcern,
      gender,
      date, 
      time, 
      doctor, 
      specialty,
      newAppointment
    });

    this.setState({   
      newAppointment: newAppointment.map(newappointer => {
        if (newappointer.id === attrs.id) {
          const { healthConcern, gender, date, time, doctor, specialty } = attrs;
          return {
            ...newappointer,
            healthConcern,
            gender,
            date, 
            time,
            doctor, 
            specialty
          };
        }
        return newappointer;
      }),
    });

    // 01. Create Appointment on server
      (async () => {
          const appointments = new Parse.Object('Appointments');
            appointments.set('healthConcern', healthConcern);
            appointments.set('gender', gender);
            appointments.set('date', date);
            appointments.set('time',  time);
            appointments.set('doctor', doctor);
            appointments.set('specialty', specialty);
          try {
            const result = await appointments.save();
            Alert.alert('Success!', 'Appointment created!');
            return result;
          } catch (error) {
            // console.error('Error while creating Project: ', error);
            return false;
          }
        })();

    // 02. Read appointments on server
    (async () => {
      const appointments = Parse.Object.extend('Appointments');
      const query = new Parse.Query(appointments);
      try {
        const results = await query.find();
        for (const object of results) {
          // Access the Parse Object attributes using the .GET method
          const healthConcern = object.get('healthConcern')
          const gender = object.get('gender')
          const date = object.get('date')
          const doctor = object.get('doctor')
          const time = object.get('time')
          const specialty = object.get('specialty')

          console.log(healthConcern);
          console.log(gender);
          console.log(date);
          console.log(doctor);
          console.log( time);
          console.log(specialty);

        }
      } catch (error) {
        Alert.alert('Error!', error.message)
        console.error('Error while fetching Appointment', error);
      }
    })();

      // 03. Update Appointments
      (async () => {
        const appointments = new Parse.Object('Appointments');
          appointments.set('objectId', id);
          const query = new Parse.Query(appointments);
        try {
          await appointments.save();
          // Alert.alert('Update successful!');
          const result = await query.find();
          console.log(result);
          return result;
        
        } catch(error) {
          Alert.alert('Error!', error.message);
          return false;
        }
      })();
  }

  render() {
    const { id, onFormClose} = this.props;
    // const { healthConcern, gender, date, time, doctor, specialty, newAppointment } = this.state;    
    const submitText = id ? 'Reschedule' : 'Create';
    
    return (
      <View style={styles.formContainer}>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Health</Text>
          <View style={styles.textInputContainer}>
            <Picker style={styles.picker} onValueChange={this.handleHealthConcernChange} >
                <Picker.Item label="Woman's Health" value="Woman's Health" />
                <Picker.Item label="Skin and Hair" value="Skin and Hair" />
                <Picker.Item label="Child Specialist" value="Child Specialist" />
                <Picker.Item label="General Physician" value="General Physician" />
                <Picker.Item label="Dental Care" value="Dental Care" />
                <Picker.Item label="Eye Nose Throst" value="Eye Nose Throst" />
                <Picker.Item label="Bone and Joints" value="Bone and Joints" />
                <Picker.Item label="Sex Specialtist" value="Sex Specialtist" />
                <Picker.Item label="Diabetes Management" value="Diabetes Management" />
                <Picker.Item label="PhycoTherapy" value="PhycoTherapy" />
            </Picker>
          </View>
          </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Gender</Text>
          <View style={styles.textInputContainer}>
            <Picker style={styles.picker}
                onValueChange={this.handleGenderChange}>
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Date</Text>
            <DatePicker
              style={styles.datePicker}
              date={this.state.date}
              mode="date"
              placeholder="YYYY-MM-DD"
              format="YYYY-MM-DD"
              minDate="2021-09-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              onDateChange={this.handleDateChange}
            />
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Time</Text>
          <View style={styles.textInputContainer}>
             <Picker style={styles.picker}
                onValueChange={this.handleTimeChange}>
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
                onValueChange={this.handleDoctorChange}>
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
                onValueChange={this.handleSpecialtyChange}>
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
        <View style={styles.buttonGroup}>
          <AppointmentButton
            small
            color="#21BA45"
            title={submitText}
            onPress={this.handleFormSubmit}
          />
          <AppointmentButton
            small
            color="#DB2828"
            title="Cancel"
            onPress={onFormClose}
          />
        </View>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
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
    }
  })