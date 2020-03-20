import React, {useMemo} from 'react'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {parseISO, formatRelative} from 'date-fns'
import pt from 'date-fns/locale/pt-BR'

import {Container, Left, Avatar, Info, Name, Time} from './styles'

export default function Appointment({data, onCancel}) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    })
  }, [data.date])

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `https://ui-avatars.com/api/?background=7159c1&color=fff&name=${data.provider.name}`,
          }}
        />

        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>
      {data.cancelable && !data.canceledAt && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  )
}
