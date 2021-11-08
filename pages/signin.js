import React, { useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import Header from '../components/signupNin/Header'
import RedirectSection from '../components/signupNin/RedirectSection'
import SigninForm from '../components/signupNin/SigninForm'

import { LOGIN_USER } from "../graphql/mutations/index";
import { useMutation } from "@apollo/client";

import { useRouter } from 'next/router'
import Loading from '../components/Loading'
import { StoreContext } from './_app'

export default function Signup() {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [loginUser, { error }] = useMutation(LOGIN_USER);

    const router = useRouter()
    const { USER: { user } } = useContext(StoreContext);
    useEffect(() => {
        if (user) router.replace('/home')
    }, [user, router])
    if (user) return <>
        <Head>
            <title>Chatsman | Sign In</title>
            <meta name="description" content="Talk your friend and family with ease" />
            <link rel="icon" href="/icons/favicon.png" />
        </Head>
        <Loading />
    </>

    async function login(e) {
        setIsSubmitting(true);
        try {
            const result = await loginUser({
                variables: { email: process.env.TEST_USER_EMAIL, password: process.env.TEST_USER_PASSWORD, secret: +process.env.TEST_USER_SECRET },
            });

            if (error) {
                setIsSubmitting(false);
                return alert("There is some server error, try again later.");
            }

            const { message, success } = result.data.loginUser;
            if (!success) {
                setIsSubmitting(false);
                return alert(message);
            }

            localStorage.setItem("token", result.data.loginUser.token);

            setIsSubmitting(false);

            router.reload();
        } catch (err) {
            setIsSubmitting(false);
            alert("There is some server error, try again later");
        }
    }

    return (
        <>
            <Head>
                <title>Chatsman | Sign In</title>
                <meta name="description" content="Talk your friend and family with ease" />
                <link rel="shortcut icon" href="/icons/favicon.png" />
            </Head>
            <section className="flex w-full pb-5 flex-col items-center bg-cwhite-light dark:bg-cblack-2">
                <Header />
                <RedirectSection label={"Sign In"} switchTo={"Sign Up"} link={"/signup"} line={"Don't have an account? "} />
                <button onClick={login} className="w-[90%] max-w-sm rounded h-10 border dark:border-cblack-5 border-cwhite-darker my-3">{
                    isSubmitting ? "Logging in..." : "Sign In as a Test User"}
                </button>
                <SigninForm />
            </section>
        </>
    )
}