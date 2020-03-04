import React from 'react'
import { Form, Input } from '@rocketseat/unform'
import { useSelector } from 'react-redux'

import { Container } from './styles'

export default function Profile() {
  const profile = useSelector(state => state.user.profile)

  const handleSubmit = data => {}

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" placeholder="Seu endereço de e-mail" />
        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Seu senha atual"
        />

        <Input type="password" name="password" placeholder="Nova senha" />

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button">Sair do GoBarber</button>
    </Container>
  )
}
