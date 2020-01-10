---
layout: post
title: '2020 Presidential Candidate Website Comparison'
description: In a race over power of a nation how do the players compare?

date: January 10, 2020
---

<style>

ol {
  margin: 0 0 1.5em;
  padding: 0;
  counter-reset: item;
}

ol > li {
  margin: 0;
  padding: 0 0 0 34px;
  text-indent: -25px;
  list-style-type: none;
  counter-increment: item;
}

ol > li:before {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  width: 1em;
  padding-right: 0.5em;
  font-weight: 800;
  text-align: right;
  /* content: counter(item) "."; */
}

ol > li:before {
  content: "0" counter(item)".";
}
ol > li:nth-child(n+10):before {
  content: counter(item)".";
}

</style>

## Metrics traced:
- Candidate
- URL
- Homepage title
- Homepage size
- Sitemap size
- Google index
- Popup
- Minimum donation default
- Maximum donation default
- Standard deviation of donation default
- Web.dev basic metrics
- WAVE errors
- Campaign Fundraising
- Logo HEX values
- CMS

## Candidates
Only candidates with $12,000,000+ in campaign fundraising were traced. In order of campaign fundraising as of January 10, 2020 as shown on [opensecrets.org](https://www.opensecrets.org/2020-presidential-race).
1. Donald Trump
2. Bernie Sanders
3. Elizabeth Warren
4. Pete Buttigieg
5. Tom Steyer
6. Joe Biden
7. Kamala Harris
8. Cory Booker
9. Amy Klobuchar
10. Andrew Yang
11. John Delaney

## Homepage title
- Home \| Donald J. Trump for President
- Bernie Sanders - Official Campaign Website
- Elizabeth Warren
- Pete Buttigieg for President - Official Campaign Website
- Tom Steyer - Democrat for President in 2020
- Joe Biden for President: Official Campaign Website
- Kamala Harris For The People
- Cory 2020
- Amy Klobuchar for President: Let’s Get to Work!
- Yang2020 – Andrew Yang for President
- John Delaney for President \| Focus on the Future

## Homepage size
1. 0.39 MB: Donald Trump
2. 0.9 MB: Joe Biden
3. 2.8 MB: Cory Booker
4. 2.9 MB: Bernie Sanders
5. 3.6 MB: John Delaney
6. 3.5 MB: Kamala Harris
7. 4.3 MB: Elizabeth Warren
8. 5.1 MB: Amy Klobuchar
9. 5.9 MB: Pete Buttigieg
10. 3.8 MB: Andrew Yang
11. 7.0 MB: Tom Steyer

## URL
- www.donaldjtrump.com (canonical not defined)
- berniesanders.com (canonical not defined)
- elizabethwarren.com (canonical not defined)
- peteforamerica.com
- www.tomsteyer.com
- joebiden.com
- kamalaharris.org
- corybooker.com/homepage/
- amyklobuchar.com
- www.yang2020.com
- www.johndelaney.com

## Sitemap size
A sitemap is an offering of a map of a websites pages from the website itself, telling bots (like Google) what pages to add into (Google) search. I do find it interesting our top three in funding all provide no sitemap.

1. 676: Tom Steyer
2. 549: John Delaney
3. 334: Andrew Yang
4. 140: Cory Booker
5. 92: Joe Biden
6. 62: Amy Klobuchar
7. 59: Pete Buttigieg
0. no sitemap: Donald Trump, Bernie Sanders, Elizabeth Warren, Kamala Harris

## Google index
These are pages Google has crawled and added to Google search from a website.
1. 14,700: Bernie Sanders
2. 12,300: Elizabeth Warren
3. 2,450: Joe Biden
4. 1,530: John Delaney
05. 981: Donald Trump
06. 811: Tom Steyer
7. 735: Pete Buttigieg
8. 694: Cory Booker
9. 494: Kamala Harris
10. 487: Andrew Yang
11. 213: Amy Klobuchar

## Popup
This one may be a bit arbitrary if they A/B test popups based on specific conditions but it's still interesting.

- N/A: Donald Trump
- N/A: John Delaney
- Donate popup: Bernie Sanders
- Donate popup: Elizabeth Warren
- Survey popup: Pete Buttigieg
- Donate popup: Tom Steyer
- Email popup: Joe Biden
- Donate popup: Kamala Harris
- Donate popup: Cory Booker
- Donate popup: Andrew Yang
- Email & Donate popup: Amy Klobuchar

## Minimum donation default
This means the **lowest button on the *first* interaction I had with donation default buttons.** It's important to note this because I realized these defaults are A/B tested and are actually different than defaults you'll see across the same candidates website — also interesting to note candidates use [ActBlue](https://secure.actblue.com/) and [WinRed](https://winred.com/) as companies to handle this A/B testing (I assume). And I believe WinRed increases donations much better than ActBlue does, but that's for another time.

1. $25: Donald Trump
2. $15: Elizabeth Warren
3. $10: Andrew Yang
4. $5: Pete Buttigieg, Joe Biden, Kamala Harris, Cory Booker, Amy Klobuchar, John Delaney
5. $2.70: Bernie Sanders
6. $1: Tom Steyer

## Maximum donation default
This means the **largest button on the *first* interaction I had with donation default buttons.** 
1. $2,800: Donald Trump
2. $1,000: Bernie Sanders, Cory Booker
3. $500: Joe Biden
4. $250: Elizabeth Warren, Pete Buttigieg, Andrew Yang
5. $100: Kamala Harris, Amy Klobuchar
6. $50: Tom Steyer, John Delaney

## Standard deviation of donation default
How spread out the donation defaults are from each defaults average.

1. 923.99: Donald Trump
2. 372.75: Cory Booker
3. 336.74: Bernie Sanders
4. 169.3: Joe Biden
5. 87.04: Andrew Yang
6. 85.74: Elizabeth Warren
7. 85.60: Pete Buttigieg
8. 34.73: Kamala Harris
9. 34.73: Amy Klobuchar
10. 17.86: Tom Steyer
11. 17.45: John Delaney

## Web.dev Performance
Measures: First Contentful Paint, First Meaningful Paint, Speed Index, First CPU Idle, Time to Interactive, Max Potential First Input Delay, Total Blocking Time.

1. 79: Donald Trump
2. 74: Joe Biden
3. 64: Bernie Sanders
4. 60: Amy Klobuchar
5. 42: Andrew Yang
6. 39: Kamala Harris
7. 33: Pete Buttigieg
8. 31: Tom Steyer
9. 20: Cory Booker
10. 23: John Delaney
11. 3: Elizabeth Warren

## Web.dev Accessibility
These checks highlight opportunities to improve the accessibility of a website. Although only a subset of accessibility issues can be automatically detected.

1. 100: Andrew Yang
2. 94: Cory Booker
3. 92: Bernie Sanders, Tom Steyer, Kamala Harris
6. 89: Elizabeth Warren, Joe Biden
8. 88: Donald Trump
9. 71: John Delaney
10. 70: Pete Buttigieg
11. 64: Amy Klobuchar

## Web.dev Best Practices
These checks highlight opportunities to improve the overall code health of a website.

1. 100: Bernie Sanders
2. 85: Donald Trump, Kamala Harris
3. 77: Elizabeth Warren, Pete Buttigieg, Joe Biden, Cory Booker, Andrew Yang
4. 69: Tom Steyer, Amy Klobuchar, John Delaney

## Web.dev SEO
These checks ensure that a page is optimized for search engine results ranking.

1. 100: Bernie Sanders
2. 98: Donald Trump, Elizabeth Warren
3. 92: Pete Buttigieg, Kamala Harris, Andrew Yang
4. 91: Joe Biden, Amy Klobuchar
5. 89: Tom Steyer
6. 84: John Delaney
7. 83: Cory Booker

## WAVE Errors
Number of identified accessibility and Web Content Accessibility Guideline (WCAG) errors.

1. 0: Donald Trump, Bernie Sanders, Joe Biden
2. 1: Tom Steyer, Andrew Yang
3. 2: Kamala Harris
4. 3: Cory Booker
5. 4: Pete Buttigieg
6. 15: Elizabeth Warren, John Delaney
7. 36: Amy Klobuchar

## Campaign Fundraising
Only candidates with $12,000,000+ in campaign fundraising were traced. In order of campaign fundraising as of January 10, 2020 as shown on [opensecrets.org](https://www.opensecrets.org/2020-presidential-race).

1. $165,671,189: Donald Trump
2. $73,797,153: Bernie Sanders
3. $60,049,476: Elizabeth Warren
4. $50,936,509: Pete Buttigieg
5. $49,633,653: Tom Steyer
6. $36,760,280: Joe Biden
7. $22,796,614: Kamala Harris
8. $18,205,502: Cory Booker
9. $17,389,552: Amy Klobuchar
10. $15,020,173: Andrew Yang
11. $12,059,960: John Delaney

## Logo HEX Values
<ul>
    <li>
        <p>Donald Trump</p>
        <div style="background-color: #25245c; color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">Blue</div> Hex: #25245c</p></div>
        <div style="background-color: #c41d2b; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div>Red</div> Hex: #c41d2b</p></div>
    </li>
    <li>
        <p>Andrew Yang</p>
        <div style="background-color: #002D72; color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">White</div> Hex: #002D72</p></div>
        <div style="background-color: #DA3248; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div>Blue</div> Hex: #DA3248</p></div>
    </li>
    <li>
        <p>Joe Biden</p>
        <div style="background-color: #224192; color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">Blue</div> Hex: #224192</p></div>
        <div style="background-color: #EB2026; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div>Red</div> Hex: #EB2026</p></div>
    </li>
    <li>
        <p>Bernie Sanders</p>
        <div style="background-color: #005F92; color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">Blue</div> Hex: #005F92</p></div>
        <div style="background-color: #F40634; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div class="colorname">Red</div> Hex: #F40634</p></div>
    </li>
    <li>
        <p>Kamala Harris</p>
        <div style="background-color: #392d8b; color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">Blue</div> Hex: #392d8b</p></div>
        <div style="background-color: #f44e4e; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div>Red</div> Hex: #f44e4e</p></div>
    </li>
    <li>
        <p>Cory Booker</p>
        <div style="background-color: #09f; color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">Blue</div> Hex: #0099ff</p></div>
        <div style="background-color: #db3136; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div>Red</div> Hex: #db3136</p></div>
    </li>
    <li>
        <p>John Delaney</p>
        <div style="background-color: #84b8e3; color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">White</div> Hex: #84b8e3</p></div>
        <div style="background-color: #ee283b; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div>Blue</div> Hex: #ee283b</p></div>
    </li>
    <li>
        <p>Amy Klobuchar</p>
        <div style="background-color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">White</div> Hex: #FFFFFF</p></div>
        <div style="background-color: #1988FF; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div>Blue</div> Hex: #1988FF</p></div>
    </li>
    <li>
        <p>Elizabeth Warren</p>
        <div style="background-color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">White</div> Hex: #FFFFFF</p></div>
        <div style="background-color: #b7e4cf; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div class="colorname">Green-cyan</div> Hex: #b7e4cf</p></div>
    </li>
    <li>
        <p>Pete Buttigieg</p>
        <div style="background-color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">White</div> Hex: #FFFFFF</p></div>
        <div style="background-color: #1d253c; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div class="colorname">Blue</div> Hex: #1d253c</p></div>
    </li>
    <li>
        <p>Tom Steyer</p>
        <div style="background-color: #FFFFFF; padding: 20px; margin-bottom: 10px; float:left; display: inline-block;"><p><div class="colorname">White</div> Hex: #FFFFFF</p></div>
        <div style="background-color: #F05B3A; color: #FFFFFF; padding: 20px; margin-bottom: 10px; display: inline-block;"><p><div>Orange</div> Hex: #F05B3A</p></div>
    </li>

    
</ul>


## CMS
Content management system (CMS) is an application that uses a database to manage all content for a website.

- **Wordpress:** Tom Steyer, Joe Biden, Cory Booker, Amy Klobuchar, Andrew Yang, John Delaney
- **Contentful:** Elizabeth Warren
- **N/A:** Donald Trump, Bernie Sanders, Pete Buttigieg, Kamala Harris