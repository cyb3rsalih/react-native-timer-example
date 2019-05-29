import React from 'react';
import PropTypes from 'prop-types'

import {Vibration ,StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, Picker, Platform} from 'react-native';
import { connect } from 'react-redux';

import {toggleVibration, toggleVoice, toggleTick} from './../actions/settings'

import * as CONFIG from '../config/functions'

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var start = new Sound('start.mp3', Sound.MAIN_BUNDLE)
var end = new Sound('end.wav', Sound.MAIN_BUNDLE)
const screen = Dimensions.get('window')


class HomeScreen extends React.Component {

    static propTypes = {
		vibration: PropTypes.bool.isRequired,
		voice: PropTypes.bool.isRequired,
		tick: PropTypes.bool.isRequired,

		toggleVibration: PropTypes.func.isRequired,
		toggleVoice: PropTypes.func.isRequired,
		toggleTick: PropTypes.func.isRequired,
		
	}

	state = {
		remainingSeconds:5,
		isRunning:false,
		selectedMinutes:'0',
		selectedSeconds:'5',
		startTitle:'start',
		stopTitle:'stop'
	}

	interval = null
	componentDidUpdate(prevProps, prevState) {
		if(this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0 ){
			this.stop()
		}
	}
	

	componentWillUnmount() {
		if(this.interval){
			clearInterval(this.interval)
		}
	}
	

	onPressStart = () => {
				this.props.vibration ? Vibration.vibrate( CONFIG.DURATION ) : null

				this.setState({ 
					remainingSeconds: parseInt(this.state.selectedMinutes,10) * 60 + parseInt(this.state.selectedSeconds,10),
					isRunning : true })
					
				this.interval = setInterval(() => {
					this.setState({ remainingSeconds: this.state.remainingSeconds -1 },() => this.state.remainingSeconds == 0 ? null : this.props.tick ? start.play() : null)
				},1000)		
	}

	stop = () => {
		this.props.voice ? end.play() : null
		this.props.vibration ? Vibration.vibrate(CONFIG.DURATION) : null

		clearInterval(this.interval)
		this.interval = null
		//this.setState({remainingSeconds : 5})
		this.setState({ isRunning : false })
	}

    // Make it component
	renderPickers = () => {
		return (
			<View style={styles.pickerContainer}>
				<Picker 
					style={styles.picker}
					itemStyle={styles.pickerItem}
					selectedValue={this.state.selectedMinutes}
					onValueChange= {itemValue => { this.setState({selectedMinutes:itemValue}) }}
					mode='dropdown' >
						{ 
							CONFIG.AVAILABLE_MINUTES.map(value => (
								<Picker.Item key={value} label={value} value={value} />
								)
							)
						}
				</Picker>
				<Text style={styles.pickerItem}>Minutes</Text>
				<Picker 
					style={styles.picker}
					itemStyle={styles.pickerItem}
					selectedValue={this.state.selectedSeconds}
					onValueChange= {itemValue => { this.setState({selectedSeconds : itemValue}) } }
					mode='dropdown' >
						{ 
							CONFIG.AVAILABLE_SECONDS.map(value => (
								<Picker.Item key={value} label={value} value={value} />
								)
							)
						}
				</Picker>
				<Text style={styles.pickerItem}>Seconds</Text>
			
			</View>
		)
	}

    render() {
		const { minutes, seconds } = CONFIG.getRemaining(this.state.remainingSeconds)
		
        return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' />
                    <Text onPress={() => this.props.toggleTick()} style={{color:'#fff'}}> Tick is  {this.props.tick ? 'ON' : 'OFF'}</Text>
                    <Text onPress={() => this.props.toggleVoice()} style={{color:'#fff',marginVertical:20 }}> Voice is  {this.props.voice ? 'ON' : 'OFF'}</Text>
                    <Text onPress={() => this.props.toggleVibration()} style={{color:'#fff'}}> Vibration is  {this.props.vibration ? 'ON' : 'OFF'}</Text>

                    {
                    this.state.isRunning  ? 
                        <Text style={styles.timerText} > {`${minutes}:${seconds}`} </Text>
                                                                    :
                        this.renderPickers()
                    }

                    {
                    !this.state.isRunning ?     
                        <TouchableOpacity onPress={ () => this.onPressStart() } style={styles.button} >
                                <Text style={styles.buttonText} >Start</Text>
                        </TouchableOpacity>  : 
                    
                            
                        <TouchableOpacity onPress={ () => this.stop() } style={[styles.button,styles.buttonStop]} >
                                <Text style={[styles.buttonText,styles.buttonTextStop]} >Stop</Text>
                        </TouchableOpacity>
                    }

        </View>
        );
  }
}

const mapStateToProps = ({settings}) => {
	const { vibration, voice, tick } = settings

	return {
		vibration,
		voice,
		tick
	}
}

const mapDispatchToProps = {
	toggleVibration,
	toggleVoice,
	toggleTick
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
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
  });