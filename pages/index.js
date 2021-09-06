import Head from 'next/head'

export default function Index() {
  return (
    <div className="">
      <Head>
        <title>Chatsman</title>
        <meta name="description" content="A simple chatting web application" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <h1 className="text-4xl text-red-300">Check Authentication</h1>
    </div>
  )
}
