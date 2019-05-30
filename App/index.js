import React from 'react'
import { createStackNavigator, createBottomTabNavigator ,createAppContainer } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'

import Ionicons from 'react-native-vector-icons/Ionicons'


// const AppNavigator = createStackNavigator({
// 	Home: { screen: HomeScreen },
// 	Settings: { screen: SettingsScreen }
// },
// {
// 	initialRouteName:'Home'
// });


const TabNavigator = createBottomTabNavigator({
	Home:{
		screen:HomeScreen,
		navigationOptions: {
		  tabBarLabel:"Timer",
		  tabBarIcon: ({ tintColor }) => (
			<Ionicons name="ios-bookmarks" size={20}/>
		  )
		},
	  },
	Settings: {
		screen:SettingsScreen,
		navigationOptions: {
		  tabBarLabel:"Settings",
		  tabBarIcon: ({ tintColor }) => (
			<Ionicons name="ios-settings" size={20}/>
		  )
		},
	  },
  });

export default createAppContainer(TabNavigator)

