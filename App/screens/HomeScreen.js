import React from 'react';
import PropTypes from 'prop-types'
import {Vibration, Text, View, StatusBar, Picker,} from 'react-native';
import { connect } from 'react-redux';

import {TouchableOpacity} from 'react-native-gesture-handler'
import { Button } from 'react-native-paper';


import * as CONFIG from '../config/functions'
import styles from './../styles/home.style';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var start = new Sound('start.mp3', Sound.MAIN_BUNDLE)
var end = new Sound('end.wav', Sound.MAIN_BUNDLE)



class HomeScreen extends React.Component {

    static navigationOptions = {
		title: 'Home',
		header: null
      };

    static propTypes = {
		vibration: PropTypes.bool.isRequired,
		voice: PropTypes.bool.isRequired,
		tick: PropTypes.bool.isRequired,		
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
             
				{/* <Button style={{borderColor:'#fff'}} color={'white'} icon="settings" mode="outlined" onPress={() => this.props.navigation.navigate('Settings')}>
					Settings
				</Button> */}

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

export default connect(mapStateToProps)(HomeScreen)