import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const Stack = createStackNavigator()

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    }
  },
}

function Routes() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="SignIn"
            options={{
              title: 'Custom animation',
              ...MyTransition,
            }}
            component={SignIn}
          />
          <Stack.Screen
            name="SignUp"
            options={{
              title: 'Custom animation',
              ...MyTransition,
            }}
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

export default Routes
