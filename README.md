# LukasMurdock.github.io

Personal website and blog built with Jekyll.

## Setup

1. Install Ruby and Bundler
2. Install dependencies:
   ```bash
   bundle install
   ```

## Development

Run the site locally:
```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

## Structure

- `_posts/` - Blog posts
- `_pages/` - Static pages
- `_data/` - Data files (booklists, resources, etc.)
- `_includes/` - Reusable components
- `_layouts/` - Page templates
- `_plugins/` - Custom Jekyll plugins
- `css/` - Stylesheets
- `js/` - JavaScript files
- `images/` - Image assets

## Features

- Blog with posts and pages
- Book tracking and recommendations
- Resource collections
- Custom plugins for data management
- Responsive design

## Build

Build the site for production:
```bash
bundle exec jekyll build
```

The built site will be in the `_site/` directory.

## Deployment

1. Build the site:
   ```bash
   bundle exec jekyll build
   ```

2. Deploy to Cloudflare Pages:
   ```bash
   npx wrangler deploy
   ```
