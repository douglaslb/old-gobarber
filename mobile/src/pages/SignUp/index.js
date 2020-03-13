import React, {useRef} from 'react'
import {Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import logo from '~/assets/logo.png'

import Background from '~/components/Background'

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles'

export default function SignUp() {
  const {navigate} = useNavigation()

  const passwordRef = useRef()
  const emailRef = useRef()

  const handleSubmit = () => {}

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCompleteType="off"
            autoCapitalize="words"
            placeholder="Digite seu nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCompleteType="off"
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            blurOnSubmit={false}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigate('SignIn')}>
          <SignLinkText>Já possuí conta? Entrar</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
