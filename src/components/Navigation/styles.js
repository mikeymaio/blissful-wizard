import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints } from '../../utils/styles'

export const Wrapper = styled.div`
  background: #ffffff;
  margin-bottom: 1.45rem;
`

export const Container = styled.div`
  display: flex;
  // justify-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0 auto;
  // max-width: 960px;
  width: 100%;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
`

export const MenuLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  display: none;
  flex: 1;

  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.4rem;
  }

  @media (min-width: ${breakpoints.m}px) {
    display: flex;
  }
`

export const MobileMenuLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;
  // position: absolute;
  // left: 0;
  // top: -20px;
  display: flex;
  flex: 1;

  @media (min-width: ${breakpoints.s}px) {
    display: none;
  }
`

export const CartCounter = styled.span`
  background-color: transparent;
  // color: #663399;
  color: #000;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 1.2rem;
  float: right;
  margin-top: -10px;
  z-index: 20;
  position: absolute;
  top: -10px;
  right: -10px;
`

export const Title = styled.div`
  color: #000000;
  text-decoration: none;
  font-size: 2rem;
  font-weight: bold;

  letter-spacing: 2px;
  margin: 0;
  color: #000;
  font-size: 1.7em;

  @media (max-width: ${breakpoints.s}px) {
    display: none;
    // font-size: 1.4rem;
  }

  @media (max-width: ${breakpoints.m}px) {
    font-size: 1.4rem;
  }
`

export const LogoIcon = styled.img`
  @media (max-width: ${breakpoints.s}px) {
    display: none;
  }
`
