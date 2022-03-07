// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"></link>
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="apple-touch-icon" href="/icons/favicon.png"></link>
                    <meta name="theme-color" content="#FF9C9C" />

                    <meta name='application-name' content='Chatsman' />
                    <meta name='apple-mobile-web-app-capable' content='yes' />
                    <meta name='apple-mobile-web-app-status-bar-style' content='default' />
                    <meta name='apple-mobile-web-app-title' content='Chatsman' />
                    <meta name='description' content='Talk your friend and family with ease' />
                    <meta name='format-detection' content='telephone=no' />
                    <meta name='mobile-web-app-capable' content='yes' />
                    <meta name='msapplication-TileColor' content='#FF9C9C' />
                    <meta name='msapplication-tap-highlight' content='no' />

                    <link rel='apple-touch-icon' sizes='152x152' href='/icons/favicon-152.png' />
                    <link rel='apple-touch-icon' sizes='180x180' href='/icons/favicon-180.png' />
                    <link rel='apple-touch-icon' sizes='167x167' href='/icons/favicon-167.png' />

                    <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32.png' />
                    <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16.png' />
                    <link rel='mask-icon' href='/icons/favicon.svg' color='#FF9C9C' />
                    <link rel='shortcut icon' href='/icons/favicon.ico' />

                    <meta name='twitter:card' content='summary' />
                    <meta name='twitter:url' content='https://chatsman.vercel.com' />
                    <meta name='twitter:title' content='Chatsman' />
                    <meta name='twitter:description' content='Talk your friend and family with ease' />
                    <meta name='twitter:image' content='https://chatsman.vercel.com/icons/favicon.png' />
                    <meta name='twitter:creator' content='@themashcodee' />
                    <meta property='og:type' content='website' />
                    <meta property='og:title' content='Chatsman' />
                    <meta property='og:description' content='Talk your friend and family with ease' />
                    <meta property='og:site_name' content='Chatsman' />
                    <meta property='og:url' content='https://chatsman.vercel.com' />
                    <meta property='og:image' content='https://chatsman.vercel.com/icons/favicon.png' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;