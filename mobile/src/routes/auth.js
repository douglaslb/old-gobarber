import React from 'react'
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack'

import SignIn from '~/pages/SignIn'
import SignUp from '~/pages/SignUp'

const {Navigator, Screen} = createStackNavigator()

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

export default function AuthRoute() {
  return (
    <>
      <Navigator headerMode="none">
        <Screen
          name="SignIn"
          options={{
            title: 'Custom animation',
            ...MyTransition,
          }}
          component={SignIn}
        />
        <Screen
          name="SignUp"
          options={{
            title: 'Custom animation',
            ...MyTransition,
          }}
          component={SignUp}
        />
      </Navigator>
    </>
  )
}
