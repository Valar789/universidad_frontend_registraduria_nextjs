import { useEffect, useState } from "react";

import "../styles/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import { SessionProvider } from "next-auth/react";
import Head from "next/head";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("../public/js/scripts.js");
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  const session = false;
  return (
    <>
      <Head>
        <title>Registraduria</title>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
