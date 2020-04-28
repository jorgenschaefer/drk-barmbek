import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Page, HeaderBar, HeaderLogo } from './DRKStyle';
import { Menu, MenuLink } from './Menu';
import HomePage from './HomePage';
import AppPage from './AppPage';
import MapPage from './map_page/MapPage';

export default function App () {
  return (
    <Router>
      <Page>
        <HeaderBar>
          <HeaderLogo to="/" />
          <Menu>
            <MenuLink to="/app">Alarm-App</MenuLink>
            <MenuLink to="/map">Karte</MenuLink>
          </Menu>
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
        </Switch>
      </Page>
    </Router>
  );
}
