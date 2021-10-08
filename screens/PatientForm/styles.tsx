import { StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get("screen");

export default StyleSheet.create({
  buttonPadding: {
    paddingHorizontal: 15,
  },
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
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  headerTodo: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#208AEC',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header_logo: {
    width: 170,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  header_text_bold: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  header_text: {
    marginTop: 3,
    color: '#fff',
    fontSize: 14,
  },
  flex_between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  create_todo_container: {
    flexDirection: 'row',
  },
  create_todo_input: {
    flex: 1,
    height: 38,
    marginBottom: 16,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  create_todo_button: {
    marginTop: 6,
    marginLeft: 15,
    height: 40,
  },
  todo_item: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
  },
  todo_text: {
    fontSize: 15,
  },
  todo_text_done: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
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
  },
  appointerContainer: {
    backgroundColor: 'white',
    borderColor: '#d6d7da',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  titleProject: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 10,
    height: 0.1,
    width: '80%',
  },
})