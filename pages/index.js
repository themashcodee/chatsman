import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../components/icons/Favicon'

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
      <section className="
      scrollable flex w-full flex-col items-center px-5 py-8 select-none">
        <h1 className="font-medium items-center text-center md:text-6xl text-5xl pb-4 flex">
          <span className="w-12 h-12 mr-2"><Logo /></span>
          Chatsman
        </h1>
        <p className="text-center font-medium text-2xl py-3">Talk to your friends and family with feature rich app Chatsman</p>
        <p className="text-center py-2">Add to home screen for better experience in mobile phone</p>

        <div className="relative w-full justify-center flex-wrap py-6 gap-4 flex">
          <div className="relative w-60 md:w-96">
            <Image src="/images/download1.png" alt="instruction" layout="responsive" width={720} height={543}></Image>
          </div>
          <div className="relative w-60 md:w-96">
            <Image src="/images/download2.png" alt="instruction" layout="responsive" width={720} height={543}></Image>
          </div>
        </div >

        <Link href="/signup" passHref={true} replace={true}><button className="
        w-full max-w-[300px] h-16 flex-shrink-0 mt-3 font-medium text-2xl rounded-xl text-white bg-blue-600
        ">
          Start Chatting
        </button>
        </Link>
      </section >
    </div >
  )
}
