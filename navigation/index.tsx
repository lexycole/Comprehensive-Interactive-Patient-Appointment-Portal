import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { ColorSchemeName} from 'react-native';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import PatientFormScreen from '../screens/PatientForm/PatientFormScreen';
import DoctorDashboardScreen from '../screens/DoctorDashboard/DoctorDashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import StartToastScreen from '../screens/StartToastScreen/StartToastScreen';
import LogoutScreen from '../screens/LogoutScreen/LogoutScreen';
import DoctorPhoneAuthScreen from '../screens/DoctorPhoneAuthScreen/DoctorPhoneAuthScreen';
import PatientDrawerContent from './PatientDrawerContent';
import DoctorDrawerContent from './DoctorDrawerContent';

const Parse = require('parse/react-native.js');
import keys from '../constants/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StartToast" component={StartToastScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
       <Stack.Screen name="Register" component={RegisterScreen} />
       <Stack.Screen name="DoctorPhoneAuthScreen" component={DoctorPhoneAuthScreen} options={{ title: 'Doctor Login' }}/>
      <Stack.Screen name="Home" component={PatientDrawerNavigator} options={{ headerShown: false }}/> 
      <Stack.Screen name="PatientForm" component={ PatientDrawerNavigator} options={{ title: 'Patient Form' }} />
      <Stack.Screen name="DoctorDashboard" component={DoctorDrawerNavigator} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

/**
 * Drawer Navigation display
 */
 const PatientDrawer = createDrawerNavigator<RootStackParamList>();
 function PatientDrawerNavigator() {
   return (
      <PatientDrawer.Navigator drawerContent={props => <PatientDrawerContent {...props} /> }>
         <PatientDrawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}  />
         <PatientDrawer.Screen name="PatientForm" component={PatientFormScreen} options={{ title: 'Patient Form' }} />
         <PatientDrawer.Screen name="Logout" component={LogoutScreen} options={{ title: 'Log Out' }} />
       </PatientDrawer.Navigator>
   );
 }
 
 const DoctorDrawer = createDrawerNavigator<RootStackParamList>();
 function DoctorDrawerNavigator() {
   return (
       <DoctorDrawer.Navigator drawerContent={props => <DoctorDrawerContent {...props} /> }>
         <DoctorDrawer.Screen name="DoctorDashboard" component={DoctorDashboardScreen} options={{ title: 'Doctor Dashboard'}} />
         <DoctorDrawer.Screen name="Logout" component={LogoutScreen} options={{ title: 'Log Out' }} />
       </DoctorDrawer.Navigator>
   );
 };

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
// const BottomTab = createBottomTabNavigator<RootTabParamList>();

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="TabOne"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//       }}>
//       <BottomTab.Screen
//         name="TabOne"
//         component={TabOneScreen}
//         options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
//           title: 'Tab One',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           headerRight: () => (
//             <Pressable
//               onPress={() => navigation.navigate('Modal')}
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.5 : 1,
//               })}>
//               <FontAwesome
//                 name="info-circle"
//                 size={25}
//                 color={Colors[colorScheme].text}
//                 style={{ marginRight: 15 }}
//               />
//             </Pressable>
//           ),
//         })}
//       />
//       <BottomTab.Screen
//         name="TabTwo"
//         component={TabTwoScreen}
//         options={{
//           title: 'Tab Two',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }
