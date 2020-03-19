import React, {useRef} from 'react'
import {Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useDispatchm, useSelector} from 'react-redux'

import logo from '~/assets/logo.png'
import {Form} from '@unform/mobile'
import Background from '~/components/Background'
import {signUpRequest} from '~/store/modules/auth/actions'

import {
  Container,
  FormView,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles'

export default function SignUp() {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  const passwordRef = useRef()
  const emailRef = useRef()
  const formRef = useRef(null)

  const loading = useSelector(state => state.auth.loading)

  const handleSubmit = ({name, email, password}) => {
    dispatch(signUpRequest(name, email, password))
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <FormView>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormInput
              icon="person-outline"
              name="name"
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
              name="email"
              type="email"
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
              name="password"
              type="password"
              placeholder="Sua senha secreta"
              ref={passwordRef}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />

            <SubmitButton
              loading={loading}
              onPress={() => formRef.current.submitForm()}>
              Criar conta
            </SubmitButton>
          </Form>
        </FormView>

        <SignLink onPress={() => navigate('SignIn')}>
          <SignLinkText>Já possuí conta? Entrar</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  )
}
