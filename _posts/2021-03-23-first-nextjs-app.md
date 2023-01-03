---
layout: post
title: 'Reflections on my first Next JS App'
description: ""
date: March 23, 2021
tags: dev
---

Next.js seems to be soaring in popularity at the moment ([See usage statistics](https://trends.builtwith.com/framework/Next.js)).

I use a few [chrome extensions](https://lukasmurdock.com/chrome-extensions/) to see what technology the websites I visit use and I’m seeing an increasing usage of both Next.js and Webflow.

Next.js is a React.js framework for apps maintained by Vercel. And Webflow is a no-code tool to build websites. They’re not exactly competing products, but it does seem like many websites are using either,or.

There are seemingly endless technologies used to build web applications. Over the last decade, the JavaScript ecosystem got busy building frameworks and libraries. The largest ecosystem of open source libraries in the world are in JavaScript.

New to the world of app building, the biggest reason I chose Next.js is [Lee Robinson](https://leerob.io/). As of writing, Lee Robinson works at Vercel as a Solutions Architect and has created two online courses for Next.JS:

1. [Mastering Next.js](https://masteringnextjs.com/)
2. [React 2025](https://react2025.com/)

And the stack used for React 2025 is the exact stack that was needed for this project. All the roads pointed to Next.js for me.

## The Stack

The previous technology stack had the website built with Wix, the portal built with a young PHP project hosted through Host Gator, and Cloud Firestore as the database.

- Database: Cloud Firestore
- Auth: Firebase Auth
- Application: PHP → Next.js
- Website: Wix → Next.js

### What does everything do?

Next.js is a “production React framework.” React is a JavaScript library for building user interfaces–it handles all the logic needed to build a website and portal interface. Next.js provides file-system routing, hybrid static-site-generation and server-side-rendering, API routes, code-splitting and much more.

Firebase is Google’s mobile platform to quickly develop apps. The Firebase product line includes a bunch of things, but for this project we’re primarily concerned with Cloud Firestore and Authentication.

Firebase Authentication is used in the Next.js application to create and authenticate users. Firestore is a NoSQL database; using JSON-like document data model. A document data model is like a bunch of Google Documents stored in a Google Drive folder, and we can have each document contain information on a single user.

Here’s a simplified version of how to use Firebase and Next.js to auth users:
1. A user submits the sign up form with email and password in our Next.js app.
2. In our Next.js app we call Firebase Authentication and tell them the email and password and Firebase replies “Alright, we’ve added this user to your list.” (We call this authentication)
3. Since we know the user is on the list (since we just added them) we “log them in”. (We call this authorization)
4. We do some fancy magic and tell the users browser (e.g. Chrome) to remember that this user is logged in so they don‘t have to login every time the page loads. (This is a cookie!)
5. We load up a dashboard page and call Firebase to ask, “Hey, do we have data on this person?” And if we have data, we can display it and if we don’t, we can show the user something else.

This is pretty much how modern web applications work:
1. The user loads a page or component
2. The application makes a call to another service to get some data
3. That data shapes the page or component

## What is the difference between Next.js and React.js?

I’ll start by explaining the biggest one: it’s the difference between client-side and server-side applications.

A React app is a “single-page application,” meaning that even though the URL at the top of the browser may change, the page doesn’t actually change or reload! The big idea is that unlike a site (this one for example) where every page is disconnected and loads an entire new page, web applications can change data without reloading the page. And this is all done “client-side” meaning in the users browser.

A Next app is a framework based on React to build Node.js server-side applications. This brings the advantages of React in building user interfaces alongside page to page navigation. It also enables server-side rendering so page content can be rendered on a server instead of the users browser. Hence “server-side”.

In looking back on building this application I can *feel* the shift from a [front-of-the-front-end developer](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/) to a front end developer.


## What I Know Now

Building this gave me a much better [understanding of web development](https://lukasmurdock.com/starting-web-development/).

Here are some valuable things I’ve learned since:

1. Next.js
    - Next.js custom webpack configuration for plugins
2. React
3. ESLint (Note: I was already using Prettier)
4. E2E testing with Cypress
