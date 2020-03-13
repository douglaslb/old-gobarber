import React, {useRef} from 'react'
import {Image} from 'react-native'
import {useDispatch} from 'react-redux'
import {useNavigation} from '@react-navigation/native'

import logo from '~/assets/logo.png'

import {Form} from '@unform/mobile'

import Background from '~/components/Background'
import {signInRequest} from '~/store/modules/auth/actions'

import {
  Container,
  FormView,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles'

export default function SignIn() {
  const disapatch = useDispatch()

  const passwordRef = useRef()
  const formRef = useRef(null)

  const {navigate} = useNavigation()

  const handleSubmit = data => {
    console.tron.log(data)
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <FormView>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormInput
              icon="mail-outline"
              name="email"
              type="email"
              keyboardType="email-address"
              autoCorrect={true}
              autoCompleteType="off"
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              blurOnSubmit={false}
            />

            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua senha secreta"
              ref={passwordRef}
              name="password"
              type="password"
              returnKeyType="done"
            />

            <SubmitButton onPress={() => formRef.current.submitForm()}>
              Acessar
            </SubmitButton>
          </Form>
        </FormView>

        <SignLink onPress={() => navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
