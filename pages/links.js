import React from "react";
import { Content, Title, ExternalLink, Header } from "@barmbek/DRKStyle";

export default function LinkPage() {
  return (
    <Content>
      <Title>Linksammlung</Title>
      <Header>Wichtigste Adressen</Header>
      <ul>
        <li>
          <ExternalLink href="https://drk-hh-nordost.slack.com/">
            Slack
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="http://hhn.hiorg-server.de/">
            HiOrg-Server
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://plato.lv-hamburg.drk.de/">
            PLATO (Ausbildungen am Landesverband)
          </ExternalLink>
        </li>
      </ul>
      <Header>Aus- und Fortbildungen</Header>
      <ul>
        <li>
          <ExternalLink href="https://www.erste-hilfe-hamburg.org/">
            Erste-Hilfe-Kurs Anmeldungen
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.drk-lerncampus.de/">
            DRK Lerncampus
          </ExternalLink>
        </li>
      </ul>
      <Header>Sanitätsdienste</Header>
      <ul>
        <li>
          <ExternalLink href="http://domplan.drk-altona-mitte.de/">
            DOM-Anmeldungen
          </ExternalLink>
        </li>
      </ul>
      <Header>Orga-Arbeit Bereitschaft Barmbek</Header>
      <ul>
        <li>
          <ExternalLink href="https://trello.com/drkbarmbekuhlenhorst/home">
            Trello für Orga-Arbeit
          </ExternalLink>
        </li>
      </ul>
      <Header>Verschiedenes</Header>
      <ul>
        <li>
          <ExternalLink href="https://www.drk-hamburg-nordost.de/">
            Homepage des KV
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.facebook.com/drkhamburgnordost/">
            Facebook-Page des KV
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.drk-intern.de/">
            Interner Bereich des DRK
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.rotkreuzshop.de/">
            Rotkreuz-Shop
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.drkservice.de/rahmenvertraege/">
            Rahmenverträge für Rotkreuzmitarbeiter
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://www.wecanhelp.de/moin-menschlichkeit">
            Einkaufen mit kostenfreier Spende an den KV
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href="https://smile.amazon.de/ch/17-413-00288">
            Einkaufen bei Amazon mit kostenfreier Spende an den KV
          </ExternalLink>
        </li>
      </ul>
    </Content>
  );
}
