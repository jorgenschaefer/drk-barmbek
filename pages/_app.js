import React from "react";
import Head from 'next/head';

import {
  Page,
  HeaderBar,
  HeaderLogo,
  HeaderItemLeft,
  HeaderItemRight,
  HeaderIntern,
  Footer,
  Link,
  SmallScreen,
  LargeScreen,
} from "@barmbek/DRKStyle";

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Head>
        <title>DRK Barmbek</title>
      </Head>
      <HeaderBar>
        <HeaderItemLeft>
          <HeaderLogo to="/" />
        </HeaderItemLeft>
        <HeaderItemRight>
          <SmallScreen>
            <HeaderIntern>Intern</HeaderIntern>
          </SmallScreen>
          <LargeScreen>
            <HeaderIntern>Interne Seite</HeaderIntern>
          </LargeScreen>
        </HeaderItemRight>
      </HeaderBar>
      <Component {...pageProps} />
      <Footer>
        <Link to="/impressum">Impressum</Link>
      </Footer>
    </Page>
  );
}

export default MyApp;
