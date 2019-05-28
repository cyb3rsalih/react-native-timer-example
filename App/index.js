import React, {Component} from 'react';
import PropTypes from 'prop-types'

import {Vibration ,StyleSheet, Text, View, StatusBar, TouchableOpacity, Dimensions, Picker, Platform} from 'react-native';
import { connect } from 'react-redux';

import {toggleVibration, toggleVoice, toggleTick} from './actions/settings'



var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var start = new Sound('start.mp3', Sound.MAIN_BUNDLE)
var end = new Sound('end.wav', Sound.MAIN_BUNDLE)

const DURATION = 1000 // For ios, not changeable
// Wait times between vibrates.
// If passed with true it will be a loop -> 1,2,3,1,2,3
const PATTERN = [1000,2000,3000] 

const screen = Dimensions.get('window')

// Take number add 0 into, 3 > 03 , 10 > 010 and by slice get last 2 digits
const formatNumber = (number) => `0${number}`.slice(-2)

const getRemaining = (time) => {
	const minutes = Math.floor( time/60 )
	const seconds = Math.floor( time - minutes * 60 )
	return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) }
}

const createArray = length => {
	const arr = []
	let i = 0;

	while(i < length){
		arr.push(i.toString())
		i += 1
	}

	return arr
}

const AVAILABLE_MINUTES = createArray(10)
const AVAILABLE_SECONDS = createArray(60)

class App extends Component {

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
				this.props.vibration ? Vibration.vibrate(DURATION) : null

				this.setState({ 
					remainingSeconds: parseInt(this.state.selectedMinutes,10) * 60 + parseInt(this.state.selectedSeconds,10),
					isRunning : true })
					
				this.interval = setInterval(() => {
					this.setState({ remainingSeconds: this.state.remainingSeconds -1 },() => this.state.remainingSeconds == 0 ? null : this.props.tick ? start.play() : null)
				},1000)		
	}

	stop = () => {
		this.props.voice ? end.play() : null
		this.props.vibration ? Vibration.vibrate(DURATION) : null

		clearInterval(this.interval)
		this.interval = null
		//this.setState({remainingSeconds : 5})
		this.setState({ isRunning : false })
	}

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
							AVAILABLE_MINUTES.map(value => (
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
							AVAILABLE_SECONDS.map(value => (
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
		const { minutes, seconds } = getRemaining(this.state.remainingSeconds)
		
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

export default connect(mapStateToProps,mapDispatchToProps)(App)

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
	backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
