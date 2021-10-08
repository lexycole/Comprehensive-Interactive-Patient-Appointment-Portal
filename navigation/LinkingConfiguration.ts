/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      StartToast:{
        screens: {
          StartToastScreen: 'Start Toast'
        },
      },
      Login:{
        screens: {
          HomeScreen: 'Login'
        },
      },
      Register:{
        screens: {
          RegisterScreen: 'Register'
        },
      },
      Logout:{
        screens: {
          LogoutScreen: 'Logout'
        },
      },
      Home:{
        screens: {
          HomeScreen: 'Home'
        },
      },
      PatientForm: {
        screens:  {
          PatientFormScreen: ' Patient Form',
        },
      },
      DoctorDashboard: {
        screens: {
          DoctorDashboardScreen: 'Doctor Dashboard',
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
