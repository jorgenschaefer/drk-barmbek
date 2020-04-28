import React from "react";
import { Content, Title, ExternalLink } from './DRKStyle';


export default function HomePage() {
  return (
    <Content>
      <Title>DRK Bereitschaft Barmbek</Title>

      <p>
        Dies sind die internen Seiten der DRK Bereitschaft Barmbek. Für offizielle Informationen besuchen
        Sie <ExternalLink href="https://drk-hamburg-nordost.de/">die Seiten unseres Heimatkreisverbandes</ExternalLink>.
      </p>
    </Content>
  );
}
