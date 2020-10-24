---
layout: post
title: 'Optimizing my book list'
description:  Ruby scripting to start making my book list static.
date: May 18, 2020
code: true
last_modified_at: 2020-06-11T17:48:03+0000
---

When I was [figuring out how to build a booklist](https://lukasmurdock.com/making-a-book-list/) that would let me add a book as easily as possible my solution was writing JavaScript to request the book data from Google Books API. Then another bit of JavaScript would insert that data into an HTML template and write the output onto the booklist page.

But I have a problem with this method. The page starts empty and every time someone loads the page it has to make an API call to get the data!

I mean my solution works. It does exactly what I wanted. But it’s extremely wasteful. So let’s optimize it.

There’s two files we’re working with here.
1. `Booklist.yaml`
2. `Booklist.json`

`Booklist.yaml` is for a list of book ISBNs that I can easily add to.

`Booklist.json` is for all the information I want on the books in booklist.yaml.

Right now that `booklist.json` file doesn’t exist, that data is just in the Google Books API call.

I want to have the `booklist.json` stored on my website and add any missing data (i.e when a new book is added to the `booklist.yaml`) from the Google Books API.

So I need to create the initial booklist.json file and then a script that will:
1. Compare `booklist.json` ISBNs against `booklist.yaml` ISBNs (find added books)
2. If a book was added, request the book data from the Google Books API
3. Append the new book data to `booklist.json`

And then I need to rewrite the booklist page on my site to build from the local `booklist.json` data.

My solution is to write the script in Ruby. Now technically this could be done in any programming language like Python, Java, Perl… take your pick.

But I wanted to make something that integrates easily with Jekyll site builds. I needed to find the simplest solution I could think of because I don’t know enough about the asset pipelines, build hooks, or gem plugins in Jekyll. If this site was built on a more “modern” SSG I imagine I could easily just shift when the JavaScript runs and this problem would be solved.

As Jekyll builds in Ruby, it can easily run any Ruby file on site build just by placing it in the `_plugins` folder so this is the solution I opted for.

With this solution the script should run whenever I build the site locally. It’s worth noting Github Pages does not support building custom plugins but this solution still works because I don’t need the data to update on every site build. The data will update whenever I build the site locally.

The next obstacle: I know nothing about Ruby. 

We need to figure out how to:
* Read YAML files
* Manipulate JSON file to compare it to YAML data
* Fetch API data
* Insert that data into JSON file

Having zero experience with Ruby this task was essentially trial and error with solutions to similar questions on Stack overflow and niche forums.

For the API fetch I found the [HTTParty gem](https://github.com/jnunemaker/httparty) would do the trick. After I got the script to:
1. Compare booklist.json ISBNs against `booklist.yaml` ISBNs (find added books)
2. If a book was added, request the book data from the Google Books API
3. Append the new book data to booklist.json

I remembered the Google Books API returns the book list in whatever order it feels like and I want to control the booklist order by what I set in `booklist.yaml`.

So I made another janky section of code to sort `booklist.json` by `booklist.yaml`.

After hours of trial and error here is the Ruby script. I’ll note that this is definitely not a well written script, but it works. If you know a way to optimize this feel free to reach out and let me know.

{% highlight ruby %}
require 'rubygems'
require 'bundler/setup'
require 'yaml'
require 'json'
require 'httparty'

# Set directories
root_dir =  File.expand_path(".", Dir.pwd)
yaml_dir = File.join(root_dir, "_data/newbooklist.yaml")
json_dir = File.join(root_dir, "_data/booklist.json")

# Load editable YAMl doc
file = File.open(yaml_dir, "r+")
isbn_array = YAML.load(File.read(yaml_dir))
file.close

# Load current JSON and save to readable var
file = File.open(json_dir, "r+")
books = JSON.load file
file.close

# Collect ISBNs from booklist.json
collected_ids = { "industryIdentifiers" => [] }

i = 0
while i < books["items"].size

    # id_array.push(books["items"][i]["volumeInfo"]["industryIdentifiers"][1].values)

    books["items"][i]["volumeInfo"]["industryIdentifiers"].each do |industryIdentifiers|
        collected_ids["industryIdentifiers"] << industryIdentifiers["identifier"]
    end


    i += 1
end

# Put all > 10 character ISBNs into a clean array
clean_array = []

i = 0
while i < collected_ids["industryIdentifiers"].size
    if collected_ids["industryIdentifiers"][i].length > 10 then
        clean_array.push( collected_ids["industryIdentifiers"][i])
    end
    i += 1
end

# Find and log missing ISBNs by substracting cleaned booklist.json by booklist.yaml
compare_array = (clean_array + isbn_array.map { |s| "#{s.gsub("isbn: ", "")}"}) - (clean_array & isbn_array.map { |s| "#{s.gsub("isbn: ", "")}"})

print "Missing: "
p compare_array

# If missing ISBNs (new ISBNs) call Google Books API
if compare_array.length > 0 then
    puts "Fetching Google Books API"
    # Create base query with inital object
    base_url = "https://www.googleapis.com/books/v1/volumes?q=" + compare_array[0].gsub(/\s+/, "")

    # If more than one missing, append +OR+ to each object and combine into single object
    if compare_array.length > 1 then
        base_url = base_url + (compare_array.drop(1).map { |s| "+OR+#{s.gsub(/\s+/, "")}"}).join()
    end

    # Finish URL join
    api_url = base_url + "+&fields=items(volumeInfo/description,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/industryIdentifiers/identifier)+&maxResults=40"

    # Get that data
    response = HTTParty.get(api_url)

    File.open("checkbooklist.json", "w") {|f| f.write(response)}
    file = File.open("checkbooklist.json", "r+")
    checklist = JSON.load file
    file.close

    if compare_array.length == 1 then
        checklist = checklist["items"][0]
    end

    sendData = books["items"].push(checklist)

    # Create final appended json list
    books["items"] = books["items"].replace(sendData)

    File.open(json_dir, "w") {|f| f.write(books.to_json)}

    File.delete('checkbooklist.json')

end


clean_yaml_array =  isbn_array.map { |s| "#{s.gsub("isbn: ", "")}"}

# Check booklist order (reverse because I want newest displayed first)
if clean_yaml_array != clean_array.reverse
puts "Booklist needs organized!"

    sorted_array = []

    # Sort booklist.json by booklist.yaml
    i = 0
    while sorted_array.size < books["items"].size do

            f = 0
            done = 0
            while done == 0 do

                if clean_yaml_array[i] == books["items"][f]["volumeInfo"]["industryIdentifiers"][0]["identifier"] || clean_yaml_array[i] == books["items"][f]["volumeInfo"]["industryIdentifiers"][1]["identifier"]
                    sorted_array.insert(i, (books["items"][f]))
                    done = 1
                end
                f += 1
            end

        i += 1
    end
    sorted_array = sorted_array.reverse
    # puts sorted_array.reverse.to_json
    books["items"] = books["items"].replace(sorted_array)

    File.open(json_dir, "w") {|f| f.write(books.to_json)}
    puts "Booklist organized!"
end


{% endhighlight %}

For further static optimization I would like to implement a handler for downloading and managing the book cover images but for now I’ll just leave those to call the Google Books API.