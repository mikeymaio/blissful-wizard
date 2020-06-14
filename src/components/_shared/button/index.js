import React from 'react'
import { StyledButton } from './styles';

export const Button = props => {

  return (
    <StyledButton className="btn-hover color-3" animated {...props}>{props.children}</StyledButton>
  )
}

export default Button
