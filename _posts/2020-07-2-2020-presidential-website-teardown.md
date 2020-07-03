---
layout: post
title: '2020 U.S. Presidential Website Teardown'
description: "Comparing the 2020 Presidential Candidates Websites."
date: July 2, 2020
---
<style>
table {
    min-width: 100%;
}
table td {
    border-top: 2px solid #D6D6D6;  
}

.number {
    text-align: right;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 8px;
    padding: 8px;
    position: absolute;
    z-index: 1;
    margin-left: -60px;
    top: -5px;
    left: 150%;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 50%;
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>

I dove into the 2020 Presidential candidate websites to breakdown and compare the two.
- [Direct Comparison](#direct-comparison): Total pages, backlinks, web vitals, page titles, metadata, duplicate content, robots and directives, and more.
- [Subdomain Comparison](#subdomain-comparison): Site architecture of subdomains.
- [Subfolder Comparison](#subfolder-comparison): Site architecture of subfolders.
- [BuiltWith Comparison](#builtwith-comparison): What each website is built with.
- [Title Keyword Density](#title-keyword-density): Number of times a keyword or phrase appears in the title.
- [Description Keyword Density](#description-keyword-density): Number of times a keyword or phrase appears in the description.
- [Non-political Analysis](#non-political-analysis)


Here’s what I found.

## Direct Comparison
<div style="overflow-x: auto">
<table>
  <tr>
    <th style="width: 20%;">&nbsp;</th>
    <th style="width: 40%;">joebiden.com</th>
    <th style="width: 40%;">donaldjtrump.com</th>
  </tr>
  <tr>
    <td>
    <div class="tooltip">Minimum Donation Default
    <span class="tooltiptext">The lowest default on the first homepage popup.</span>
    </div>
    </td>
    <td class="number">$15</td>
    <td class="number">$25</td>
  </tr>
  <tr>
    <td>
    <div class="tooltip">Maximum Donation Default
    <span class="tooltiptext">The highest default on the first homepage popup.</span>
    </div>
    </td>
    <td class="number">$1,000</td>
    <td class="number">$2,800</td>
  </tr>
    <tr>
        <td>Total Internal URLs</td>
        <td class="number">496</td>
        <td class="number">810</td>
    </tr>
    <tr>
        <td>Total External URLs</td>
        <td class="number">1,172</td>
        <td class="number">4,159</td>
    </tr>
    <tr>
        <td>HTML Pages</td>
        <td class="number">203</td>
        <td class="number">774</td>
    </tr>
    <tr>
        <td>JS Pages</td>
        <td class="number">21</td>
        <td class="number">14</td>
    </tr>
    <tr>
        <td>CSS Pages</td>
        <td class="number">6</td>
        <td class="number">7</td>
    </tr>
    <tr>
        <td>Images</td>
        <td class="number">220</td>
        <td class="number">15</td>
    </tr>
    <tr>
        <td>HTTP Protocol</td>
        <td class="number">0</td>
        <td class="number">3</td>
    </tr>
    <tr>
        <td>Uppercase URLs</td>
        <td class="number">5</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>Duplicate URLs</td>
        <td class="number">2</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>Parameter URLs</td>
        <td class="number">27</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>Average Title Length</td>
        <td class="number">60</td>
        <td class="number">90</td>
    </tr>
    <tr>
        <td>Duplicate Titles</td>
        <td class="number">0</td>
        <td class="number">48</td>
    </tr>
    <tr>
        <td>Missing Meta Description</td>
        <td class="number">74</td>
        <td class="number">2</td>
    </tr>
    <tr>
        <td>Average Meta Description Length</td>
        <td class="number">69</td>
        <td class="number">48</td>
    </tr>
    <tr>
        <td>Duplicate Meta Descriptions</td>
        <td class="number">77</td>
        <td class="number">764</td>
    </tr>
    <tr>
        <td>Average H1-1 Length</td>
        <td class="number">35</td>
        <td class="number">66</td>
    </tr>
    <tr>
        <td>Missing H1</td>
        <td class="number">15</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>Pagination</td>
        <td class="number">24</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>Noindex</td>
        <td class="number">11</td>
        <td class="number">2</td>
    </tr>
    <tr>
        <td>Nofollow</td>
        <td class="number">0</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>Contains hreflang</td>
        <td class="number">41</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>Ahref’s Backlinks</td>
        <td class="number">1,982,847</td>
        <td class="number">4,172,806</td>
    </tr>
    <tr>
        <td>Backlink Dofollow Percentage</td>
        <td class="number">98</td>
        <td class="number">71</td>
    </tr>
    <tr>
        <td>Ahrefs Referring Domains</td>
        <td class="number">9,923</td>
        <td class="number">27,110</td>
    </tr>
    <tr>
        <td>Domain Dofollow Percentage</td>
        <td class="number">84</td>
        <td class="number">84</td>
    </tr>
    <tr>
        <td>Top Referring Page by URL Rating</td>
        <td>https://www.atr.org/</td>
        <td>https://deadline.com/</td>
    </tr>
    <tr>
        <td>Top Page</td>
        <td>joebiden.com</td>
        <td>shop.donaldjtrump.com</td>
    </tr>
    <tr>
        <td>Top 5 anchors</td>
        <td>joe biden, plan, website, joebiden.com, biden</td>
        <td>donald trump, donaldjtrump.com, here, website, statement</td>
    </tr>
    <tr>
        <td>First Contentful Paint (FCP) (seconds)</td>
        <td class="number">1</td>
        <td class="number">1.9</td>
    </tr>
    <tr>
        <td>First Input Delay (FID) (milliseconds)</td>
        <td class="number">13</td>
        <td class="number">12</td>
    </tr>
    <tr>
        <td>Largest Contentful Paint (LCP) (seconds)</td>
        <td class="number">1.4</td>
        <td class="number">2.3</td>
    </tr>
    <tr>
        <td>Cumulative Layout Shift (CLS)</td>
        <td class="number">0.01</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>Indexed</td>
        <td class="number">2,490</td>
        <td class="number">3,660</td>
    </tr>
    <tr>
        <td>Indexed Week June 14-21</td>
        <td class="number">26</td>
        <td class="number">182</td>
    </tr>
</table>
</div>
---

## Subdomain Comparison

### Subdomains on joebiden.com

<table>
  <tr>
    <th style="width: 20%;">&nbsp;</th>
    <th style="width: 40%;">Description</th>
    <th style="width: 40%;">Pages Indexed</th>
  </tr>
    <tr>
        <td>go.</td>
        <td>Form Handling</td>
        <td class="number">1,770</td>
    </tr>
    <tr>
        <td>secure.</td>
        <td>Form Handling</td>
        <td class="number">226</td>
    </tr>
    <tr>
        <td>store.</td>
        <td>eCommerce</td>
        <td class="number">197</td>
    </tr>
    <tr>
        <td>live.</td>
        <td>Live Streams</td>
        <td class="number">39</td>
    </tr>
    <tr>
        <td>bfd.</td>
        <td>Biden Fundraising Dashboard</td>
        <td class="number">5</td>
    </tr>
    <tr>
        <td>test.</td>
        <td>Visible Test Site</td>
        <td class="number">0</td>
    </tr>
</table>



### Subdomains on donaldjtrump.com

<table>
  <tr>
    <th style="width: 20%;">&nbsp;</th>
    <th style="width: 40%;">Description</th>
    <th style="width: 40%;">Pages Indexed</th>
  </tr>
    <tr>
        <td>shop.</td>
        <td>eCommerce</td>
        <td class="number">649</td>
    </tr>
    <tr>
        <td>action.</td>
        <td>Clone of gop.com</td>
        <td class="number">553</td>
    </tr>
    <tr>
        <td>secure.</td>
        <td>Donation Page — Max Default: $2,800</td>
        <td class="number">359</td>
    </tr>
    <tr>
        <td>donate.</td>
        <td>Donation Page — Max Default: $33,900</td>
        <td class="number">204</td>
    </tr>
    <tr>
        <td>assets.</td>
        <td>Asset Hosting</td>
        <td class="number">160</td>
    </tr>
    <tr>
        <td>es.</td>
        <td>Spanish Version of Site</td>
        <td class="number">57</td>
    </tr>
    <tr>
        <td>parscale-djtweb.</td>
        <td>Near Copy of donaldjtrump.com</td>
        <td class="number">44</td>
    </tr>
    <tr>
        <td>forms.</td>
        <td>Form Handling</td>
        <td class="number">33</td>
    </tr>
    <tr>
        <td>blackvoices.</td>
        <td>Landing Page</td>
        <td class="number">22</td>
    </tr>
    <tr>
        <td>women.</td>
        <td>Landing Page</td>
        <td class="number">5</td>
    </tr>
    <tr>
        <td>vote.</td>
        <td>Form Page</td>
        <td class="number">3</td>
    </tr>
    <tr>
        <td>veterans.</td>
        <td>Landing Page</td>
        <td class="number">2</td>
    </tr>
    <tr>
        <td>prolifevoices.</td>
        <td>Landing Page</td>
        <td class="number">2</td>
    </tr>
    <tr>
        <td>democrats.</td>
        <td>Landing Page</td>
        <td class="number">2</td>
    </tr>
    <tr>
        <td>moms.</td>
        <td>Landing Page</td>
        <td class="number">2</td>
    </tr>
    <tr>
        <td>workers.</td>
        <td>Landing Page</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>greekvoices.</td>
        <td>Landing Page</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>cops.</td>
        <td>Landing Page</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>asians.</td>
        <td>Landing Page</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>sheriffs.</td>
        <td>Landing Page</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>militaryfamilies.</td>
        <td>Landing Page</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>irishamericans.</td>
        <td>Landing Page</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>offline.</td>
        <td>Donation Page — Max Default: $100</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>talk.</td>
        <td>Donation Page — Max Default: $100</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>dev-secure.</td>
        <td>Dev Login</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>qa-vote.</td>
        <td>Dev Login</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>dev-vote.</td>
        <td>Dev Login</td>
        <td class="number">0</td>
    </tr>
    <tr>
        <td>mailer.</td>
        <td>Donation Page — Max Default: $100</td>
        <td class="number">0</td>
    </tr>
</table>

---

## Subfolder Comparison

### Subfolders on joebiden.com

<table>
  <tr>
    <th style="width: 40%;">Subfolder</th>
    <th style="width: 40%;">Pages Crawled</th>
  </tr>
    <tr>
        <td>/wp-content/</td>
        <td class="number">100</td>
    </tr>
    <tr>
        <td>/es/</td>
        <td class="number">20</td>
    </tr>
</table>

### Subfolders on donaldjtrump.com

<table>
  <tr>
    <th style="width: 50%;">Subfolder</th>
    <th style="width: 50%;">Pages Crawled</th>
  </tr>
    <tr>
        <td>/media/</td>
        <td class="number">742</td>
    </tr>
    <tr>
        <td>/assets/</td>
        <td class="number">31</td>
    </tr>
    <tr>
        <td>/get-involved/</td>
        <td class="number">16</td>
    </tr>
    <tr>
        <td>/pages/</td>
        <td class="number">1</td>
    </tr>
    <tr>
        <td>/rallies/</td>
        <td class="number">1</td>
    </tr>
</table>

---

## BuiltWith Comparison

### Tools on joebiden.com

<table>
  <tr>
    <th style="width: 50%;">Tool</th>
    <th style="width: 50%;">Category</th>
  </tr>
    <tr>
        <td>Google Optimize</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Google Analytics</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Facebook Conversion Tracking</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Facebook Pixel</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Twitter Conversion Tracking</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Google Conversion Tracking</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>MixPanel</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>MediaMath</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Yoast SEO Premium</td>
        <td>Widgets (WordPress)</td>
    </tr>
    <tr>
        <td>Autoptimize</td>
        <td>Widgets (WordPress)</td>
    </tr>
    <tr>
        <td>GStatic</td>
        <td>CDN</td>
    </tr>
    <tr>
        <td>WordPress</td>
        <td>CMS</td>
    </tr>
    <tr>
        <td>Pantheon</td>
        <td>Web hosting</td>
    </tr>
    <tr>
        <td>Amazon</td>
        <td>Web hosting</td>
    </tr>
    <tr>
        <td>Google</td>
        <td>Web hosting</td>
    </tr>
    <tr>
        <td>Blue Slate Digital</td>
        <td>Email Hosting Provider</td>
    </tr>
    <tr>
        <td>Mailchimp</td>
        <td>Email Hosting Provider</td>
    </tr>
    <tr>
        <td>Shopify</td>
        <td>eCommerce</td>
    </tr>
</table>


### Tools on donaldjtrump.com

<table>
  <tr>
    <th style="width: 50%;">Tool</th>
    <th style="width: 50%;">Category</th>
  </tr>
    <tr>
        <td>Optimizely</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Google Analytics</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Facebook Conversion Tracking</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Facebook Pixel</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Twitter Analytics<br />(No longer detected Feb 2020)</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>iGoDigital<br />(Aquired by ExactTarget, which was aquired by Salesforce)</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Yahoo Web Analytics</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>MediaMath<br />(No longer detected Jan 2017)</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Adobe Marketing Cloud<br />(No longer detected Sep 2017)</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>Bing Universal Event Tracking<br />(No longer detected Sep 2017)</td>
        <td>Analytics</td>
    </tr>
    <tr>
        <td>ExpressionEngine</td>
        <td>CMS</td>
    </tr>
    <tr>
        <td>Cloudflare Hosting</td>
        <td>CDN</td>
    </tr>
    <tr>
        <td>GStatic</td>
        <td>CDN</td>
    </tr>
    <tr>
        <td>Yahoo Image CDN</td>
        <td>CDN</td>
    </tr>
    <tr>
        <td>Cloudflare Hosting</td>
        <td>Web Hosting</td>
    </tr>
    <tr>
        <td>SendGrid</td>
        <td>Email Hosting Provider</td>
    </tr>
    <tr>
        <td>Adestro</td>
        <td>Email Hosting Provider</td>
    </tr>
    <tr>
        <td>StrongView</td>
        <td>Email Hosting Provider</td>
    </tr>
    <tr>
        <td>ProofPoint</td>
        <td>Email Hosting Provider</td>
    </tr>
    <tr>
        <td>Microsoft Exchange Online</td>
        <td>Email Hosting Provider</td>
    </tr>
</table>

---

## Title Keyword Density

### Title Keyword Density on joebiden.com
<table>
  <tr>
    <th>No. Words</th>
    <th>Word</th>
    <th>Density</th>
  </tr>
  <tr>
    <td>1</td>
    <td>joe</td>
    <td>212</td>
  </tr>
  <tr>
    <td>1</td>
    <td>biden</td>
    <td>151</td>
  </tr>
  <tr>
    <td>1</td>
    <td>president</td>
    <td>88</td>
  </tr>
  <tr>
    <td>1</td>
    <td>team</td>
    <td>71</td>
  </tr>
  <tr>
    <td>1</td>
    <td>store</td>
    <td>65</td>
  </tr>
  <tr>
    <td>1</td>
    <td>plan</td>
    <td>40</td>
  </tr>
  <tr>
    <td>1</td>
    <td>page</td>
    <td>24</td>
  </tr>
  <tr>
    <td>1</td>
    <td>campaign</td>
    <td>21</td>
  </tr>
  <tr>
    <td>1</td>
    <td>biden’s</td>
    <td>20</td>
  </tr>
  <tr>
    <td>1</td>
    <td>pride</td>
    <td>20</td>
  </tr>
  <tr>
    <td>2</td>
    <td>joe biden</td>
    <td>108</td>
  </tr>
  <tr>
    <td>2</td>
    <td>biden president</td>
    <td>87</td>
  </tr>
  <tr>
    <td>2</td>
    <td>team joe</td>
    <td>69</td>
  </tr>
  <tr>
    <td>2</td>
    <td>page team</td>
    <td>65</td>
  </tr>
  <tr>
    <td>2</td>
    <td>joe biden’s</td>
    <td>24</td>
  </tr>
  <tr>
    <td>2</td>
    <td>president official</td>
    <td>20</td>
  </tr>
  <tr>
    <td>2</td>
    <td>official campaign</td>
    <td>18</td>
  </tr>
  <tr>
    <td>2</td>
    <td>campaign website</td>
    <td>18</td>
  </tr>
  <tr>
    <td>2</td>
    <td>biden plan</td>
    <td>13</td>
  </tr>
  <tr>
    <td>3</td>
    <td>joe biden president</td>
    <td>79</td>
  </tr>
  <tr>
    <td>3</td>
    <td>team joe store</td>
    <td>65</td>
  </tr>
  <tr>
    <td>3</td>
    <td>page team joe</td>
    <td>24</td>
  </tr>
  <tr>
    <td>3</td>
    <td>biden president official</td>
    <td>18</td>
  </tr>
  <tr>
    <td>3</td>
    <td>presidential official campaign</td>
    <td>18</td>
  </tr>
  <tr>
    <td>3</td>
    <td>official campaign website</td>
    <td>18</td>
  </tr>
  <tr>
    <td>3</td>
    <td>tee team joe</td>
    <td>13</td>
  </tr>
  <tr>
    <td>3</td>
    <td>el plan biden</td>
    <td>7</td>
  </tr>
  <tr>
    <td>3</td>
    <td>apparel page team</td>
    <td>6</td>
  </tr>
  <tr>
    <td>3</td>
    <td>apparel tees page</td>
    <td>6</td>
  </tr>
</table>

### Title Keyword Density on donaldjtrump.com
<table>
  <tr>
    <th style="width: 20%">No. Words</th>
    <th style="width: 60%">Word</th>
    <th style="width: 20%">Density</th>
  </tr>
  <tr>
    <td>1</td>
    <td>trump</td>
    <td>1200</td>
  </tr>
  <tr>
    <td>1</td>
    <td>president</td>
    <td>868</td>
  </tr>
  <tr>
    <td>1</td>
    <td>donald</td>
    <td>778</td>
  </tr>
  <tr>
    <td>1</td>
    <td>campaign</td>
    <td>162</td>
  </tr>
  <tr>
    <td>1</td>
    <td>biden</td>
    <td>130</td>
  </tr>
  <tr>
    <td>1</td>
    <td>joe</td>
    <td>126</td>
  </tr>
  <tr>
    <td>1</td>
    <td>online</td>
    <td>90</td>
  </tr>
  <tr>
    <td>1</td>
    <td>news</td>
    <td>78</td>
  </tr>
  <tr>
    <td>1</td>
    <td>real</td>
    <td>70</td>
  </tr>
  <tr>
    <td>1</td>
    <td>watch</td>
    <td>69</td>
  </tr>
  <tr>
    <td>2</td>
    <td>trump president</td>
    <td>765</td>
  </tr>
  <tr>
    <td>2</td>
    <td>trump campaign</td>
    <td>156</td>
  </tr>
  <tr>
    <td>2</td>
    <td>joe biden</td>
    <td>89</td>
  </tr>
  <tr>
    <td>2</td>
    <td>president trump</td>
    <td>73</td>
  </tr>
  <tr>
    <td>2</td>
    <td>real news</td>
    <td>62</td>
  </tr>
  <tr>
    <td>2</td>
    <td>trump online</td>
    <td>61</td>
  </tr>
  <tr>
    <td>2</td>
    <td>news insights</td>
    <td>46</td>
  </tr>
  <tr>
    <td>2</td>
    <td>campaign statement</td>
    <td>46</td>
  </tr>
  <tr>
    <td>2</td>
    <td>team trump</td>
    <td>43</td>
  </tr>
  <tr>
    <td>2</td>
    <td>joe biden’s</td>
    <td>30</td>
  </tr>
  <tr>
    <td>3</td>
    <td>real news insights</td>
    <td>46</td>
  </tr>
  <tr>
    <td>3</td>
    <td>trump campaign statement</td>
    <td>46</td>
  </tr>
  <tr>
    <td>3</td>
    <td>team trump online</td>
    <td>41</td>
  </tr>
  <tr>
    <td>3</td>
    <td>trump campaign announces</td>
    <td>30</td>
  </tr>
  <tr>
    <td>3</td>
    <td>trump campaign hosted</td>
    <td>23</td>
  </tr>
  <tr>
    <td>3</td>
    <td>black voices trump</td>
    <td>20</td>
  </tr>
  <tr>
    <td>3</td>
    <td>real news update</td>
    <td>16</td>
  </tr>
  <tr>
    <td>3</td>
    <td>war room weekly</td>
    <td>15</td>
  </tr>
  <tr>
    <td>3</td>
    <td>campaign hosted team</td>
    <td>13</td>
  </tr>
</table>

---

## Description Keyword Density

### Description Keyword Density on joebiden.com
<table>
  <tr>
    <th style="width: 20%">No. Words</th>
    <th style="width: 60%">Word</th>
    <th style="width: 20%">Density</th>
  </tr>
  <tr>
    <td>1</td>
    <td>biden</td>
    <td>83</td>
  </tr>
  <tr>
    <td>1</td>
    <td>president</td>
    <td>73</td>
  </tr>
  <tr>
    <td>1</td>
    <td>official</td>
    <td>71</td>
  </tr>
  <tr>
    <td>1</td>
    <td>webstore</td>
    <td>71</td>
  </tr>
  <tr>
    <td>1</td>
    <td>joe</td>
    <td>31</td>
  </tr>
  <tr>
    <td>1</td>
    <td>biden’s</td>
    <td>16</td>
  </tr>
  <tr>
    <td>1</td>
    <td>plan</td>
    <td>12</td>
  </tr>
  <tr>
    <td>1</td>
    <td>join</td>
    <td>6</td>
  </tr>
  <tr>
    <td>1</td>
    <td>americans</td>
    <td>6</td>
  </tr>
  <tr>
    <td>1</td>
    <td>american</td>
    <td>5</td>
  </tr>
  <tr>
    <td>2</td>
    <td>biden president</td>
    <td>72</td>
  </tr>
  <tr>
    <td>2</td>
    <td>official webstore</td>
    <td>71</td>
  </tr>
  <tr>
    <td>2</td>
    <td>webstore biden</td>
    <td>71</td>
  </tr>
  <tr>
    <td>2</td>
    <td>joe biden’s</td>
    <td>16</td>
  </tr>
  <tr>
    <td>2</td>
    <td>joe biden</td>
    <td>11</td>
  </tr>
  <tr>
    <td>2</td>
    <td>biden’s plan</td>
    <td>7</td>
  </tr>
  <tr>
    <td>2</td>
    <td>team joe</td>
    <td>4</td>
  </tr>
  <tr>
    <td>2</td>
    <td>health care</td>
    <td>4</td>
  </tr>
  <tr>
    <td>2</td>
    <td>middle class</td>
    <td>3</td>
  </tr>
  <tr>
    <td>2</td>
    <td>get involved</td>
    <td>3</td>
  </tr>
  <tr>
    <td>3</td>
    <td>official webstore biden</td>
    <td>71</td>
  </tr>
  <tr>
    <td>3</td>
    <td>webstore biden president</td>
    <td>71</td>
  </tr>
  <tr>
    <td>3</td>
    <td>joe biden’s plan</td>
    <td>7</td>
  </tr>
  <tr>
    <td>3</td>
    <td>get involved joe</td>
    <td>3</td>
  </tr>
  <tr>
    <td>3</td>
    <td>involved joe biden’s</td>
    <td>3</td>
  </tr>
  <tr>
    <td>3</td>
    <td>joe biden’s campaign</td>
    <td>3</td>
  </tr>
  <tr>
    <td>3</td>
    <td>biden’s plan education</td>
    <td>3</td>
  </tr>
  <tr>
    <td>3</td>
    <td>plan education beyond</td>
    <td>3</td>
  </tr>
  <tr>
    <td>3</td>
    <td>education beyond high</td>
    <td>3</td>
  </tr>
  <tr>
    <td>3</td>
    <td>beyond high school</td>
    <td>3</td>
  </tr>
</table>

### Description Keyword Density on donaldjtrump.com

<table>
  <tr>
    <th style="width: 20%">No. Words</th>
    <th style="width: 60%">Word</th>
    <th style="width: 20%">Density</th>
  </tr>
  <tr>
    <td>8</td>
    <td>Help continue our promise to Keep America Great!</td>
    <td>764</td>
  </tr>
</table>

--- 

## Non-political Analysis

As noted in a previous analysis, donaldjtrump.com boasts a significantly higher donation default across the board. Taking another moment on forms, donaldjtrump.com hosts a slew of dark patterns within its forms. Dark patterns are items carefully crafted to trick users into doing things they might not otherwise do. I’ll call the higher donation defaults a form of a dark pattern, but the more prominent one is the opt-out monthly recurring donation. The default on joebiden.com is “No, donate once.”

**Donaldjtrump.com has nearly double the number of pages as joebiden.com.** The pages on donaldjtrump.com primarily come from the /media/ subfolder.

**For the most part, pages on donaldjtrump.com have duplicate unique meta descriptions.** Almost all pages contain “Help continue our promise to Keep America Great!”

Donaldjtrump.com opted to use a subdomain for Spanish versions of the site, while joebiden.com uses hreflang.

**Donaldjtrump.com has over double the number of backlinks compared to joebiden.com.** But joebiden.com has 27 percent more dofollow links.

**Donaldjtrump.com has nearly three times the amount of referring domains** and has the same dofollow percentage as joebiden.com.

The top referring page for donaldjtrump.com is an online news site focused primarily on the entertainment industry. The top referring page for joebiden.com is a politically conservative U.S. advocacy group.

**The top page on donaldjtrump.com is the shopping page…**

**During the week on June 14-21, donaldjtrump.com had seven times more pages indexed than joebiden.com.**

The top two subdomains on donaldjtrump.com are for eCommerce and a clone of gop.com. While the top two subdomains for joebiden.com are both for form handling.

**The subdomain donate.donaldjtrump.com has a maximum donation default of $33,900…**

Donaldjtrump.com has a slew of subdomains that act as landing pages targeting (in order of indexed pages): black voices, women, veterans, pro-life voices, democrats, moms, workers, greek voices, cops, asians, sheriffs, military families, and irish americans.

Donaldjtrump.com has three dev login subdomains, while joebiden.com has a test subdomain.

Donaldjtrump.com has subfolders for media and assets, while joebiden.com has subfolders for WordPress content and espanol.

**Donaldjtrump.com has tried MANY tools for analytics and optimization.** MediaMath, an analytics tool still used by joebiden.com, was no longer detected on donaldjtrump.com starting January 2017. Twitter Analytics was also no longer detected starting in February 2020. Interestingly Yahoo Web Analytics is still detected on donaldjtrump.com.

**Donaldjtrump.com CMS:** Expression Engine, **Web Host:** Cloudflare  
**Joebiden.com CMS:** WordPress, **Web Host:** Pantheon


Aside from the candidate, **titles on joebiden.com tend to focus on his team and his campaign**. While **titles on donaldjtrump.com tend to focus on Joe Biden and real news.**







--- 

If you see a mistake or have a question, feel free to reach out [through this site](/contact/) or on [Twitter](https://www.twitter.com/Lukasauras_Rex).