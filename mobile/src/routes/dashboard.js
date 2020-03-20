import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'

const {Navigator, Screen} = createBottomTabNavigator()
import Dashboard from '~/pages/Dashboard'
import Profile from '~/pages/Profile'

export default function DashboardRoute() {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        keyboardHidesTabBar: true,
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#8d41a8',
          borderTopColor: 'transparent',
          paddingTop: 5,
          paddingBottom: 5,
          height: 55,
        },
        labelStyle: {
          fontSize: 12,
        },
      }}>
      <Screen
        name="dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Agendamentos',
          tabBarIcon: ({color}) => (
            <Icon name="event" size={20} color={color} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Pefil',
          tabBarIcon: ({color}) => (
            <Icon name="person" size={20} color={color} />
          ),
        }}
      />
    </Navigator>
  )
}
