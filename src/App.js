import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Page, HeaderBar, HeaderLogo, HeaderItem } from './DRKStyle';
import { Menu, MenuLink } from './Menu';
import HomePage from './HomePage';
import AppPage from './AppPage';
import MapPage from './map_page/MapPage';
import LinkPage from './LinkPage';
import ImpressumPage from './ImpressumPage';

export default function App () {
  return (
    <Router>
      <Page>
        <HeaderBar>
          <HeaderItem>
            <HeaderLogo to="/" />
          </HeaderItem>
          <HeaderItem>
            <Menu>
              <MenuLink to="/app">Alarm-App</MenuLink>
              <MenuLink to="/map">Karte</MenuLink>
              <MenuLink to="/links">Linksammlung</MenuLink>
              <hr/>
              <MenuLink to="/impressum">Impressum</MenuLink>
            </Menu>
          </HeaderItem>
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
      </Page>
    </Router>
  );
}
