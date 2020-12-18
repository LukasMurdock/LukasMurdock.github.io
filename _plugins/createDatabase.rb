# # require 'rubygems'
# # require 'bundler/setup'
# # require 'yaml'
# # require 'json'
# # require 'httparty'
# require "sqlite3"

# # db = SQLite3::Database.new "./_data/test.db"

# begin
    
#     db = SQLite3::Database.open "./_data/database.db"
#     db.execute "CREATE TABLE IF NOT EXISTS alivetime(
#         Id INTEGER PRIMARY KEY, 
#         Name TEXT,
#         Category TEXT,
#         Tags TEXT,
#         Description TEXT,
#         isPrivate INTEGER,
#         dateAdded TEXT,
#         dateCompleted TEXT
#     )"
#     db.execute "INSERT INTO alivetime VALUES(1,'Thought Maybe','Writing', 'Tech,Invest,Daily', 'Rich visual content for the modern investor. Visual Capitalist is
#     a new way to discover business opportunities and learn about investment trends.', 0, '2020-12-16T19:21:37.000Z', '2020-12-16T19:21:37.000Z')"
    
#     # convert date to UTC before storing


# rescue SQLite3::Exception => e 
    
#     puts "Exception occurred"
#     puts e
    
# ensure
#     db.close if db
# end