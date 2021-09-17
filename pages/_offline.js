import Head from 'next/head'

export default function Offline() {
    return (
        <>
            <Head>
                <title>Chatsman</title>
                <meta name="description" content="A simple chatting web application" />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
            <section className="flex h-screen w-full max-w-screen-2xl mx-auto">
                You are offline
            </section>
        </>
    )
}