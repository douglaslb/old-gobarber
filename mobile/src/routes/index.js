import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {useSelector} from 'react-redux'

import AuthRoute from './auth'
import DashboardRoute from './dashboard'

function Routes() {
  const {signed} = useSelector(state => state.auth)
  return (
    <>
      <NavigationContainer>
        {signed ? <DashboardRoute /> : <AuthRoute />}
      </NavigationContainer>
    </>
  )
}

export default Routes
