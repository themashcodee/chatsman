import React from 'react'
import Head from 'next/head'
import Chatlist from '../components/Chatlist/Chatlist'
import Chatsection from '../components/Chatsection/Chatsection'

export default function Home() {
    return (
        <>
            <Head>
                <title>Chatsman | Home</title>
                <meta name="description" content="A simple chatting web application" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <section className="flex h-screen w-full">
                <Chatlist />
                <Chatsection />
            </section>
        </>
    )
}