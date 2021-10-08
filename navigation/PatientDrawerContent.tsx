import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import * as React from 'react';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {Avatar, Title, Caption, Paragraph, Drawer, Switch} from 'react-native-paper'
import Parse from "parse/react-native.js";
import keys from '../constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

  export default function PatientDrawerContent(props) {
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
        <View style={{flex:1}}>
          <DrawerContentScrollView { ...props}>
            <View style={styles.drawerContent}>
              <View style={styles.userInfoSection}>
                <View style={{flexDirection:'row', marginTop:15}}>
                  <Avatar.Image
                    source={{
                      uri:'https://hmp.me/dopz',
                    }}
                    size={50} />
                    <View style={{marginLeft:15, flexDirection:'column'}}>
                      <Title style={styles.title}>
                      {username !== '' && <Text>{`Hello, Patient ${username}`}</Text>}</Title>
                    </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.section}>
                    <Paragraph style={[styles.paragraph, styles.caption]}>Status :</Paragraph>
                    <Caption style={styles.caption}> Online</Caption>
                  </View>
                </View>
              </View>
              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem 
                  icon={({color, size}) => (
                  <Ionicons name="md-home" size={32} color="#788eec" />
                  )}
                  label="Home"
                  onPress={() => {props.navigation.navigate('Home')}}
              />
               <DrawerItem 
                icon={() => (
                <Ionicons name="md-create" size={32} color="#788eec" />
              )}
                label="Patient Appointment Form"
                onPress={() => {props.navigation.navigate('PatientForm')}}
                />
              </Drawer.Section>
            </View>
          </DrawerContentScrollView>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem 
              icon={({color, size}) => (
              <Ionicons name="md-log-out" size={32} color="#788eec" />
            )}
              label="Sign Out"
              onPress={() => {props.navigation.navigate('Logout')}}
              />
              </Drawer.Section>
        </View> 
    );
  }
  const styles = StyleSheet.create({
    drawerContent: {
      flex:1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop:3,
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems:'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph:{
      fontWeight: 'bold',
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: '#f4f4f4',
      borderTopWidth: 1
    },
    preference:{
      flexDirection: 'row',
      justifyContent:'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
  
  