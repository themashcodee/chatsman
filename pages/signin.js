import React from 'react'
import Head from 'next/head'
import Header from '../components/signupNin/Header'
import RedirectSection from '../components/signupNin/RedirectSection'
import SigninForm from '../components/signupNin/SigninForm'

export default function Signup() {
    return (
        <>
            <Head>
                <title>Chatsman | Sign In</title>
                <meta name="description" content="Talk your friend and family with ease" />
                <link rel="shortcut icon" href="/icons/favicon.png" />
            </Head>
            <section className="flex h-screen w-full flex-col items-center bg-cwhite-light dark:bg-cblack-2">
                <Header />
                <RedirectSection label={"Sign In"} switchTo={"Sign Up"} link={"/signup"} line={"Don't have an account? "} />
                <SigninForm />
            </section>
        </>
    )
}