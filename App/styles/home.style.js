import { StyleSheet, Dimensions, Platform } from 'react-native';
const screen = Dimensions.get('window')

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color:'#fff'
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    button:{
          borderWidth: 10 ,
          borderColor: '#89AAFF' ,
          width: screen.width / 2 ,
          height: screen.width / 2 ,
              borderRadius: screen.width / 2 ,    
              alignItems:'center',
              justifyContent: 'center',
              marginTop:30
      },
      buttonStop:{
          borderColor: '#ff851B'
      },
    buttonText:{
        fontSize: 45,
        color: '#89AAFF'
      },
      buttonTextStop:{
          color: '#ff851B'
      },
      timerText:{
          color:'#fff',
          fontSize: 90,
      },
      pickerContainer:{
          flexDirection:'row',
          alignItems:'center',
      },
      picker:{
          width: 50,
          ...Platform.select({
              android:{
                  color:'#fff',
                  backgroundColor: '#07121B',
                  marginLeft:10
              }
          })
      },
      pickerItem:{
          color:'#fff',
          fontSize:20
      },
      settingsButton: {
        borderColor: '#fff', 
        borderWidth:2, 
        borderRadius:10, 
        padding:10, 
        margin:5,
        width:100
      }
  });