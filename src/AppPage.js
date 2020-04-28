import React from "react";
import { Content, Title } from './DRKStyle';

export default function AppPage() {
  return (
    <Content>
      <Title>DRK Alarm App</Title>

      <p>
        Mit der DRK Alarm App erhälst du Alarmmeldungen mit wenig Aufwand.
        Die Installation erfolgt nicht über den PlayStore, so dass mehrfach
        bestätigt werden muss, dass die App wirklich installiert werden soll.
      </p>

      <p>
        Die App existiert nur für Android. Für iPhone existiert keine
        entsprechende Lösung.
      </p>

      <a href="/download/DRKAlarm.apk">
        <img src="/google-play-badge.png" style={{ width: "150px" }} alt="Download App"/>
      </a>
    </Content>
  )
}
