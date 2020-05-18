require 'rubygems'
require 'bundler/setup'
require 'yaml'
require 'json'
require 'httparty'



# Check current booklist.json against booklist.yaml
# Pull isbns of missing books
# Hit google api
# Push info to booklist.json

# https://www.googleapis.com/books/v1/volumes?q=
# isbn:9781250237231
# +OR+isbn:9780316478526
# +OR+isbn:9780525540830
# +OR+isbn:9783037784501
# +OR+isbn:9780465050659
# +OR+isbn:9780812968255
# +&fields=items(volumeInfo/description,volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/industryIdentifiers/identifier)+&maxResults=40

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

## print books["items"][1]["volumeInfo"]["industryIdentifiers"][1].keys

## p books["items"][0]["volumeInfo"]["industryIdentifiers"][0]



## print books["items"][1]["volumeInfo"]["industryIdentifiers"][1]["identifier"]


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
## puts collected_ids["industryIdentifiers"].length
## puts collected_ids["industryIdentifiers"][1].length


# Put all > 10 character ISBNS into a clean array
# Remove duplicates,
clean_array = []

i = 0
while i < collected_ids["industryIdentifiers"].size
    if collected_ids["industryIdentifiers"][i].length > 10 then
        clean_array.push( collected_ids["industryIdentifiers"][i])
    end
    i += 1
end

## puts clean_array.length
## print clean_array

# Find missing ISBNs by substracting cleaned booklist.json by booklist.yaml
compare_array = (clean_array + isbn_array.map { |s| "#{s.gsub("isbn: ", "")}"}) - (clean_array & isbn_array.map { |s| "#{s.gsub("isbn: ", "")}"})

print "Missing: "
p compare_array

## print id_array
## print books["items"]["volumeInfo"]["industryIdentifiers"]


# If missing ISBNs (new ISBNs)
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

    # print checklist

    sendData = books["items"].push(checklist)

    # puts sendData.class
    # puts books["items"].class

    # id_array.push(books["items"][i]["volumeInfo"]["industryIdentifiers"][1].values)

    # Create final appended json list
    books["items"] = books["items"].replace(sendData)

    ### books["items"] << sendData.to_json

    
    # print books["items"].class
    # print books.to_json


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

