import React from 'react';
import Document, {
  Html, Main, NextScript, Head
} from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script src="http://localhost:5500/socket.io/socket.io.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}