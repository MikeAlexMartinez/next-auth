import React from 'react';
import Link from 'next/link';

const Home = () => (
  <div>
    Home
    <Link href="/">
      <a>Next Auth</a>
    </Link>
    <Link href="/login">
      <a>Login</a>
    </Link>
  </div>
);

export default Home;
