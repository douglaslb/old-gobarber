import React, {forwardRef, useRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useField} from '@unform/core'

import Icon from 'react-native-vector-icons/MaterialIcons'

import {Container, TInput} from './styles'

export function Input({name, label, style, icon, ...rest}) {
  const inputRef = useRef(null)
  const {fieldName, registerField, defaultValue = '', error} = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || ''
      },
      setValue(ref, value) {
        ref.setNativeProps({text: value})
        ref._lastNativeText = value
      },
      clearValue(ref) {
        ref.setNativeProps({text: ''})
        ref._lastNativeText = ''
      },
    })
  }, [fieldName, registerField])

  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="rgba(255,255,255,0.6)" />}
      <TInput ref={inputRef} defaultValue={defaultValue} {...rest} />
    </Container>
  )
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

Input.defaultProps = {
  icon: null,
  style: {},
}

export default forwardRef(Input)
