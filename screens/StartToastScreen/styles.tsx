import { StyleSheet } from 'react-native';

export default StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
        },
        image: {
          flex: 1,
          resizeMode: 'cover',
        }, 
        logo: {
          height: 100,
          width: 100,
          alignSelf: "center",
          marginTop: 50,
          marginBottom: 40
        },
        button: {
          backgroundColor: '#ffffff',
          marginLeft: 30,
          marginRight: 30,
          marginTop: 40,
          height: 48,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: 'center'
        },
        buttonText: {
          color: '#2F3C5F',
          fontSize: 15,
          fontWeight: 'bold',
        },
        textOne: {
          color: '#ffffff',
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 15,
          textAlign: 'center'
        },
        textTwo: {
          color: '#ffffff',
          fontSize: 15,
          marginTop: 15,
          textAlign: 'center',
          fontWeight: 'bold',
        },
        textxE:{
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: 'center',
          marginTop: 15,
          marginBottom: 20
        },
        footer: {
          flex: 1,
          alignItems: 'center',
          marginVertical: 50,
          fontSize: 2,
        }
    });