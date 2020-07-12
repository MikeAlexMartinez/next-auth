import React from 'react';
import Link from 'next/link';

const Login = () => (
  <div>
    Login
    <Link href="/home">
      <a>Home</a>
    </Link>
    <Link href="/">
      <a>Next Auth</a>
    </Link>
  </div>
);

export default Login;
