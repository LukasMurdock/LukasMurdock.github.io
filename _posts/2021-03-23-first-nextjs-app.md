---
layout: post
title: 'Reflections on my first Next JS App'
description: ""
date: March 23, 2021
---

Next.js is *hot* right now ([See usage statistics](https://trends.builtwith.com/framework/Next.js)). Two of the [chrome extensions](https://lukasmurdock.com/chrome-extensions/)  I use tell me what technology a website uses and I’m seeing an increasing split between Next.js and Webflow. Next.js is a React.js framework for apps and it is owned by Vercel. And Webflow is a no-code tool to build websites.

For clarity, they’re not exactly competing products and I was not considering Webflow for building an app. I was mentioning it as another service I’m seeing more frequently.

Here are some technologies that are used to build web applications:
- Node.js
- Ember.js
- AngularJS
- Vue.js
- React.js
- Next.js
- Ruby
- Rails
- PHP
- ASP.NET
- Java

There are a lot of JavaScript frameworks for building web applications because it’s the biggest ecosystem of all.

But as a newcomer to the world of app building, the biggest reason I chose Next.js is [Lee Robinson](https://leerob.io/). As of writing, Lee Robinson works at Vercel as a Solutions Architect and has created two online courses for Next.JS:

1. [Mastering Next.js](https://masteringnextjs.com/)
2. [React 2025](https://react2025.com/)

And the stack used for React 2025 is the exact stack that was needed for this project. All the roads pointed to Next.js for me.

## The Stack

The stack that I walked into originally had a PHP application and as great as PHP is, I think the future prefers Next.js.

- Database: Firebase Firestore
- Auth: Firebase Auth
- CMS: Google Sheets
- Application: PHP → Next.js

### What does everything do?

Next.js handles the website side of things, where you can load a page and navigate to others. But how do we let people log in and view data we have stored on their campaigns? Enter Firebase. 

Firebase is a separate service provided by Google that we can call in our Next.js application. Firestore is a database within Firebase that utilizes JSON-like document data models. A document data model is like a bunch of Google Documents stored in a Google Drive folder, and we can have each document contai information on a single user.

Here’s a simplified version of how to use Firebase and Next.js to auth users:
1. A user submits the sign up form with email and password in our Next.js app.
2. In our Next.js app we call Firebase and tell them the email and password and Firebase replies “Alright, we’ve added this user to your list.” (We call this authentication)
3. Since we know the user is on the list (since we just added them) we “log them in”. (We call this authorization)
4. We do some fancy magic and tell the users browser (e.g. Chrome) to remember that this user is logged in so they don‘t have to login every time the page loads. (This is a cookie!)
5. We load up a dashboard page and call Firebase to ask, “Hey, do we have data on this person?” And if we have data, we can display it and if we don’t, we can show the user something else.

This is pretty much how modern web applications work:
1. The user loads a page or component
2. The application makes a call to another service to get some data
3. That data shapes the page or component

Now in this case, the Content Management System (CMS) is Google Sheets and another person has set up a separate backend that effectively syncs the Google Sheet to the Firebase database. So for now I don’t have to worry about connecting to a separate CMS.

## What is the difference between Next.js and React.js?

I’ll start by explaining the biggest one: it’s the difference between client-side and server-side applications.

A React app is a “single-page application,” meaning that even though the URL at the top of the browser may change, the page doesn’t actually change or reload! The big idea is that unlike a site (this one for example) where every page is disconnected and loads an entire new page, web applications can change data without reloading the page. And this is all done “client-side” meaning in the users browser.

A Next app is a framework based on React to build Node.js server-side applications. This brings the advantages of React in building user interfaces alongside page to page navigation. It also enables server-side rendering so page content can be rendered on a server instead of the users browser. Hence “server-side”.

In looking back on building this application I can *feel* the shift from a [front-of-the-front-end developer](https://bradfrost.com/blog/post/front-of-the-front-end-and-back-of-the-front-end-web-development/) to a front end developer.


## What I Know Now

Building this gave me a much better [understanding of web development](https://lukasmurdock.com/starting-web-development/). 

This is some valuable things I’ve learned:

1. Next.js
    - Next.js custom webpack configuration for plugins
2. React
3. ESLint (Note: I was already using Prettier)
4. E2E testing with Cypress