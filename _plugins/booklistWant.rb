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

yaml_dir = File.join(root_dir, "_data/booklistWant.yaml")
json_dir = File.join(root_dir, "_data/booklist.json")
image_dir = File.join(root_dir, "/images/books/")


# Load editable YAMl doc
file = File.open(yaml_dir, "r+")
isbn_array = YAML.load(File.read(yaml_dir))
file.close


# Load current JSON and save to readable var
file = File.open(json_dir, "r+")
books = JSON.load file
file.close


collected_isbns = { "isbns" => [] }

# Collect notfound books
isbn_array["isbns"].each_with_index do |isbn, index|

    if isbn["notFound"] != false then

        puts isbn["isbn"]

        base_url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn["isbn"].to_s
        api_url = base_url + "+&fields=items(volumeInfo/description,volumeInfo/title,volumeInfo/subtitle,volumeInfo/authors,volumeInfo/imageLinks/thumbnail,volumeInfo/publishedDate,volumeInfo/pageCount,volumeInfo/categories)+&maxResults=40"


        puts api_url
        # Get that data
        response = HTTParty.get(api_url)

        # Save that data
        File.open("checkbooklist.json", "w") {|f| f.write(response)}
        file = File.open("checkbooklist.json", "r+")
        checklist = JSON.load file
        file.close

        # Get first item returned from API
        checklist = checklist["items"][0]
        puts checklist["volumeInfo"]["title"]
        puts checklist["volumeInfo"]["subtitle"]
        puts checklist["volumeInfo"]["authors"]
        # download image!
        # puts checklist["volumeInfo"]["imageLinks"]["thumbnail"]
        
        puts checklist["volumeInfo"]["publishedDate"]
        puts checklist["volumeInfo"]["pageCount"]
        puts checklist["volumeInfo"]["categories"]
        

        puts isbn_array["isbns"][index]
        if isbn["dateRead"] !~ /[^[:space:]]/ then
            isbn_array["isbns"][index]["dateWanted"] = Time.now.strftime("%B %d, %Y")
        end
        isbn_array["isbns"][index]["title"] = checklist["volumeInfo"]["title"]
        isbn_array["isbns"][index]["subtitle"] = checklist["volumeInfo"]["subtitle"]
        isbn_array["isbns"][index]["author"] = checklist["volumeInfo"]["authors"]
        isbn_array["isbns"][index]["publishedDate"] = checklist["volumeInfo"]["publishedDate"]
        isbn_array["isbns"][index]["pageCount"] = checklist["volumeInfo"]["pageCount"]
        isbn_array["isbns"][index]["categories"] = checklist["volumeInfo"]["categories"]
        isbn_array["isbns"][index]["image"] = ""
        if defined?(checklist["volumeInfo"]["imageLinks"]["thumbnail"]) != nil then
        isbn_array["isbns"][index]["image"] = checklist["volumeInfo"]["imageLinks"]["thumbnail"]
        end
        isbn_array["isbns"][index]["notFound"] = false

        File.open(yaml_dir, "w") {|f| f.write(isbn_array.to_yaml)}

    end
    
    # Download images to store interally
    if isbn["image"].include?("http") then
        # puts isbn["image"]

        image_title = isbn["title"].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
        image_url = isbn["image"]
        file_ext = File.extname(image_url) 
        p "Downloading #{image_title+file_ext}"

        tempfile = Down.download(image_url)
        # p tempfile.content_type
        scraped_ext = ".#{tempfile.content_type.partition('/').last}"
        FileUtils.mv(tempfile.path, image_dir+image_title+scraped_ext)
        # File.delete(tempfile.path)
        tempfile.unlink

        # p "TYPE: #{type["image"]}"
        p "Rewriting booklist with #{isbn["image"]}"
        newName = "/images/books/" + image_title + scraped_ext
        isbn["image"] = newName
        p "TYPE: #{isbn["image"]}"  
        File.open(yaml_dir, "w") {|f| f.write(isbn_array.to_yaml)}

    end


    ## This was for adding the dateRead data to all
    # if isbn["dateRead"] !~ /[^[:space:]]/ then
        
    #     isbn_array["isbns"][index]["dateRead"] = ""
    #     File.open(yaml_dir, "w") {|f| f.write(isbn_array.to_yaml)}
    # end

end