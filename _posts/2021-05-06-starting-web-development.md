---
layout: post
title: 'Starting Web Development'
description: "An introduction to web development."
date: May 06, 2021
last_modified_at: 2021-05-06T19:35:12+0000
code: true
tags: dev
---

Here’s my introduction to web development. I’ll continue working on this over time and hopefully it becomes as smooth as ice.



Elements of a web application stack:
* Code repository host
* Version Control System (VCS)
* Runtime
* Package manager
* Web framework
* CSS framework
* Bundler
* ORM
* Database
* Linter
* Formatter
* Test framework
* API Mock framework
* Host
* Secrets manager

Example stack:
* Code repository host: Github
* VCS: Git
* Runtime: Node.js
* Package manager: NPM
* Web framework: Remix
* CSS framework: Tailwind CSS
* Bundler: esbuild
* ORM: Prisma
* Database: SQLite
* Linter: ESLint
* Formatter: Prettier
* Test framework: Jest
* API mock framework: MSW
* Host: Vercel
* Secrets manager: Doppler

Example stack:
* Code repository host: Github
* VCS: Git
* Runtime: Python 3
* ORM: Flask-SQLAlchemy
* Database: Postgres
* Linter: Pylint
* Formatter: Black
* Host: Fly.io
* Secrets manager: Doppler

Backend concepts/areas:
* Executable runtime (e.g., Node, Deno, Python, .NET)
* Web server (E.g., Nginx/Apache/Caddy/Node)
* Email server (E.g., Nodemailer, or Postmark)
* Server network (E.g., AWS Lambda)
* Auth (E.g., Cookies, Tokens)
* Encryption
* Hashing (E.g., Argon2id)
* Caching
    * Server cache (E.g., LRU, Redis, Cloudflare)
    * Browser cache
* CORS
* CSRF
* Rate limiting
* Database
    * Query language (e.g., SQL)
* Search engine (E.g., Algolia, ElasticSearch, TypeSense)
* File system (E.g., Amazon EFS/S3)
* API design
    * Pagination
    * Filtering
* Service integrations
    * Database
    * Error monitoring (e.g., Sentry)
    * Email (e.g., Postmark)
    * Billing (e.g., Stripe)
* Queues (e.g., RabbitMQ, Kafka)
* Compression (e.g. Brotli)
* Testing

Frontend concepts/areas:
* Deployment platform
* HTML semantics
* JavaScript semantics
* JavaScript libraries
* CSS
* CSS framework
* Build tools
* User Interface design
* ARIA
* Web fonts
* Web security
* Performance Analytics
* Testing

For an overview, let’s divide web development into 7 parts.

Part 1: HTML and CSS
Part 2: CSS frameworks
Part 3: JS and DOM
Part 4: Git and GitHub
Part 5: React / Angular / Vue
Part 6: Node.js (Backend)
Part 7: API and Database

## Languages of the Web

Web pages are really just that. *Pages*. They're documents, just like papers you've written in the past. Documents with heading levels, sections, paragraphs, and more. The web started with the idea of *linking* documents. So let's learn how to create a document.

We're going to create a file.

**If you’re on a Mac:**
Open up TextEdit → Save → Name it `index.html` → Click `Use .html`

**If you’re on Windows 10:**
Open up Notepad → Save as → `index.html` → Select UTF-8 in Encoding drop-down menu.

**HyperText Markup Langage (HTML)** was invented as a way to provide instruction for browsers, in the form of *markup*, on how to display elements.

{% highlight HTML %}
{% raw %}
<h1>Languages of the Web</h1>

<p>Web pages are really just that. <i>Pages</i>. They're documents, just like papers you've written in the past. Documents with heading levels, sections, paragraphs, and more. The web started with the idea of <i>linking</i> documents. So let's learn how to create a document.</p>
{% endraw %}
{% endhighlight %}

