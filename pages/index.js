import React, { useContext, useEffect } from 'react'
import Head from 'next/head'

// AUTH RELATED
import Loading from '../components/Loading'
import { useRouter } from 'next/router'
import { StoreContext } from './_app'

export default function Index() {

  const router = useRouter()
  const { USER: { user } } = useContext(StoreContext);
  useEffect(() => {
    if (user) router.replace('/home')
  }, [user, router])

  if (user) return <>
    <Head>
      <title>Chatsman</title>
      <meta name="description" content="Talk your friend and family with ease" />
      <link rel="icon" href="/icons/favicon.png" />
    </Head>
    <Loading />
  </>

  return (
    <div className="">
      <Head>
        <title>Chatsman</title>
        <meta name="description" content="Talk your friend and family with ease" />
        <link rel="shortcut icon" href="/icons/favicon.png" />
      </Head>
      <h1 className="text-4xl text-red-300">Chatsman Beta</h1>
      <h1 className="text-4xl text-red-300">Site is being under construction</h1>
    </div>
  )
}
