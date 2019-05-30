import { StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
      },
      button: {
          borderColor: '#000', 
          borderWidth:2, 
          borderRadius:30, 
          padding:30, 
          margin:5,
          width:160
      },
      setting:{ 
        width:200, 
        flexDirection:'row', 
        alignItems:'center', 
        margin:10, 
        justifyContent:'space-between'}

  });