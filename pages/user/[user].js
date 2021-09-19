import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useQuery } from '@apollo/client'
import { GET_USER } from '../../graphql/queries/index'

import Header from '../../components/profile/Header'
import Profile from '../../components/profile/Profile'
import Loading from '../../components/Loading'

export default function Index() {

    const router = useRouter()
    const { user: username } = router.query
    const { data, error, loading } = useQuery(GET_USER, {
        variables: { username },
    });

    if (error) return 'There is some server error, try again later.'
    if (loading) return <Loading />

    return (
        <div className="">
            <Head>
                <title>Chatsman | {username}</title>
                <meta name="description" content="A simple chatting web application" />
                <link rel="shortcut icon" href="/icons/favicon.png" />
            </Head>
            {
                data.getUser.success ? <section className="flex h-screen flex-col w-full">
                    <Header />
                    <div className="w-full scrollable flex items-center flex-col">
                        <Profile user={data.getUser.user} />
                    </div>
                </section>
                    : <section className="flex h-screen flex-col w-full">
                        <Header />
                        <h1 className="font-medium text-cred-dark py-8 text-center text-4xl">No User Found</h1>
                    </section>
            }
        </div>
    )
}
