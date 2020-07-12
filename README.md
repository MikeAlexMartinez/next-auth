# Next-Auth

This is a basic next-js application example that allows a user to login and logout of a basic web application.

For authentication the app will make use of a basic authentication service that provides two endpoints, those being a login endpoint and a verifyToken endpoint.

The login endpoint provides a JWT upon successful login.

To verify a tokens validity, the JWT provided by the login endpoint should be provided on an Authorization header.

I won't be using nextjs' built in api routes for this project.

## Plan

To demonstrate login and logout functionality the application will have three pages:
1. Landing page / index page - Auth not required
2. Login Page
3. Home Page - A users homepage, which will require authentication.

### Landing Page

Must have: This page will have a simple logo in the middle of the page, and a link in the top right of the page to login.
Nice to have: If the user is already logged in the page will have a component show user icon with link to settings, home page or logout.

### Login Page

Must haves:
- A smaller logo with link to get back to landing page
- Two inputs, one for a username, and one for the password,
- Button to submit the form.

Nice to haves:
- If user is redirected to login form from protected route (home page) message should be displayed to tell user they need to login.
- If user enters invalid username or password message should display.

### Home Page

Must Haves:
- A message to say hello to the user with their name displayed.
- A button to allow the user logout
- A link to get back to the landing page.

## Auto-generated content below

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
