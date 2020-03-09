import React from 'react'
import {Text} from 'react-native'

import Input from '~/components/Input'
import Background from '~/components/Background'
import Button from '~/components/Button'

export default function SignIn() {
  return (
    <Background>
      <Text>Hello</Text>
      <Input
        style={{marginTop: 30}}
        icon="call"
        placeholder="Digite seu nome"
      />
      <Button>Entrar</Button>
    </Background>
  )
}
