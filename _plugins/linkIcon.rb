# Inspired by https://gwern.net/design-graveyard#problems
# Plugin to add data-link-icon attribute to links
# Plugin init from: https://github.com/twinsunllc/jekyll-link-attributes/blob/main/lib/jekyll-link-attributes.rb

require 'nokogiri'



module Jekyll

  # Adjusts external links in HTML documents.
  class LinkIcons

    ICON_PATH = '/images/icons/'
    # The default configuration for the plugin.
    # Supported icon types:
    # - "svg" (+$NAME of the SVG filename in </static/img/icons/$NAME>
    # The link-icon for -- 'svg' type is overloaded to be a filename in `ICON_PATH${LINKICON}.svg`.
    # - "text"
    RULES = [
        { starts_with: '/', icon: '𝔏', type: 'text' },
        { includes: 'wikipedia.org', icon: 'wikipedia', type: 'svg' },
        { includes: 'github.com', icon: 'github', type: 'svg' },
        { includes: 'seths.blog', icon: 'SG', type: 'text' },
        { includes: 'lesswrong.com', icon: 'LW', type: 'text' },
        { includes: 'youtu.be', icon: 'youtube', type: 'svg' },
        { includes: 'youtube.com', icon: 'youtube', type: 'svg' },
    ]


    # Perform post_render processing on the specified document/page/post
    # @param [Object] article a Jekyll document, page, or post
    def self.post_render_html(article)
      config = article.site.config
      output = Nokogiri::HTML(article.output)
      output.css('a').each do |a|
        # only set data-link-icon if the link matches a rule
        RULES.each do |rule|
            # include and starts_with are mutually exclusive
            if (rule[:starts_with] && a['href'].start_with?(rule[:starts_with])) || (rule[:includes] && a['href'].include?(rule[:includes]))
               a['data-link-icon'] ||= rule[:icon]
               a['data-link-icon-type'] ||= rule[:type]
            end
        end
      end

      article.output = output.to_s
    end

    private
  end
end

Jekyll::Hooks.register :documents, :post_render do |document|
    Jekyll::LinkIcons.post_render_html(document)
end

Jekyll::Hooks.register :pages, :post_render do |page|
    next unless page.output_ext.eql?('.html')

    Jekyll::LinkIcons.post_render_html(page)
end

Jekyll::Hooks.register :posts, :post_render do |post|
    Jekyll::LinkIcons.post_render_html(post)
end
