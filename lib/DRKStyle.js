import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NextLink from "next/link";

export const colors = {
  drkred: "rgb(230, 0, 5)",
  softred: "rgb(228, 100, 80)",
  darkblue: "rgb(0, 45, 85)",
  midblue: "rgb(0, 117, 169)",
  lightblue: "rgb(235, 245, 255)",
  darkgray: "rgb(85, 79, 74)",
  midgray: "rgb(224, 221, 214)",
  lightgray: "rgb(239, 238, 234)",
};

export const Page = styled.div`
  color: ${colors.darkgray};
  font-family: HelveticaNeueLT, Open Sans, Arial, Helvetica, sans-serif;
  font-size: 1.125rem;
  margin: 0;
  padding: 0;
  background: white;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 6px 8px -6px #b4b4b4;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 10;
  height: 50px;

  @media print {
    display: none;
  }
`;

export const HeaderLogo = ({ to }) => (
  <NextLink href={to}>
    <a>
      <img
        style={{ height: "50px", display: "block" }}
        src="/drk-barmbek-logo.png"
        alt="Übersicht"
      />
    </a>
  </NextLink>
);
HeaderLogo.propTypes = {
  to: PropTypes.string,
};

export const HeaderItemLeft = styled.div``;

export const HeaderItemRight = styled.div`
  margin-right: 15px;
`;

export const HeaderIntern = styled.div`
  border: 1px solid ${colors.drkred};
  color: ${colors.drkred};
  padding: 0.2em 1em;
  border-radius: 5px;
  font-weight: bold;
  white-space: nowrap;
`;

export const Content = styled.div`
  max-width: 1160px;
  margin: 60px auto 0 auto;
  padding: 0 20px;

  @media print {
    margin: 0;
    padding: 0;
    max-width: auto;
  }
`;

export const Title = styled.h1`
  color: ${colors.softred};
  font-size: 2.588rem;
  line-height: 1.26;
  font-weight: normal;
  margin: 0.5em 0;
`;

export const Header = styled.h2`
  color: ${colors.softred};
  font-size: 2.2rem;
  line-height: 1.26;
  font-weight: normal;
  margin: 0.5em 0;
`;

export const Subheader = styled.h3`
  color: ${colors.softred};
  font-size: 1.58rem;
  line-height: 1.26;
  font-weight: normal;
  margin: 0.5em 0;
`;

export const Link = ({ to, children }) => (
  <NextLink href={to}>
    <ExternalLink>
      {children}
    </ExternalLink>
  </NextLink>
);

export const ExternalLink = styled.a`
  color: ${colors.midblue};
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

export const Button = styled.button`
  background: ${colors.midblue};
  color: white;
  border: 0;
  padding: 5px 20px;
  margin: 5px;
`;

export const Footer = styled.div`
  border-top: 1px solid ${colors.midgray};
  width: 25%;
  padding-top: 1em;
  margin: 2em;
  font-size: 75%;

  @media print {
    display: none;
  }
`;

export const SmallScreen = styled.div`
  @media (min-width: 430px) {
    display: none;
  }
`;

export const LargeScreen = styled.div`
  @media (max-width: 429px) {
    display: none;
  }
`;
