import React, { useContext, useEffect } from 'react'
import Head from 'next/head'

// AUTH RELATED
import Loading from '../components/Loading'
import { useRouter } from 'next/router'
import { StoreContext } from './_app'

export default function Index() {

  // AUTH RELATED
  const router = useRouter()
  const { USER: { user } } = useContext(StoreContext);
  useEffect(() => {
    if (user) router.replace('/home')
  }, [user, router])

  if (user) return <Loading />

  return (
    <div className="">
      <Head>
        <title>Chatsman</title>
        <meta name="description" content="A simple chatting web application" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <h1 className="text-4xl text-red-300">Chatsman</h1>
    </div>
  )
}
