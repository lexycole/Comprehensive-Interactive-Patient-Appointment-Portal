import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})

// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//     container: {
//         padding: 20, 
//         marginTop: 50,
//         alignItems: 'center'
//     },
//     keyboardAware:{
//         flex: 1, 
//         width: '100%'
//     },
//     login_social: {
//         width: '100%',
//         maxWidth: 280,
//         marginTop: 20,
//       },
//       login_social_separator: {
//         flexDirection: 'row',
//         alignItems: 'center',
//       },
//       login_social_separator_line: {
//         flex: 1,
//         width: '100%',
//         height: 1,
//         backgroundColor: '#E0E0E0',
//       },
//       login_social_separator_text: {
//         marginHorizontal: 10,
//         color: '#808080',
//         fontSize: 16,
//       },
//       login_social_buttons: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 20,
//       },
//       login_social_button: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 60,
//         height: 60,
//         marginHorizontal: 12,
//         borderWidth: 1,
//         borderColor: '#E7E7E7',
//         borderRadius: 60,
//       },
//       login_social_icon: {
//         width: 38,
//         height: 38,
//         resizeMode: 'contain',
//       },
//       login_social_facebook: {
//         backgroundColor: '#4267B2',
//         borderColor: '#4267B2',
//       },
//       login_footer_text: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         color: '#808080',
//         fontSize: 15,
//       },
//       login_footer_link: {
//         color: '#208AEC',
//         fontSize: 15,
//         fontWeight: 'bold',
//       },
   
// })