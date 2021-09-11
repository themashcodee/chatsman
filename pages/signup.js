import React from 'react'
import Head from 'next/head'
import Header from '../components/signupNin/Header'
import RedirectSection from '../components/signupNin/RedirectSection'
import SignupForm from '../components/signupNin/SignupForm'

export default function Signup() {
    return (
        <>
            <Head>
                <title>Chatsman | Sign Up</title>
                <meta name="description" content="A simple chatting web application" />
                <link rel="shortcut icon" href="/favicon.png" />
            </Head>
            <section className="flex h-screen relative w-full flex-col items-center bg-cwhite-light dark:bg-cblack-2">
                <Header />
                <RedirectSection label={"Sign Up"} switchTo={"Sign In"} link={"/signin"} line={"Already have an account? "} />
                <SignupForm />
            </section>
        </>
    )
}