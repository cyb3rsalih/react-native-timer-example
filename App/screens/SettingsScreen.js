import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import {toggleVibration, toggleVoice, toggleTick} from './../actions/settings'

import styles from './../styles/settings.style'

class SettingsScreen extends React.Component{

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
                    <TouchableOpacity style={ styles.button } onPress={ () => this.props.toggleTick() }>
                        <Text> Tick is {this.props.tick ? 'ON' : 'OFF'} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={ styles.button } onPress={ () => this.props.toggleVoice() }>
                        <Text> Voice is {this.props.voice ? 'ON' : 'OFF'} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={ styles.button } onPress={ () => this.props.toggleVibration() }>
                        <Text>  Vibration is {this.props.vibration ? 'ON' : 'OFF'} </Text>
                    </TouchableOpacity>
          
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