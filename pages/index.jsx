import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Index = () => (
  <div className="container">
    <Head>
      <title>Next Auth</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>
      <h1 className="title">
        Welcome to
        {' '}
        <a href="https://nextjs.org">Next.js Auth!</a>
      </h1>

      <Link href="/home">
        <a>Home</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </main>
  </div>
);

export default Index;
