import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/setting/Header';
import Profile from '../components/setting/Profile';
import Options from '../components/setting/Options';

export default function Setting() {
    return (
        <>
            <Head>
                <title>Chatsman | Setting</title>
                <meta name="description" content="A simple chatting web application" />
                <link rel="icon" href="/favicon.png" />
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