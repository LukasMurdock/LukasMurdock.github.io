---
layout: post
title: 'Creating Custom Netlify Editor Components'
description: ''
date: 'June 07, 2021'
code: true
---

https://www.netlifycms.org/docs/custom-widgets/

The available widget extension methods are:

- **registerWidget**: registers a custom widget.
- **registerEditorComponent**: adds a block component to the Markdown editor.

Register Editor Component sounds like what I want.


{% highlight javascript %}
{% raw %}
CMS.registerEditorComponent(definition)
{% endraw %}
{% endhighlight %}

The component definition must specify:
{% highlight javascript %}
{% raw %}
{
    id: 'blockquote', // Internal id of the component
    label: 'Blockquote', // Visible label
    // Fields the user need to fill out when adding an instance of the component
    fields: [
        {
            name: 'quote',
            label: 'Quote',
            widget: 'string',
        },
        {
            name: 'author',
            label: 'Author',
            widget: 'string',
        },
    ],
    pattern: /^customBlockquote (.*)<footer>(.*)<\/footer>$/, // Pattern to identify a block as being an instance of this component
    // Function to extract data elements from the regexp match
    fromBlock: function (match) {
        return {
            quote: match[1],
            author: match[2],
        }
    },
    // Function to create a text block from an instance of this component
    toBlock: function (obj) {
        return (
            'customBlockquote ' +
            obj.quote +
            '<footer>' +
            obj.author +
            '</footer>'
        )
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function (obj) {
        return (
            '<blockquote>' +
            obj.quote +
            '<footer>' +
            obj.author +
            '</footer></blockquote>'
        )
    },
    })
}
{% endraw %}
{% endhighlight %}

It seems editor components in Netlify CMS work by regex matching some declared text and replacing it.

In this example, in the markdown editor if you write “customBlockquote Here’s a quote” with the footer afterwards with the author name, Netlify will pattern match that and preview it properly.

Done like this, it would seem I would have to make another parser on the frontend for it to display properly…

Better to just start with semantic HTML.

{% highlight javascript %}
{% raw %}
CMS.registerEditorComponent({
    id: 'blockquote', // Internal id of the component
    label: 'Blockquote', // Visible label
    // Fields the user need to fill out when adding an instance of the component
    fields: [
        {
            name: 'quote',
            label: 'Quote',
            widget: 'string',
        },
        {
            name: 'author',
            label: 'Author',
            widget: 'string',
        },
    ],
    pattern:
        /^<blockquote>(.*)<footer>(.*)<\/footer><\/blockquote>/, // Pattern to identify a block as being an instance of this component
    // Function to extract data elements from the regexp match
    fromBlock: function (match) {
        return {
            quote: match[1],
            author: match[2],
        }
    },
    // Function to create a text block from an instance of this component
    toBlock: function (obj) {
        return (
            '<blockquote>' +
            obj.quote +
            '<footer>' +
            obj.author +
            '</footer></blockquote>'
        )
    },
    // Preview output for this component. Can either be a string or a React component
    // (component gives better render performance)
    toPreview: function (obj) {
        return (
            '<blockquote>' +
            obj.quote +
            '<footer>' +
            obj.author +
            '</footer></blockquote>'
        )
    },
})
{% endraw %}
{% endhighlight %}

Perrrfect.