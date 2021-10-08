import React, {useEffect, useState} from 'react';

import { SafeAreaView, StatusBar, StyleSheet, ScrollView, Image, Text,Dimensions } from 'react-native';
import { View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import Parse from "parse/react-native.js";
import keys from '../constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

const {width} = Dimensions.get("screen");

export default function HomeScreen() {
  const [username, setUsername] = useState('');
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

  return (
    <SafeAreaView style={{ backgroundColor: '#ffffff', flex:1}}> 
        <StatusBar
          translucent={false}
          backgroundColor={'#fff'}
          barStyle="dark-content" />
          <View style={styles.header}>
            <View>
              <Text style={{color:'#788eec'}}>
              Welcome!
              </Text>
              <Text style={{color:'#788eec', fontSize:20, fontWeight:'bold'}}>
              {username !== '' && <Text>{`Hello,  Patient ${username}!`}</Text>} </Text>
            </View>
            <Image source={{uri:'https://hmp.me/dopz'}} style={styles.profileImage} />
          </View>
          <View style={styles.header}>
            <View>
              <Text style={{color:'dark', fontSize:20, fontWeight:'bold'}}>
                Next appointment</Text>
            </View>
          </View> 
          <ScrollView>
                  <View style={styles.header}>
                    {/* Card Container */}
                  <View style={styles.card}>
                      <View style={{ flexDirection: 'row',
                            justifyContent:'space-between',
                            marginTop:20, backgroundColor:'#788eec'}}>  
                      <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>Tomorrow</Text>
                      <Text style={{padding:10, color:'#788eec', backgroundColor:'#fff', borderRadius:25}}>
                        <Ionicons name="md-flag" size={20} color="dark" />
                      </Text>
                    </View>
                      <Text style={{fontSize:14, marginTop:-5, color:'#fff'}}>11 January 2021, 20:00am</Text>
                      <View style={{backgroundColor:'#788eec', marginTop:20, flexDirection:'row', justifyContent:'flex-start'}}>
                      <Image source={require('../assets/images/Profile.png')} style={styles.profileImage} />
                        <View style={{marginLeft:10, marginTop:10, backgroundColor:'#788eec'}}>
                          <Text style={{color:'#fff'}}>Dr Tasfiq</Text>
                          <Text style={{color:'#fff'}}>Family Doctor Cardiology</Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{paddingVertical:10, paddingHorizontal:10,}}>
                  <Text style={{color:'dark',fontSize:20, fontWeight:'bold'}}>
                    Doctors you have visited
                    </Text>
                    </View>
                  <View style={styles.header}>
                  <View style={styles.doctorsCard}>
                     <View style={[styles.profileCard, {flex: 3}]}>
                          <Image source={require('../assets/images/Profile.png')} style={styles.profileImage} />
                          <Text style={{fontSize:15, fontWeight:'bold', color:'dark'}}>Rgnoske kshdfi</Text>
                          <Text style={{fontSize:13, color:'dark'}}>Family doctor</Text>
                          <Text style={{fontSize:11, color:'dark'}}>Cardiologist</Text>
                        </View>

                        <View style={[styles.profileCard,{flex: 3}, {marginLeft: 10} ]}>
                          <Image source={require('../assets/images/Profile.png')} style={styles.profileImage} />
                          <Text style={{fontSize:15, fontWeight:'bold', color:'dark'}}>Azaka Kanb</Text>
                          <Text style={{fontSize:13, color:'dark'}}>Family doctor</Text>
                          <Text style={{fontSize:11, color:'dark'}}>Eye Therapist</Text>
                        </View>
                    </View>
                </View>
          </ScrollView>
    </SafeAreaView>
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
  }
});
