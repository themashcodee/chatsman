import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/setting/Header';
import Profile from '../components/setting/Profile';
import Options from '../components/setting/Options';

// AUTH RELATED
import Loading from '../components/Loading'
import { useRouter } from 'next/router'
import { StoreContext } from './_app'

export default function Setting() {

    // AUTH RELATED
    const router = useRouter()
    const { USER: { user } } = useContext(StoreContext);
    useEffect(() => {
        if (!user) router.replace('/signin')
    }, [user, router])
    if (!user) {
        return <>
            <Head>
                <title>Chatsman | Setting</title>
                <meta name="description" content="Talk your friend and family with ease" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Loading />
        </>
    }
    // AUTH RELATED END


    return (
        <>
            <Head>
                <title>Chatsman | Setting</title>
                <meta name="description" content="Talk your friend and family with ease" />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
            <section className="flex h-screen flex-col w-full">
                <Header />
                <div className="w-full scrollable flex items-center flex-col">
                    <Profile />
                    <Options />
                </div>
            </section>
        </>
    )
}