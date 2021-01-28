import React from "react";

import { Content, Title, ExternalLink } from "./DRKStyle";
import { TileList, Tile } from "./TileStyle";

export default function HomePage() {
  return (
    <Content>
      <Title>DRK Bereitschaft Barmbek</Title>

      <p>
        Dies sind die internen Seiten der DRK Bereitschaft Barmbek. Für
        offizielle Informationen besuchen Sie{" "}
        <ExternalLink href="https://drk-hamburg-nordost.de/">
          die Seiten unseres Heimatkreisverbandes
        </ExternalLink>
        .
      </p>

      <TileList>
        <Tile to="/app" icon="🚨">
          <b>Alarm-App</b>
          <p>
            Eine App für dein Telefon, um über Alarmierungen benachrichtigt zu
            werden.
          </p>
        </Tile>
        <Tile to="/map" icon="🌎">
          <b>Lageplan</b>
          <p>Eigene Karten mit Koordinaten für Einsätze.</p>
        </Tile>
        <Tile to="/links" icon="🔗">
          <b>Linksammlung</b>
          <p>Nützliche Links für die Arbeit in der Bereitschaft.</p>
        </Tile>
      </TileList>
    </Content>
  );
}
