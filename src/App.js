import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Page,
  HeaderBar,
  HeaderLogo,
  HeaderItemLeft,
  HeaderIntern,
  Footer,
  Link,
} from "./DRKStyle";
import HomePage from "./HomePage";
import AppPage from "./AppPage";
import MapPage from "./map_page/MapPage";
import LinkPage from "./LinkPage";
import ImpressumPage from "./ImpressumPage";

export default function App() {
  return (
    <Router>
      <Page>
        <HeaderBar>
          <HeaderItemLeft>
            <HeaderLogo to="/" />
            <HeaderIntern>Interner Bereich</HeaderIntern>
          </HeaderItemLeft>
        </HeaderBar>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/app">
            <AppPage />
          </Route>
          <Route path="/map">
            <MapPage />
          </Route>
          <Route path="/links">
            <LinkPage />
          </Route>
          <Route path="/Impressum">
            <ImpressumPage />
          </Route>
        </Switch>

        <Footer>
          <Link to="/impressum">Impressum</Link>
        </Footer>
      </Page>
    </Router>
  );
}
