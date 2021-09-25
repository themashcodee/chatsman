import React, { useContext, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/blocklist/Header';
import Card from '../components/blocklist/Card'

// AUTH RELATED
import Loading from '../components/Loading'
import { useRouter } from 'next/router'
import { StoreContext } from './_app'

export default function BlockedUsers() {

    const router = useRouter()
    const { USER: { user, setUser } } = useContext(StoreContext);
    useEffect(() => {
        if (!user) router.replace('/signin')
    }, [user, router])
    if (!user) {
        return <>
            <Head>
                <title>Chatsman | Blocked Users</title>
                <meta name="description" content="Talk your friend and family with ease" />
                <link rel="icon" href="/icons/favicon.png" />
            </Head>
            <Loading />
        </>
    }

    return (
        <>
            <Head>
                <title>Chatsman | Blocked Users</title>
                <meta name="description" content="Talk your friend and family with ease" />
                <link rel="shortcut icon" href="/icons/favicon.png" />
            </Head>
            <section className="flex h-screen flex-col w-full select-none">
                <Header />
                <div className="w-full scrollable flex items-center sm:items-start flex-wrap flex-col p-4">
                    {user.blocked.length ?
                        user.blocked.map(id => <Card key={id} id={id} userId={user.id} setUser={setUser} />)
                        : <div className="text-cwhite-darker dark:text-cblack-5 font-medium text-2xl">No blocked user found</div>
                    }
                </div>
            </section>
        </>
    )
}