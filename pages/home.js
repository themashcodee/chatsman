import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import Chatlist from '../components/Chatlist/Chatlist'
import Chatsection from '../components/Chatsection/Chatsection'

// AUTH RELATED
import Loading from '../components/Loading'
import { useRouter } from 'next/router'
import { StoreContext } from './_app'

export default function Home() {

    const router = useRouter()
    const { USER: { user } } = useContext(StoreContext);
    useEffect(() => {
        if (!user) router.replace('/signin')
    }, [user, router])
    if (!user) {
        return <>
            <Head>
                <title>Chatsman | Home</title>
                <meta name="description" content="A simple chatting web application" />
                <link rel="icon" href="/icons/favicon.png" />
            </Head>
            <Loading />
        </>
    }

    return (
        <>
            <Head>
                <title>Chatsman | Home</title>
                <meta name="description" content="Talk your friend and family with ease" />
                <link rel="shortcut icon" href="/icons/favicon.png" />
            </Head>
            <section className="flex h-screen w-full max-w-screen-2xl mx-auto">
                <Chatlist />
                <Chatsection />
            </section>
        </>
    )
}