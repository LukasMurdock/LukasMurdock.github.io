---
layout: post
title: 'You can use React anywhere?'
description: "Today I learned…"
date: May 27, 2021
code: true
display_in_newsletter: false
---



Two things:
1. React is a JavaScript library
2. You can load JavaScript libraries as a `<script>` tag in any page with [UNPKG](https://unpkg.com/)

Okay, I already knew those two things. But I didn’t synthesize them to realize you can use React pretty much anywhere.

{% highlight javascript %}
// the code that loads React!
<div id="root"></div>
<script src="https://unpkg.com/react@^17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@^17/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@^7/babel.js"></script>
<script type="text/babel">
    const rootElement = document.getElementById('root')
    const element = <div className="container">This is loaded in react!</div>
    ReactDOM.render(element, rootElement)
</script>
{% endhighlight %}


<div id="root"></div>
<script src="https://unpkg.com/react@^17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@^17/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@^7/babel.js"></script>
<script type="text/babel">
    const rootElement = document.getElementById('root')
    const element = <div className="container">This is loaded in react!</div>
    ReactDOM.render(element, rootElement)
</script>

And here’s another example with a functional component vv 

{% highlight javascript %}
// the code that loads React!
<div id="root"></div>
<script src="https://unpkg.com/react@^17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@^17/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@^7/babel.js"></script>
<script type="text/babel">
    function Element() {
        const [state, setState] = React.useState(0)
        return (
            <div>
                <button onClick={() => setState(state + 1)}>{state}</button>
            </div>
        )
    }
    const rootElement = document.getElementById('root')
    const element = <div className="container">This is loaded in react!</div>
    ReactDOM.render(<Element/>, rootElement)
</script>
{% endhighlight %}

<div id="root2"></div>
<script type="text/babel">
    function Element() {
        const [state, setState] = React.useState(0)
        return (
            <div>
                <button onClick={() => setState(state + 1)}>{state}</button>
            </div>
        )
    }
    const rootElement = document.getElementById('root2')
    const element = <div className="container">This is loaded in react!</div>
    ReactDOM.render(<Element/>, rootElement)
</script>

Note: Using React from a CDN like this should probably only be used to play around and learn React or to use React code in a non-React place–like this site!