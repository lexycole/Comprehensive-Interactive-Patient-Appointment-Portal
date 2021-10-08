import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 40,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        marginTop: -10,
        alignItems: 'center',
      },
      textStyle: {
        fontSize: 15,
        marginBottom: 20
      },
      button: {
        backgroundColor: '#0065A4',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: 'center'
      },
      buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
      }
})