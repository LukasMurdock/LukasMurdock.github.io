# # require 'rubygems'
# # require 'bundler/setup'
# # require 'yaml'
# # require 'json'
# # require 'httparty'
# require "sqlite3"

# # db = SQLite3::Database.new "./_data/test.db"

# begin
    
#     db = SQLite3::Database.open "./_data/test.db"
    
#     stm = db.prepare "SELECT * FROM Cars LIMIT 5" 
#     rs = stm.execute 
    
#     p rs.class

#     rs.each do |row|
#         p row.join "\s"
#     end
           
# rescue SQLite3::Exception => e 
    
#     puts "Exception occurred"
#     puts e
    
# ensure
#     stm.close if stm
#     db.close if db
# end