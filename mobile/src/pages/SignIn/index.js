import React, {useRef} from 'react'
import {Image} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
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

  const loading = useSelector(state => state.auth.loading)

  const handleSubmit = ({email, password}) => {
    disapatch(signInRequest(email, password))
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
              name="password"
              type="password"
              placeholder="Sua senha secreta"
              ref={passwordRef}
              returnKeyType="done"
            />

            <SubmitButton
              loading={loading}
              onPress={() => formRef.current.submitForm()}>
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
