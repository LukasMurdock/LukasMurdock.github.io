---
layout: post
title: 'Making a book list'
description: Learning how to make a book list with Jekyll.
image: gbooksapi.jpg
caption: Google Developer APIs to the rescue.
date: October 19, 2019
code: true
redirect_from: /2019/10/19/making-a-book-list/
---


<span style="color: rgba(51,51,51,.5);">The Problem: </span>finding all the information on books is annoying and time consuming.

<span style="color: rgba(51,51,51,.5);">The Solution: </span>make technology do all the heavy lifting.

### Some things we need to get
- Title
- Author
- Book cover image

### How to get them
Now that we have some vague ideas of what we need to get, let's explore *how we're going to get them.*

My first thought and the one I see implemented on other sites is [Goodreads](https://www.goodreads.com). Complete with [it's own API](https://www.goodreads.com/api) Goodreads is the choice for being in-sync. I've seen people implement progress updates, book reviews and ratings. But that's all more than I'm looking to do with this. Also the Goodreads API is *very slow*.

Instead of fumbling around searching how to easily get an image for nearly any book cover like I did (cause hunting down an image for every update *seriously sucks*) I'll lay out all the details here.

The solution: [Google Books API](https://developers.google.com/books/docs/v1/using).
<br><span style="font-size: 12px;">Honestly I should've thought of that, thanks Google.</span>

Google Books API is able to return the following information:
- The kind of book
- Google Books link
- Title <span class="full-underline" style="font-size: 12px;">Yes!</span>
- Subtitle
- Authors <span class="full-underline" style="font-size: 12px;">Yes!</span>
- Publisher
- Published date
- Description
- Industry identifiers (ISBN, ASIN)
- Page count
- Print type
- Categories
- Average rating (from Google Books)
- Ratings count (from Google Books)
- Maturity rating
- Image thumbnails <span class="full-underline" style="font-size: 12px;">Yes!</span>
- Text snippit
<br><span style="font-size: 12px;">They're really all yesses.</span>

### Getting the information

That all sounds cool but I've never dealt with an API before. What's the least amount of information we can use to extract all the data from the API?

My thoughts: ISBN codes.

Jekyll supports [YAML](https://jekyllrb.com/docs/datafiles/) for it's `_data` directory and the structure is [relatively simple](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_yaml_tutorial). To add a book the only thing I need to find is the ISBN code. Everything else auto populates from that.

`booklist.yaml`
{% highlight yaml %}
---
#Book List
books:
  - isbn: 9781250237231
  - isbn: 9780316478526
  - isbn: 9780525540830
{% endhighlight %}

Now we can pass this YAML formatted document as a JSON file and assign it to a variable on the `/booklist/` page.

{% highlight java %}
{% raw %}
// Initializing variables for later
var book_url;
var imageLink;
var isbnslist = [];
var i=0;

{% assign isbncheck = site.data.booklist.books | jsonify %}

var isbns = {{ isbncheck }}
{% endraw %}
{% endhighlight %}

I had to do a lot of looking to figure out how to optimize performance and query every book in a single request. I couldn't find [this solution](https://www.sitepoint.com/community/t/how-to-solve-google-books-api-403-restriction/286374/2) anywhere in the docs. Glad those errors are over with.

{% highlight java %}
{% raw %}
for ( i = 0; i < isbns.length; i++)
    {
      isbnslist.push(String(isbns[i].isbn));
    }

const url = isbnslist.reduce(
  (res, isbnslist, index) => res + (index ? "+OR+" : "") + "isbn:" + isbnslist,
  "https://www.googleapis.com/books/v1/volumes?q="
)

book_url = url + "+&fields=items(volumeInfo/description,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/industryIdentifiers/identifier)+&maxResults=40"

{% endraw %}
{% endhighlight %}

Just to show a little bit of what's going on here without explaining it.

{% highlight java %}
{% raw %}
// ISBN list is now an array
console.log(isbnslist)
[
  "9781250237231",
  "9780316478526",
  "9780525540830"
]

// All books full data return
console.log(url)
"https://www.googleapis.com/books/v1/volumes
?q=isbn:9781250237231+OR+
isbn:9780316478526+OR+
isbn:9780525540830"

// Filter fields for only needed data
console.log(book_url)
"https://www.googleapis.com/books/v1/volumes
?q=isbn:9781250237231+OR+
isbn:9780316478526+OR+
isbn:9780525540830+
&fields=items(
  volumeInfo/description,
  volumeInfo/title,
  volumeInfo/authors,
  volumeInfo/imageLinks/thumbnail,
  volumeInfo/industryIdentifiers/identifier
)
+&maxResults=40"

{% endraw %}
{% endhighlight %}

Now that we have the URLs to the data, all we have to do fetch it and plug it where we want it.

{% highlight java %}
{% raw %}
fetch(book_url)
.then(res => res.json())
.then((out) => {

  for (i=0; i < out.items.length; i++){
  document.getElementById("grid-container").innerHTML += "<div class="grid-item"> <a rel="nofollow" target="_blank" href="https://www.google.com/search?q=" + out.items[i].volumeInfo.title.replace(/ /g, "+") + "+by+" + out.items[i].volumeInfo.authors[0].replace(/ /g, "+") + ""> <div> <img alt="" + out.items[i].volumeInfo.title + " book cover" src="" + out.items[i].volumeInfo.imageLinks.thumbnail.replace("&edge=curl","") + ""> </div></a> <div> <h3><a rel="nofollow" target="_blank" href="https://www.google.com/search?q=" + out.items[i].volumeInfo.title.replace(/ /g, "+") + "+by+" + out.items[i].volumeInfo.authors[0].replace(/ /g, "+") + "">" + out.items[i].volumeInfo.title + "</a></h3> <p class="item">by " + out.items[i].volumeInfo.authors[0] + "</p> </div> </div>";
}
{% endraw %}
{% endhighlight %}

That super long '`document.getElementByID`' provides the entire HTML structure of the books selection. It loops for every book returned from the Google Books API (so it adds that HTML for every book). For a cheat sheet on what the variables link to:

{% highlight java %}
{% raw %}
/*
  Title: out.items[0].volumeInfo.title
  Author: out.items[0].volumeInfo.authors[0]
  Thumbnail: out.items[0].volumeInfo.imageLinks.thumbnail
  Description: out.items[0].volumeInfo.description
*/
{% endraw %}
{% endhighlight %}

To add some error handling in case the ISBN provided does not show up within the Google API I managed to throw an error to the console to determine which ISBN would need to be fixed.

{% highlight java %}
{% raw %}
  i=0
  var loadedBooks = []
  while (i < Object.keys(out.items).length){
    //(Google API Supports ISBN_10, ISBN_13, ASIN...)
    // Find and save only ISBN 13 codes to loadedBooks array
    if (out.items[i].volumeInfo.industryIdentifiers[0].identifier.length > 10){
      loadedBooks.push(out.items[i].volumeInfo.industryIdentifiers[0].identifier)
    } else {
      loadedBooks.push(out.items[i].volumeInfo.industryIdentifiers[1].identifier)
    }
    i++;
  }

  Array.prototype.diff = function(a) {
    if (this.filter(function(i) {return a.indexOf(i) < 0;}).length !== 0){
      console.log(this.filter(function(i) {return a.indexOf(i) < 0;}))
    }else{
      return "All books indexed";
    }
  };

  console.log(isbnslist.diff(loadedBooks))
})
.catch(err => { console.log({{ isbn.isbn }}); throw err });
{% endraw %}
{% endhighlight %}

The `loadedBooks` array saves ISBNs that returned from the Google Books API. The `Array.prototype.diff` compares the `loadedBooks` against our `isbnslist` and logs any left out ISBNs to the console.

[View the book list]({{ "/booklist/" | prepend: site.baseurl }})

### Full code
{% highlight java %}
{% raw %}
// Initializing variables for later
var book_url;
var imageLink;
var isbnslist = [];
var i=0;

{% assign isbncheck = site.data.booklist.books | jsonify %}

var isbns = {{ isbncheck }}

for ( i = 0; i < isbns.length; i++)
    {
      isbnslist.push(String(isbns[i].isbn));
    }

const url = isbnslist.reduce(
  (res, isbnslist, index) => res + (index ? "+OR+" : "") + "isbn:" + isbnslist,
  "https://www.googleapis.com/books/v1/volumes?q="
)

book_url = url + "+&fields=items(volumeInfo/description,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/industryIdentifiers/identifier)+&maxResults=40"

fetch(book_url)
.then(res => res.json())
.then((out) => {

  for (i=0; i < out.items.length; i++){
  document.getElementById("grid-container").innerHTML += "<div class="grid-item"> <a rel="nofollow" target="_blank" href="https://www.google.com/search?q=" + out.items[i].volumeInfo.title.replace(/ /g, "+") + "+by+" + out.items[i].volumeInfo.authors[0].replace(/ /g, "+") + ""> <div> <img alt="" + out.items[i].volumeInfo.title + " book cover" src="" + out.items[i].volumeInfo.imageLinks.thumbnail.replace("&edge=curl","") + ""> </div></a> <div> <h3><a rel="nofollow" target="_blank" href="https://www.google.com/search?q=" + out.items[i].volumeInfo.title.replace(/ /g, "+") + "+by+" + out.items[i].volumeInfo.authors[0].replace(/ /g, "+") + "">" + out.items[i].volumeInfo.title + "</a></h3> <p class="item">by " + out.items[i].volumeInfo.authors[0] + "</p> </div> </div>";
}

/*
  Title: out.items[0].volumeInfo.title
  Author: out.items[0].volumeInfo.authors[0]
  Thumbnail: out.items[0].volumeInfo.imageLinks.thumbnail
  Description: out.items[0].volumeInfo.description
*/

  i=0
  var loadedBooks = []
  while (i < Object.keys(out.items).length){
    if (out.items[i].volumeInfo.industryIdentifiers[0].identifier.length > 10){
      loadedBooks.push(out.items[i].volumeInfo.industryIdentifiers[0].identifier)
    } else {
      loadedBooks.push(out.items[i].volumeInfo.industryIdentifiers[1].identifier)
    }
    i++;
  }

  Array.prototype.diff = function(a) {
    if (this.filter(function(i) {return a.indexOf(i) < 0;}).length !== 0){
      console.log(this.filter(function(i) {return a.indexOf(i) < 0;}))
    }else{
      return "All books indexed";
    }
  };

  console.log(isbnslist.diff(loadedBooks))
})
.catch(err => { console.log({{ isbn.isbn }}); throw err });
{% endraw %}
{% endhighlight %}