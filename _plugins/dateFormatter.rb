require 'rubygems'
require 'bundler/setup'
require 'stamp'
require 'yaml'
require 'json'
require 'time'
# require 'date'
# require 'active_support'
# require 'active_support/time'
require 'active_support/core_ext/time'

# initialTimestamp: insert Datetime
# prettyTime: H:mm A · MMM DD, YYYY


root_dir =  File.expand_path(".", Dir.pwd)
yaml_dir = File.join(root_dir, "_data/noteLog.yaml")


# Load editable YAMl doc
file = File.open(yaml_dir, "r+")
yaml_array = YAML.load(File.read(yaml_dir))
file.close

yaml_array.each_with_index do |note, index|
if note.key?("prettyTime") == false then
    
    # 3:24 PM · May 25, 2021
    # p note["initialTimestamp"].asctime.in_time_zone("America/New_York")
    # newTime = note["initialTimestamp"] + Time.zone_offset('EST')
    # p newTime
    # p DateTime.parse(note["initialTimestamp"])
    puts note["initialTimestamp"].class
    if note["initialTimestamp"].class == String then
        note["initialTimestamp"] = Time.parse(note["initialTimestamp"])
    end
    puts note
    ENV["TZ"] = "US/Eastern"

    prettyTime = note["initialTimestamp"].in_time_zone("America/New_York").strftime("%I:%M %p · %b %d, %Y")
    p prettyTime
    # note["initialTimestamp"] = note["initialTimestamp"].strftime("%Y-%m-%dT%H:%M:%S%:z")
    # yaml_array[index]["prettyTime"]
    yaml_array[index]["prettyTime"] = prettyTime

    # puts note["initialTimestamp"].strftime("%I:%M %p · %b %d, %Y")
    # p note["initialTimestamp"].asctime.in_time_zone('Pacific Time (US & Canada)')
    # puts Time.parse(note["initialTimestamp"].asctime)
    # puts Time.parse(note["initialTimestamp"].asctime).in_time_zone('EST')
    # puts Time.parse(note["initialTimestamp"].asctime).in_time_zone('EST').strftime("%I:%M %p · %b %d, %Y")
    # p note["initialTimestamp"].strftime("%I:%M %p · %b %d, %Y %z")
    # p note["initialTimestamp"].stamp("3:24 PM · May 25, 2021")


    File.open(yaml_dir, "w") {|f| f.write(yaml_array.to_yaml)}

end
end

# Scan YAML for missing [date key thing]
# Convert initalTimestamp to prettyTime

