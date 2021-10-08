import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { View, Text } from '../../components/Themed';
import { TabView, SceneMap } from 'react-native-tab-view';
import PendingAppointment from '../../components/EditableAppointment/PendingAppointment';
import NotPendingAppointments from '../../components/NotPendingAppointments/NotPendingAppointments';
import styles from './styles';

const ConfirmedRoute = () => (
  <View style={styles.viewContainer}>
    <NotPendingAppointments />
  </View>
);

const PendingRoute = () => (
  <View style={styles.viewContainer}>
    <PendingAppointment />
  </View>
);

const renderScene = SceneMap({
  confirmed: ConfirmedRoute,
  pending: PendingRoute
})

export default function DoctorDashboardScreen () {
  const layout = useWindowDimensions();
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'confirmed', title: 'Confirmed' },
    { key: 'pending', title: 'Pending' }
  ]);


  return (
    <View style={{ flex: 1}}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Appointments Details</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
    );
  }  