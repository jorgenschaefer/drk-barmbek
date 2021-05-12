import React, { useState } from "react";
import Head from 'next/head';
import type { AppProps } from "next/app";

import AuthorizationRequired from "@barmbek/AuthorizationRequired";
import useLocalStorage from "@barmbek/useLocalStorage";
import {
  Page,
  HeaderBar,
  HeaderLogo,
  Footer,
  Link,
  Content,
} from "@barmbek/DRKStyle";
import ImpressumPage from './impressum';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isAuthorized, setIsAuthorized] = useLocalStorage('isAuthorized', false);

  return (
    <Page>
      <Head>
        <title>DRK Barmbek</title>
      </Head>
      <HeaderBar>
        <HeaderLogo to="/" />
      </HeaderBar>
      <Content>
        { (isAuthorized || Component === ImpressumPage)
          ? <Component {...pageProps} />
          : <AuthorizationRequired onAuthorize={() => setIsAuthorized(true)} /> }
      </Content>
      <Footer>
        <Link to="/impressum">Impressum</Link>
      </Footer>
    </Page>
  );
}
