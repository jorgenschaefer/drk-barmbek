import React from "react";
import styled from 'styled-components'
import { Link as RouterLink } from "react-router-dom";

export const colors = {
  drkred: 'rgb(230, 0, 5)',
  softred: 'rgb(228, 100, 80)',
  darkblue: 'rgb(0, 45, 85)',
  midblue: 'rgb(0, 117, 169)',
  lightblue: 'rgb(235, 245, 255)',
  darkgray: 'rgb(85, 79, 74)',
  midgray: 'rgb(224, 221, 214)',
  lightgray: 'rgb(239, 238, 234)'
}

export const Page = styled.div`
  color: ${colors.darkgray};
  font-family: HelveticaNeueLT, Open Sans, Arial, Helvetica, sans-serif;
  font-size: 1.125rem;
  margin: 0;
  padding: 0;
  background: white;
`

export const Menu = (props) => (
  <MenuBar>
    <MenuLogo><DRKIcon /></MenuLogo>
    <MenuItems>{props.children}</MenuItems>
  </MenuBar>
)

const MenuBar = styled.div`
  box-shadow: 0 6px 8px -6px #b4b4b4;
  display: flex;
  width: 100%;
  height: 50px;

  @media print {
    display: none;
  }
`

const MenuLogo = styled.div`
  flex: 0;
`

export const DRKIcon = styled.div`
  height: 30px;
  width: 100px;
  margin: 10px 20px;
  background-image: url('/logo.svg');
  background-size: contain;
  background-position: left;
  background-repeat: no-repeat;
`

const MenuItems = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`

export const MenuLink = styled(RouterLink)`
  flex-grow: 0;
  margin: auto 10px;
  color: ${colors.midblue};
  text-decoration: none;
  font-weight: bold;
`

export const Content = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;

  @media print {
    margin: 0;
    padding: 0;
    max-width: auto;
  }
`

export const Title = styled.h1`
  color: ${colors.softred};
  font-size: 2.588rem;
  line-height: 1.26;
  font-weight: normal;
  margin: 0.5em 0;
`

export const Header = styled.h2`
  color: ${colors.softred};
  font-size: 2.2rem;
  line-height: 1.26;
  font-weight: normal;
  margin: 0.5em 0;
`

export const Subheader = styled.h3`
  color: ${colors.softred};
  font-size: 1.58rem;
  line-height: 1.26;
  font-weight: normal;
  margin: 0.5em 0;
`

export const Link = styled(RouterLink)`
  color: ${colors.midblue};
`
