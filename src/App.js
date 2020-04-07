import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Page, Menu, MenuLink } from './DRKStyle';
import HomePage from './HomePage';
import AppPage from './AppPage';
import MapPage from './MapPage';

export default function App () {
  return (
    <Router>
      <Page>
        <Menu>
          <MenuLink to="/">Übersicht</MenuLink>
          <MenuLink to="/app">Alarm-App</MenuLink>
          <MenuLink to="/map">Karte</MenuLink>
        </Menu>
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
