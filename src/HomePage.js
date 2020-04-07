import React from "react";
import { Content, Title, Header, Subheader, Link } from './DRKStyle';


export default function HomePage() {
  return (
    <Content>
      <Title>DRK Barmbek</Title>
      <Header>Überschrift</Header>
      <Subheader>Unterüberschrift</Subheader>
      <Link to="/app">App</Link>
      <div>Normaler Text</div>
    </Content>
  );
}
