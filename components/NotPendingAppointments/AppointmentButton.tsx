import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity, } from 'react-native';
  import PropTypes from 'prop-types';

  export default function AppointmentButton({ color, title, small, onPress }:{color:any; title:any; small:any; onPress:any;}) {
    return (
      <TouchableOpacity
        style={[styles.button, { borderColor: color }]}
        onPress={onPress}>
        <Text
          style={[
            styles.buttonText,
            small ? styles.small : styles.large,
            { color },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  
  AppointmentButton.propTypes = {
    title: PropTypes.string.isRequired,
    small: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };
  
  AppointmentButton.defaultProps = {
    small: false,
  };
  
  const styles = StyleSheet.create({
    button: {
      marginTop: 10,
      minWidth: 100,
      borderWidth: 2,
      borderRadius: 3,
  },
    small: {
      fontSize: 14,
      padding: 5,
    },
    large: {
      fontSize: 16,
      padding: 10,
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
    }
  })