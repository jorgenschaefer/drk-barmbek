import React, { useState } from "react";
import styled from 'styled-components'
import { Link as RouterLink, withRouter } from "react-router-dom";
import { colors } from './DRKStyle';

export const Menu = withRouter(({ history, ...props }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  history.listen((location, action) => {
    setIsMenuVisible(false);
  })
  return (
    <MenuButton onClick={ () => setIsMenuVisible(isVisible => !isVisible) }>
      <MenuDropdown isVisible={ isMenuVisible }>
        {props.children}
      </MenuDropdown>
    </MenuButton>
  )
})

const MenuButton = styled.div`
  width: 50px;
  height: 50px;
  background: url("/menubutton.png");
  position: relative;
`

const MenuDropdown = ({ isVisible, ...props }) => {
  if (isVisible) {
    return (
      <MenuDropdownUL>
        { props.children.map((entry, key) => <MenuDropdownLI key={ key }>{entry}</MenuDropdownLI>) }
      </MenuDropdownUL>
    )
  } else {
    return null;
  }
}

const MenuDropdownUL = styled.ul`
  position: absolute;
  right: 0;
  margin: 50px 0 0 0;
  padding: 10px;
  background: #fff;
  box-shadow: -5px 12px 20px #b4b4b4;
  list-style: none;
`;

const MenuDropdownLI = styled.li`
  margin: 10px 0;
`

export const MenuLink = styled(RouterLink)`
  margin: auto 10px;
  color: ${colors.midblue};
  text-decoration: none;
  font-weight: bold;
`
