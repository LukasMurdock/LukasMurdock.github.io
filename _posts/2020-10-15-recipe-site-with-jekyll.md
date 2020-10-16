---
layout: post
title: 'Creating a recipe site with Jekyll'
description: "In my push for more people to own their own piece of the internet I created a recipe website for my girlfriend."
date: October 15, 2020
code: true
---

“No, what would even be on it?”

That’s fair. Working on preparing for job interviews, so resume related stuff would work.

“What do you post/save/etc on social media?”

Recipes.

Now we’re cooking.

## Website Stack
My favorite stack for most websites is Jekyll and Netlify. Jekyll builds the site on Netlify, and Netlify CMS takes care of no-code posting and editing. All for free.

## Jekyll
Initializing a new Jekyll site is easy. However, getting a new Jekyll site configured how I want it to be is a bit more effort.

The default Jekyll project assumes you’re using a gem theme and doesn’t come with any folders for customization.

A few `_includes` I bring in to every project:
- analytics.html
- footer.html
- head.html
- header.html
- schema.html

After getting the `_layouts` and `_includes` all set, I started with a plain markdown document for the homepage. This forces me to not weigh down the page with code and to design with the future in mind.

Starting a site with plain HTML and CSS is wonderful.


### Recipes in Jekyll
To add a recipe collection, I created a `_recipe` folder make Jekyll see the collection by adding some code to the `_config.yml` file:

{% highlight yaml %}
collections:
  recipes:
    output: true
    permalink: /:collection/:name/
    layout: "recipe"
{% endhighlight %}

## Recipe Structured Data
After learning about how to [implement structured data](https://lukasmurdock.com/adding-schema-markup/) on this site previously I’ve wanted to explore more examples of schema data.

Recipes are a perfect example of structured data.

Following the “[Get your recipes on Google](https://developers.google.com/search/docs/data-types/recipe)” guide by Google Search, I laid out the following data points:

- title
- description
- category
- ingredients
- cuisine
- date
- image
- instructions
- calories
- preptime
- cooktime
- servings

These make up the front matter of every recipe post, to be added to from the Netlify CMS and to be used to generate the page and schema data.

Here is an example of what the front matter looks like:

{% highlight yaml %}
---
layout: recipe
title: Old-Fashioned Goulash
description: description
category: main course
ingredients:
  - 2 Tbsp Olive Oil
  - 2 lbs Lean Ground beef
  - 1 large yellow onion (diced)
  - 3 cloves minced garlic
  - 1 cup low sodium beef broth
  - 2 14.5 oz cans diced Tomatoes with juice
  - 2 15oz cans tomato sauce
  - 2 tsp low sodium soy sauce
  - 2 tsp salt
  - 1 tsp black pepper
  - 1 tbsp paprika
  - 2 cups uncooked elbow macaroni
  - 2 tsp Italian seasoning
cuisine: American
date: 2020-10-15 19:58
instructions:
  - Heat soup pot on medium-high heat. Once hot, add oil, then ground beef.
  - Cook ground beef until browned (about 10 minutes) and spoon off some excess
    fat.
  - Add diced onion and garlic. Cook for four minutes, stirring occasionally.
  - Add beef broth, diced tomatoes, tomato sauce, soy sauce, salt, pepper,
    Italian seasoning, and paprika. Stir well.
  - Reduce heat to low, cover and cook for 15 minutes, stirring occasionally.
  - Stir in uncooked macaroni noodles, cover and cook for an additional 15-25 minutes, or until pasta is cooked.
  - Serve and Enjoy!
preptime: 10
cooktime: 60
servings: 6
---
{% endhighlight %}

#### Adding time in Jekyll
Jekyll uses the liquid templating language created by Shopify.

I wanted to add the `preptime` and `cooktime` minutes and display as “X hours XX minutes.”

That is surprisingly difficult.

I’ll spare the details and toiling and show the end result.

{% highlight html %}
{% raw %}
{% assign totaltime = recipe.preptime | plus: recipe.cooktime %}
{% assign minutes = totaltime | modulo: 60 %}
<p>{% if totaltime > 60 %}{{ totaltime | divided_by: 60}} hours{% endif %}{% if minutes > 0 %} {{ minutes }} minutes{% endif %}</p>
{% endraw %}
{% endhighlight %}

It’s not perfect, it will say “1 hours,” but it works.

### Editing Recipe Structured Data with Netlify CMS
Netlify CMS allows you to edit Jekyll front-matter without dealing with any code or development setup.

Netlify CMS has its own `config.yml` file that you create in a folder titled `admin`.

I’ll spare the details and toiling it took to get the end result and just show the code for the Netlify CMS `config.yml`:

{% highlight yaml %}
media_folder: "images" # Media files will be stored in the repo under images
public_folder: "/assets/images/" # The src attribute for uploaded media will begin with /images

collections:
  - name: 'pages'
    label: 'Pages'
    editor:
      preview: false
    files:
      - label: 'Home'
        name: 'home'
        file: 'index.md'
        fields:
          - { label: 'Title', name: 'title', widget: 'string', default: 'Change Management & Six Sigma Leader' }
          - {label: "Body", name: "body", widget: "markdown"}
      - label: 'Resume'
        name: 'resume'
        file: 'resume.md'
        fields:
          - { label: 'Title', name: 'title', widget: 'string', default: 'Resume' }
          - {label: "Body", name: "body", widget: "markdown"}

  - name: "recipe" # Used in routes, e.g., /admin/collections/blog
    label: "Recipes" # Used in the UI
    folder: "_recipes/" # The path to the folder where the documents are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template, e.g., YYYY-MM-DD-title.md
    fields: # The fields for each document, usually in front matter
      - {label: "Layout", name: "layout", widget: "hidden", default: "recipe"}
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Description", name: "description", widget: "string"}
      - {label: "Category", name: "category", widget: "select", default: "main course", options: ["main course", "dessert", "dinner", "snack", "appetizer", "entree"]}
      - label: "Ingredients"
        name: "ingredients"
        widget: "list"
        field: {label: Ingredient, name: ingredient, widget: string}
      - {label: "Cuisine", name: "cuisine", widget: "string", default: "American", required: false}
      - {label: "Date", name: "date", widget: "datetime", dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', format: 'YYYY-MM-DD HH:mm'}
      - {label: "Image", name: "image", widget: "image", required: false, media_folder: "/assets/images/posts/", public_folder: "/assets/images/posts/", hint: 'Use tinypng.com before uploading!'}
      - label: "Instructions"
        name: "instructions"
        widget: "list"
        field: {label: Instructions, name: instructions, widget: string}
      - {label: "Calories", name: "calories", widget: "number", required: false}
      - {label: "Preparation Time", name: "preptime", widget: "number", hint: "Time in minutes!"}
      - {label: "Cook Time", name: "cooktime", widget: "number", hint: "Time in minutes!"}
      - {label: "Servings", name: "servings", widget: "number", required: false}
      - {label: "Body", name: "body", widget: "markdown", required: false}
{% endhighlight %}