(Sidenote: Sir Tim Berners-Lee invented HTML at CERN sometime in the ’90s. Then the Internet Engineering Task Force primarily maintained HTML until the creation of the World Wide Web Consortium (W3C) in 1995. And HTML5 is the fifth and last major HTML version from W3C. The current specification is the [HTML Living Standard](https://html.spec.whatwg.org/multipage/) maintained by a group made up from various people from major browsers called the [Web Hypertext Application Technology Working Group (WHATWG)](https://whatwg.org/).)

Browsers like Google Chrome, Safari, and Firefox take HTML markup and render it to the screen. We can open our HTML file that we stored locally in our browser to see what it looks like.

Soon after HTML came **Cascading Style Sheets (CSS)** as a way to add styling (e.g. fonts, color, spacing) to HTML elements.

{% highlight HTML %}
{% raw %}
<h1 style="font-weight: 600; margin-bottom: 20px;">Languages of the Web</h1>

<p style="line-height: 1.4;">Web pages are really just that. <i>Pages</i>. They're documents, just like papers you've written in the past. Documents with heading levels, sections, paragraphs, and more. The web started with the idea of <i>linking</i> documents. So let's learn how to create a document.</p>
{% endraw %}
{% endhighlight %}

(Sidenote: Håkon Wium Lie, a coworker of Tim Berners-Lee invented CSS. The World Wide Web Consortium (W3C) maintains the [CSS specifications](https://www.w3.org/Style/CSS/current-work). CSS does not have a version as a whole like HTML or JS. All current CSS specifications have their own specific versions ranging from 1 to 4.)

Soon after that Brandon Eich created Mocha while at Netscape. It was renamed to LiveScript and then renamed again to JavaScript (JS) and released by Netscape and Sun Microsystems. "JavaScript" was licensed and trademarked to Oracle while also submitted to ECMA International for standardization. So while everyone calls it JavaScript, the official name is **ECMAScript (ES)**.

A few notes here:

1.  JavaScript and Java are two separate programming languages, but JavaScript and ECMAScript are the same thing.
2.  New releases of ECMAScript were numbered until the 6th release in 2015 referred to as ES6. ECMAScript is now named by year: ECMAScript 2015 ([ECMAScript 2021](https://tc39.es/ecma262/)).

At it's simplest, a website is simply an HTML file. You can add CSS to your HTML to make it look a little nicer and some JS to start scripting. To keep things more readable developers often link to separate CSS and JS files.


{% highlight HTML %}
{% raw %}
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <script src="/js/script.js"></script>
  </head>

  <body>
    <h1 style="font-weight: 600; margin-bottom: 20px;">Languages of the Web</h1>

    <p style="line-height: 1.4;">
    Web pages are really just that. <i>Pages</i>. They're documents, just like papers you've written in the past. Documents with heading levels, sections, paragraphs, and more. The web started with the idea of <i>linking</i> documents. So let's learn how to create a document.
    </p>
  </body>
</html>;
{% endraw %}
{% endhighlight %}

HTML defines the document structure and CSS applies the styling. JavaScript enables everything you’ve seen a web page do anything other than just sit there — content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc.

<!-- https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript -->

So now we have an HTML file (and possibly some CSS and JS files). How do we get these on the web? What we have is referred to as a Static Site because the HTML, CSS, and JavaScript are pre-built.

Most people pay for hosting and a domain name:

-   Web hosting is rented file space on a company's web server where you can store your files for the web server to provide to website visitors.
-   A domain name is a unique address we rent from domain registrars to make it easier for people to find our website e.g.: https://lukasmurdock.com/

[Netlify](https://app.netlify.com/drop) offers a Drag & Drop hosting solution to getting our site online.

Now that we have some code, let's learn how to save it! If you've ever worked in Google Docs and viewed the version history of changes, that's what we're looking to have! Web developers use the **git version control system** to track changes in code. The most popular tool for this is **GitHub**.

For clarification, Git is the revision control tool, whereas GitHub is an online store for git repositories.

GitHub provides a code hosting platform for version control and collaboration, just like we saw in Google Docs. Note that Github is for code hosting, not web hosting (although they do have a web hosting service). So GitHub is not for viewing your site like we did before, GitHub is for viewing and storing the version history of your code.

---

Now, it's really annoying when you have to repeat all that HTML for every new page you create. So web developers have built tools to help with that, but first I'm going to introduce you to the developers App Store. You see, before the first Graphical User Interface, everyone installed, upgraded, and configured things though a Command-line Interface (CLI), often referred to as the **terminal**.

Just like you’re used to the App Store managing the installation, upgrading, and configuring of applications, developers utilize **package managers** through the terminal to do the same thing.

There are package managers for installing ready to use software like youtube-dl, a CLI for downloading videos from YouTube. The most common package manager on Mac is [Homebrew](https://brew.sh/), and if you're developing on Mac, you'll probably end up installing it at some point.

Then, there are package managers for installing pieces of functionality often called libraries or frameworks to build your own application. These package managers make up the **development environment**. Because if you want to run the software on another computer, you'll have to install the packages your application uses through a package manager.

Different languages have different development environments, (and there are multiple package managers you can use within a single language). For example, here are a few different languages:

-   Ruby (main package manager: Bundler)
-   Java (main package manager: Maven)
-   Python (main package manager: Pipenv)
-   JavaScript (main package manager: NPM)

Okay, now that we know about developer App Stores, it's time to explore our options. What we're looking for is a tool to easily template our HTML, CSS, and JS for us and make it so we don't have to write all of our content in HTML. Because if we had to write all of our content in HTML, we'd never get anywhere!

There's an entire category of tools referred to as Static Site Generators (SSGs). We already know what static sites are, you've just made one. Now, that site is clearly not YouTube or Twitter.

Static Sites send the same pre-built HTML, CSS, and JS files to every visitor. Dynamic sites *don't do that*. Dynamic Sites render the HTML, CSS, and JS on the server for every visit; every time we visit YouTube we'll see something different. These websites are no longer the simple static document that we started with!

Now, there is a vast selection of SSGs across pretty much any language. The selection of languages means that while we'll always be writing HTML, CSS, and JS, the language that we *template* them with is up to you.

I personally started with, and still use for my personal site, an SSG called Jekyll. Jekyll is built in Ruby and templates are written in Liquid. To use Jekyll you have to configure a Ruby development environment.

But there's [a whole lot of SSGs to choose from](https://jamstack.org/generators/).

As JavaScript has taken over popular development, we’ll be looking to install a tool developers use to run JavaScript outside of a browser: **Node**. Node.js is designed as a JavaScript back-end to execute JavaScript outside of a browser.

While you can install Node with Homebrew on Mac, [Volta](https://volta.sh/) is designed specifically to be a hassle-free JavaScript tool manager. So I recommend installing Node with Volta.

Node comes with it's own package manager called **Node Package Manager (NPM)**. From here on out it's pretty much going to be all NPM.

---

**Practice Project**

Our current toolchain looks like this:
- IDE (I mean, you can use whatever, but I use VS Code)
- Package Manager (NPM)
- Web Framework (Next.js)
- Code Formatting (Prettier)
- Transformation (PostCSS)
- CSS Framework (Tailwind CSS)
- Version Control (Github)
- Testing (Cypress)
- Deployment (Vercel)

I’ll run you through setting up a development environment and project. And then we’ll learn how to:
- Render components to the page
- Call an API
- Re-render that component with the data we fetched

---

## Web Framework (Next.js)

Web frameworks aim to automate the overhead associated with common activities performed in web development. For example, many web frameworks provide libraries for database access, templating frameworks, and session management, and they often promote code reuse.

Next.js is a framework for building static and dynamic websites and web applications.

Next.js provides a pre-rendered React app in the client-side for users to view and interact with and also does server-side rendering and API routes for performing server-side functions like accessing data from a database.

To get started with Next JS, there is a create-next-app that automatically sets up a project for you. So let’s crack open the terminal and navigate to where we want to store the project.

1. Open terminal
2. Run `cd desktop` to *change the working directory* to your desktop
3. Run `npx create-next-app --use-npm` to create a starter Next.js project that uses NPM
4. Name the project whatever you’d like and press enter
5. Choose the Default starter app template and press enter
6. Run `cd <project name>` (change the <project name> to whatever you called your project. E.g. `cd test-project`)
7. Then you can run `code .` to open the directory in the VS Code app.

NPM uses a `package.json` file to hold data relevant to the project for managing the project's dependencies, scripts, version and a whole lot more.

You can see the create-next-app set up some scripts for us in package.json:
- dev
- build
- start

You can open a terminal in VS Code with the shortcut:
- Mac: control + ` (the same key as ~ in the top left)
- Windows: ctrl + ` (the same key as ~ in the top left)

You can run `npm run dev` in the terminal to start the local dev server. Then type [http://localhost:3000/](http://localhost:3000/) in your browser and see your project!

In VS Code:
- Navigate to `pages > index.js`
- Change some text and save the file
- See it update immediately in your browser!

You can also see an `pages > api > hello.js` file. If you load [http://localhost:3000/api/hello](http://localhost:3000/api/hello), you can see that the server rendered the JSON it was supplied.

You can stop the local dev server by pressing:
- Mac: control + C
- Windows: ctrl + C

### Front-end and Back-end

Since JavaScript got ***big***, the Front-end/Back-end delineation has gotten hazy. (See: [ooooops I guess we’re full-stack developers now](https://css-tricks.com/ooooops-i-guess-were-full-stack-developers-now/))

In the case of our website, we can kinda say that the client-side React app is the front-end and the server-side rendering and API routes is the back-end.

## Transformation

### PostCSS
PostCSS is a tool for transforming CSS with JavaScript.

With PostCSS we can automatically prefix browser specific CSS with Autoprefixer, convert modern CSS into something most browsers can understand, and add plugins to further process our CSS.

I should probably integrate a linter into our toolchain, but right now I just use Prettier by itself.


### Tailwind CSS

Tailwind CSS is a utility-first CSS framework. In comparison, Bootstrap is a Component-based Framework.

We’ll install PostCSS and Tailwind at the same time:

1. Stop the local dev server by pressing:
	- Mac: control + C
	- Windows: ctrl + C
2. Run `npm install -D tailwindcss@latest postcss@latest autoprefixer@latest`
3. Auto generate the TailwindCSS and PostCSS config files by running `npx tailwindcss init -p`
4. Open tailwind.config.js to configure Tailwind to remove unused styles in production by replacing the *purge* array with the following:

{% highlight javascript %}
{% raw %}
purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
{% endraw %}
{% endhighlight %}

Now, to include Tailwind in our CSS, for speed we’ll just import Tailwind directly in our app.

Next.js uses an App component to enable global things like CSS on every page. To override the default App, create the file `./pages/_app.js` as shown below:

{% highlight javascript %}
{% raw %}
import 'tailwindcss/tailwind.css'

function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default App
{% endraw %}
{% endhighlight %}

We did it! Now run `npm run dev` and Tailwind will be ready to use.

Here’s the official guide to [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs).

---

Now, above the `export default function Home() { … }`  write the following:

{% highlight javascript %}
{% raw %}
function User() {
  console.log("user function called")

  return <p>User data</p>
}
{% endraw %}
{% endhighlight %}

Congrats, you just wrote your first **[React Component](https://reactjs.org/docs/components-and-props.html)**! Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

Note: React Components should always start with a capital letter.

You can use this React Component on the page by placing `<User/></User>` (or, since we’re not placing anything in it we can use the HTML self-closing tag `<User/>`) somewhere in the rest of the HTML in the Home function that is exported.

Congrats, you’ve rendered your first component to the page!

The `<User/>` component calls the function, and in the function we can run some JavaScript and whatever we return is then rendered to the page.

Now for our next task: **Rendering data from an API in our component**.

We want to render our `<User/>` component on page load (we’ve already done that!) and then call an API to get data and re-render the component once the API returns the data.

React offers a *hook* called **useEffect** that tells React that the component needs to do something *after it renders*. We can use this hook in Next.js by importing it at the top of the file:

{% highlight javascript %}
{% raw %}
import { useState, useEffect } from 'react';
import Head from 'next/head';
{% endraw %}
{% endhighlight %}

The code above is importing another hook called **useState**. useState lets you add React state to function components. Our User component is a function component! And we’re looking to add state that changes with the data from an API. First let’s set up the useEffect hook:

{% highlight javascript %}
{% raw %}
function User() {

  useEffect(() => {
    console.log("user component rendered")
  })

  return <p>User data</p>
}
{% endraw %}
{% endhighlight %}

You can see with this, it still only logs one time, as the component is only rendered once–on page load.

So, let’s give our User component some state with the useState hook:

{% highlight javascript %}
{% raw %}
function User() {

  const [userData, setUserData] = useState();

  console.log(userData)

  useEffect(() => {
    setUserData("I am the user data")
    console.log("user component rendered")
  })

  return <p>User data</p>
}
{% endraw %}
{% endhighlight %}


Now in our browser console we can notice a few things:
1. The userData first logs as *undefined*
2. The User component is rendered *twice*

#1 is caused because remember, useEffect tells React that the component needs to do something *after it renders*. So the first render of our component has no userData.

To fix #2, where the component is rendered twice, we can add a dependency array to the useEffect call (the dependency array is the [] after the useEffect):

{% highlight javascript %}
{% raw %}
  useEffect(() => {
    setUserData("I am the user data")
    console.log("user component rendered")
  }, [])
{% endraw %}
{% endhighlight %}

Our dependency array is empty! An empty dependency array tells React that our effect doesn’t depend on any values from props or state, so it never needs to re-run and should run only once.

Now, if we want to *render* our `userData` variable in our component, we’ll have to include it in the `return`. But remember, everything in the `return` is rendered to the page! And you can’t just list the JavaScript variable to the page.

To solve for this, React utilizes **JSX**. We can call the variable in our returned HTML simply by wrapping it in `{userData}`:

{% highlight javascript %}
{% raw %}
function User() {

  const [userData, setUserData] = useState();

  console.log(userData)

  useEffect(() => {
    setUserData("I am the user data")
    console.log("user component rendered")
  }, [])

  return <p>{userData}</p>
}
{% endraw %}
{% endhighlight %}

This should throw an error. The culprit? Remember how userData is *undefined* at first? We need to account for that!

The component renders before our useEffect sets the userData (and soon, before calling the API). So we can return something that doesn’t use the userData variable to display until the userData loads in and we can re-render the component with the userData:

{% highlight javascript %}
{% raw %}
function User() {

  const [userData, setUserData] = useState();

  console.log(userData)

  useEffect(() => {
    setUserData("I am the user data")
    console.log("user component rendered")
  }, [])

  if (typeof userData == 'undefined') {
    return <p>Loading…</p>;
  }

  return <p>{userData}</p>
}
{% endraw %}
{% endhighlight %}

Great!

Now, we can call an API and set the user data to it’s response:

{% highlight javascript %}
{% raw %}
function User() {

  const [userData, setUserData] = useState();

  console.log(userData)

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((response) => {
        setUserData(response.results);
      });
  }, [])

  if (typeof userData == 'undefined') {
    return <p>Loading…</p>;
  }

  return <p>{userData}</p>
}
{% endraw %}
{% endhighlight %}

Another error! It seems the userData response returns an object. And since we’re trying to render an object with JSX, React doesn’t like that!

So let’s remove the userData from the return and log userData to the console to debug:

{% highlight javascript %}
{% raw %}
[…]
  console.log(userData)

  return <p>debugging!</p>
}
{% endraw %}
{% endhighlight %}

Ah! We need to go into `userData[0]` and then pick a key. I’ll go with name.first:

{% highlight javascript %}
{% raw %}
[…]

  return <p>{userData[0].name.first}</p>
}
{% endraw %}
{% endhighlight %}

We did it!

Now, I’ll write out a component that utilizes tailwind styling for you here:

{% highlight javascript %}
{% raw %}
function User() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((response) => {
        setUserData(response.results);
      });
  }, []);

  if (typeof userData == 'undefined') {
    return <p>Loading…</p>;
  }

  return (
    <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
      <li className="py-10 px-6 bg-blue-100 text-center rounded-lg xl:px-10 xl:text-left">
        <div className="space-y-6 xl:space-y-10">
          <img
            className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
            src={userData[0].picture.large}
            alt=""
          />
          <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
            <div className="font-medium text-lg leading-6 space-y-1">
              <h3 className="text-black">{userData[0].name.first}</h3>
              <p className="text-indigo-400">{userData[0].email}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}
{% endraw %}
{% endhighlight %}

Okay, our page is getting to be a bit much! Remember when we added the tailwind purge configuration, it included a components folder?

{% highlight javascript %}
{% raw %}
purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
{% endraw %}
{% endhighlight %}

Components like the one we’ve just built typically exist in the components folder to keep our code cleaner and more reusable. So, there’s a few things we need to do:
1. Create a folder at the root of the project called components
2. Let’s create our first component file and name it `UserCard.js` Remember, React Components should always start with a capital letter.

Now let’s copy our entire User component (but not the Home component) from the `index.html` and paste it into our `UserCard.js`, and remember we had to import useState and useEffect from React for this component, we’ll have to move that too!

Since we want to change the component name, make sure the change the function name to UserCard as well.

{% highlight javascript %}
{% raw %}
// UserCard.js
import { useState, useEffect } from 'react';

function UserCard() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then((res) => res.json())
      .then((response) => {
        setUserData(response.results);
      });
  }, []);

  if (typeof userData == 'undefined') {
    return <p>Loading…</p>;
  }

  return (
    <ul className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
      <li className="py-10 px-6 bg-blue-100 text-center rounded-lg xl:px-10 xl:text-left">
        <div className="space-y-6 xl:space-y-10">
          <img
            className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
            src={userData[0].picture.large}
            alt=""
          />
          <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
            <div className="font-medium text-lg leading-6 space-y-1">
              <h3 className="text-black">{userData[0].name.first}</h3>
              <p className="text-indigo-400">{userData[0].email}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default UserCard;

{% endraw %}
{% endhighlight %}

Hopefully you noticed that I added an `export default UserCard;` in our `UserCard.js` file. This declares a single entity (There can only be one `export default` per file), in this case we’re exporting the module `UserCard.js` that contains our functional component `UserCard`. We can then use it in our `index.js` file by importing it.

{% highlight javascript %}
{% raw %}
// index.js
import Head from 'next/head';
import UserCard from '../components/UserCard';

export default function Home() {
  return (
    […]
    <UserCard />
    […]
  );
}
{% endraw %}
{% endhighlight %}

Now, you can see that `index.js` is also exporting a function, `Home()`, and it declares it all in one line. I’m not 100% sure they’re exactly the same thing, I think it’s just personal preference.

Look over that and try and make sense of it while as we sidestep into saving our progress.

## Version Control (Github)

[Adding an existing project to GitHub using the command line](https://docs.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line).

Now, you can also download a GUI like [Github Desktop](https://desktop.github.com/) to manage Git. (See [GUI Clients](https://git-scm.com/downloads/guis/))

Note: Git uses a `.gitignore` file to specify files and directories that Git should ignore.

At the very least, you should create a `.gitignore` with the following in it:

{% highlight config %}
# .gitignore

node_modules
{% endhighlight %}

## IDE (VS Code)

[Here are some helpful shortcuts](https://dev.to/simonpaix/10-useful-vs-code-shortcuts-you-should-know-42m) that are good to know.

VS Code Plugins:
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [VS Code Icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

## Working with APIs

APIs often use JSON. JavaScript Object Notation (JSON) is a text-based data format that closely resembles JavaScript object syntax but can be used independently from JavaScript, and many programming environments feature the ability to read (parse) and generate JSON.

We can fetch API data both client-side and server-side. Server-side requests allow us to:
- 	Use Environment Variables on the server to securely access external services.
- 	Mask the URL of an external service.
- 	Pre-render content server-side.

## Deployment (Vercel)

Now it’s time to get our site on the web!

Because we have a build step in our web development process, it would be annoying if we had to upload our build to a hosting provider every time. That’s just one of the awesome features hosting providers like Vercel and Netlify do! These hosting providers sync to a Github repo and will automatically build and deploy your site when you commit changes.

Go ahead and create an account on Vercel and deploy from your github repo.

Once you’ve done that, congrats, you’ve built and deployed your first web application. Welcome to the wild world of web development.

---

# Web Application Architecture

## Web Application Architecture Components

- Web server
- Load balancer
- Database
- Cache
- Web framework
- Message queue
- Logging
- Object storage

Options
- One server: Everything on it
- Two servers: Web and database servers scale independently

## Web Server

See: [dev-timeline#web-servers](/dev-timeline/#web-servers)

- Operating System (e.g., Linux, Windows, OpenBSD)
- Runtime (e.g., Node.js, Python, .NET)
  - Communicates with the OS file system
- Web server (HTTP) framework (e.g., [Express.js](https://expressjs.com/), [Flask](https://flask.palletsprojects.com/))

You can run a web server on your personal computer, likely want to use [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/) to publish it securely. However, usually a server, or space on a server, is rented from a cloud provider ([someone else’s computer](https://blog.codinghorror.com/the-cloud-is-just-someone-elses-computer/)).

We can categorize servers into:
- Dedicated server
- Virtual private servers
- MicroVM

#### Dedicated server

A dedicated server is a server a provider provides solely to you.

Dedicated server providers:
- [AWS: EC2 Dedicated Hosts](https://aws.amazon.com/ec2/dedicated-hosts/)
- [Hetzner](https://www.hetzner.com/)
- [Vultr: Bare Metal](https://www.vultr.com/products/bare-metal/)
- [OVHcloud: dedicated servers](https://us.ovhcloud.com/bare-metal/)

#### VPS (Virtual Private Server) / VM (Virtual Machine)

A VPS (Virtual Private Server) is a server a provider provides a portion of to you.

VPS providers:
- [AWS: EC2](https://aws.amazon.com/ec2/)
- [Digital Ocean: Droplets](https://www.digitalocean.com/products/droplets)
- [Vultr](https://www.vultr.com/) is a cloud provider that gives you root access to your own private server

#### MicroVM (“serverless”)

[AWS: Lambda](https://aws.amazon.com/lambda/) is a cloud service that replaces the long-running web server with a short-lived, lightweight, Firecracker microVM. The experience of working with Lambda is so painful that multi-billion dollar businesses like [Vercel](https://vercel.com/) and [Netlify](https://netlify.com/) exist to abstract it.

[Fly.io](https://fly.io/) is a cloud provider that runs your application code in a long-lived, lightweight, Firecracker microVM.

See: [Firecracker](https://firecracker-microvm.github.io/).

### Web server location

Traditionally, servers run in a single location from a cloud providers data center. Computing “at the edge” generally means running code on servers close to users instead of a single location.

### Deployment architecture

Environments are commonly:
- Local: Developer’s workstation
- Development/Trunk: Development server acting as a sandbox for unit testing
- Staging/Pre-production: Mirror of production environment
- Production/Live: Serves end-clients
    - Canary: deployment that serves a new release to a limited number of end-clients

Maintaining consistency across these environments is difficult. Many tools exist to help automate deployment architecture.
- [Ansible](https://www.ansible.com/)
- [Jenkins](https://www.jenkins.io/)
- [AWS CDK](https://aws.amazon.com/cdk/)
- [Terraform](https://www.terraform.io/)
- [Pulumi](https://www.pulumi.com/)
- [Chef](https://www.chef.io/)
- [Nx](https://nx.dev/)
- [Buddy](https://buddy.works/)
- [Travis CI](https://www.travis-ci.com/)

## Scaling

Scaling types:
- Vertical “scale-up”: add more CPU/RAM (only so much you can add)
- Horizontal “scale-out”: add more servers

## Load Balancer

> Past a certain point, web applications outgrow a single server deployment. Companies either want to increase their availability, scalability, or both! To do this, they deploy their application across multiple servers with a load balancer in front to distribute incoming requests. Big companies may need thousands of servers running their web application to handle the load.
> – [Sam Rose](https://samwho.dev/load-balancing/)

[Scaling Web Applications with NGINX Load Balancing and Caching](https://youtu.be/jVCYaLEBCpU)

Load balancer implementations:
- [NGINX](https://nginx.org/en/docs/http/load_balancing.html)
- [HAProxy](https://www.haproxy.org/)
- [traefik](https://traefik.io/traefik/)
- [OpenELB](https://github.com/openelb/openelb)
- [GitHub Load Balancer Director](https://github.com/github/glb-director)
- [AWS ELB](https://aws.amazon.com/elasticloadbalancing/)
- [Azure Load Balancer](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview)


## Database replication and HA (high availability)

Load balancers let you run redundant web servers; preventing the web server from being a single point of failure. If one web server goes does, the load balancer will send all requests to the other web server.

> Web servers serving static web pages can be combined quite easily by merely load-balancing web requests to multiple machines. In fact, read-only database servers can be combined relatively easily too. Unfortunately, most database servers have a read/write mix of requests, and read/write servers are much harder to combine. This is because though read-only data needs to be placed on each server only once, a write to any server has to be propagated to all servers so that future read requests to those servers return consistent results.
>
> This synchronization problem is the fundamental difficulty for servers working together. Because there is no single solution that eliminates the impact of the sync problem for all use cases, there are multiple solutions. Each solution addresses this problem in a different way, and minimizes its impact for a specific workload.
> — [PostgreSQL docs](https://www.postgresql.org/docs/current/high-availability.html)


- [PostgreSQL: High Availability, Load Balancing, and Replication](https://www.postgresql.org/docs/current/high-availability.html)
- [MariaDB: Replication](https://mariadb.com/kb/en/standard-replication/)
- SQLite
	- [LiteFS](https://github.com/superfly/litefs)
	- [rqlite](https://github.com/rqlite/rqlite) / [dqlite](https://github.com/canonical/dqlite)


## Cache

“Caching” is the concept of storing the result of an expensive operation in a way that is faster to retrieve than executing the operation again. Faster retrieval is often achieved by storing data in memory rather than on disk; making data loss likely in the case the server fails.

A common cache area is read-heavy requests on data that is modified infrequently; if the data is rarely modified, you can more safely lower the data-accuracy guarantee.

Common caching systems:
- [Memcached](https://memcached.org/)
- [Redis](https://redis.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [Varnish](https://varnish-cache.org/intro/index.html#intro)
- [NGINX](https://www.nginx.com/blog/nginx-caching-guide/)

## Web framework

See: [dev-timeline#web-frameworks](/dev-timeline/#web-frameworks)

## Message queue

A message queue allows a service to send data to another service, even if the other service is not ready to receive it; and then allows the message to be consumed even if the sender is unavailable; it buffers the communication with a queue. Email (SMTP) is a message queue.

- [Apache Kafka](https://kafka.apache.org/)
- [Rabbit MQ](https://www.rabbitmq.com/)

## Logging
