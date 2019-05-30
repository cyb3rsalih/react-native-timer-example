import React from 'react'
import PropTypes from 'prop-types'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

import { Switch } from 'react-native-paper';

import {toggleVibration, toggleVoice, toggleTick} from './../actions/settings'

import {TouchableOpacity} from 'react-native-gesture-handler'

import styles from './../styles/settings.style'

class SettingsScreen extends React.Component{

    state = {
        isSwitchOn: false,
    }

    static navigationOptions = {
        title: 'Settings',
      };

    static propTypes = {
		vibration: PropTypes.bool.isRequired,
		voice: PropTypes.bool.isRequired,
		tick: PropTypes.bool.isRequired,

		toggleVibration: PropTypes.func.isRequired,
		toggleVoice: PropTypes.func.isRequired,
		toggleTick: PropTypes.func.isRequired,
		
	}

    render(){
        return(
            <View style={styles.container}>

                <View style={ styles.setting } > 
                    <Text style={{color:'#fff'}}> Tick </Text>
                    <Switch value={this.props.tick} onValueChange={ () => this.props.toggleTick() } />
                </View>

                <View style={styles.setting} > 
                    <Text style={{color:'#fff'}}>Voice</Text>
                    <Switch value={this.props.voice} onValueChange={ () => this.props.toggleVoice() } />
                </View>

                <View style={styles.setting} > 
                    <Text style={{color:'#fff'}}>Vibration</Text>
                    <Switch value={this.props.vibration} onValueChange={ () => this.props.toggleVibration() } />
                </View>

            </View>
        )
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

export default connect(mapStateToProps,mapDispatchToProps)(SettingsScreen)