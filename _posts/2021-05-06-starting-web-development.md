---
layout: post
title: 'Starting Web Development'
description: "An introduction to web development."
date: May 06, 2021
last_modified_at: 2021-05-06T19:35:12+0000
code: true
---

Here’s my introduction to web development. I’ll continue working on this over time and hopefully it becomes as smooth as ice.

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

(Sidenote: Sir Tim Berners-Lee invented HTML. And the Internet Engineering Task Force (IETF) defines the HTML specification. HTML5 is the latest version of the standard.)

Browsers like Google Chrome, Safari, and Firefox take HTML markup and render it to the screen. We can open our HTML file that we stored locally in our browser to see what it looks like.

Soon after HTML came **Cascading Style Sheets (CSS)** as a way to add styling (e.g. fonts, color, spacing) to HTML elements.

{% highlight HTML %}
{% raw %}
<h1 style="font-weight: 600; margin-bottom: 20px;">Languages of the Web</h1>

<p style="line-height: 1.4;">Web pages are really just that. <i>Pages</i>. They're documents, just like papers you've written in the past. Documents with heading levels, sections, paragraphs, and more. The web started with the idea of <i>linking</i> documents. So let's learn how to create a document.</p>
{% endraw %}
{% endhighlight %}

(Sidenote: Håkon Wium Lie, a coworker of Tim Berners-Lee invented CSS. The World Wide Web Consortium (W3C) maintains the CSS specifications. CSS does not have a version as a whole like HTML or JS. All current CSS specifications have their own specific versions ranging from 1 to 4.)

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
-   Python (main package manager: Pip)
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

Okay! That might be a bit much at once. Look over that and try and make sense of it while as we sidestep into saving our progress.

## Version Control (Github)

[Adding an existing project to GitHub using the command line](https://docs.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line).

Now, you can also download a GUI like [Github Desktop](https://desktop.github.com/) to manage Git.

Note: Git uses a `.gitignore` file to specify files and directories that Git should ignore.

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