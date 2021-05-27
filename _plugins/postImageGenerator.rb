# require 'rubygems'
# require 'bundler/setup'
# require 'yaml'
# require 'json'
# require 'rsvg2'
# require 'victor'


# class ImageConvert
#     def self.svg_to_png(svg, width, height)
#         svg = RSVG::Handle.new_from_data(svg)
#         width   = width  ||=1200
#         height  = height ||=630
#         surface = Cairo::ImageSurface.new(Cairo::FORMAT_ARGB32, width, height)
#         context = Cairo::Context.new(surface)
#         context.render_rsvg_handle(svg)
#         b = StringIO.new
#         surface.write_to_png(b)
#         return b.string
#     end
# end


# svg = Victor::SVG.new width: 140, height: 100, style: { background: '#ddd' }

# svg.build do 
#   rect x: 10, y: 10, width: 120, height: 80, rx: 10, fill: '#666'
  
#   circle cx: 50, cy: 50, r: 30, fill: 'yellow'
#   circle cx: 58, cy: 32, r: 4, fill: 'black'
#   polygon points: %w[45,50 80,30 80,70], fill: '#666'

#   3.times do |i|
#     x = 80 + i*18
#     circle cx: x, cy: 50, r: 4, fill: 'yellow'
#   end
# end

# puts svg

# svg.save 'pacman'

# # svg_data = params[:file][:tempfile].read
# # svg_data = 
# png_data = ImageConvert.svg_to_png(svg, 1200, 630)