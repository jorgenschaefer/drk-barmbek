import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

import { colors } from "./DRKStyle";

export const Tile = (props) => (
  <TileItem>
    <Link href={props.to}>
      <TileLink>
        <TileIcon>{props.icon}</TileIcon>
        <TileText>{props.children}</TileText>
      </TileLink>
    </Link>
  </TileItem>
);
Tile.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.any,
};

export const TileList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TileItem = styled.li`
  flex: 0 0 240px;
  border: 1px solid ${colors.midgray};
  margin: 0.5em;

  border-radius: 3px;
  box-shadow: 0 1px 1px 0 rgba(66, 66, 66, 0.08),
    0 1px 3px 1px rgba(66, 66, 66, 0.16);

  :hover {
    background-color: ${colors.lightgray};
  }
  transition: background-color 0.3s;
`;

const TileLink = styled.a`
  display: flex;
  color: ${colors.darkgray};
  text-decoration: none;
  padding: 1em;
  cursor: pointer;
`;

const TileIcon = styled.div`
  flex: 0 0 0px;
  padding: 0 0.5em 0 0;
  font-size: 200%;
`;

const TileText = styled.div`
  flex: 1 1 0px;
`;
