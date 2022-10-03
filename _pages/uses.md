---
layout: page
title: Uses
description: The tools Lukas Murdock uses
last_modified_at: 2021-06-01T14:33:01-0400
---

## Hardware
### Hardware that goes with me everywhere
* 2012 MacBook Pro
    - 2TB SSD (manual upgrade)
    - 16GB RAM (manual upgrade)
* <del>2014 MacBook Air</del>
* 2018 MacBook Pro 15-Inch (MR932LL/A)
    - 250GB SSD
    - 16GB RAM
* <del>iPhone 5s</del>
* <del>iPhone 8</del> (switched April 2021)
* iPhone 12 mini
* Kindle Paperwhite 10th Gen (PQ94WIF)

### Other Hardware
* Custom PC built in 2016
    - Dead, needs repairs
* <del>BenQ 24" RL2455HM Monitor</del>
* Samsung 34" SJ55W Ultra WQHD Monitor
    * (alt) Lenovo ThinkVision 22" T2254pC – mounted vertically
* Philips Hue Go Light



{% capture desktopApps %}
Google Chrome | https://lukasmurdock.com/chrome-extensions/::
Brave Browser | https://brave.com/::
Visual Studio Code | https://lukasmurdock.com/vs-code/::
Dash | https://kapeli.com/dash::
iTerm2 | https://lukasmurdock.com/command-line::
iA Writer | https://ia.net/writer::
Spark mail | https://sparkmailapp.com/::
TickTick | https://ticktick.com/::
Slack | https://slack.com/::
Radio Silence | https://radiosilenceapp.com/::
Signal | https://signal.org/en/::
Books.app | https://www.apple.com/apple-books/::
Horo | https://matthewpalmer.net/horo-free-timer-mac/::
Rocket | https://matthewpalmer.net/rocket/::
NetNewsWire | https://netnewswire.com/::
Readwise | https://readwise.io/::
Vector Magic | https://vectormagic.com/::
Carbon Copy Cloner | https://bombich.com/::
Transmission | https://transmissionbt.com/::
Affinity Suite | https://affinity.serif.com/en-gb/::
Adobe Suite | https://www.adobe.com/creativecloud.html::
DaVinci Resolve | https://www.blackmagicdesign.com/products/davinciresolve/::
1Password | https://1password.com/::
Keyboard Maestro | https://www.keyboardmaestro.com/main/::
Rocket | https://matthewpalmer.net/rocket/::
Swish | https://highlyopinionated.co/swish/::
Ethical.net | https://ethical.net/resources/::
{% endcapture %}


{% assign desktopAppsArray = desktopApps | split: '::'%}

## Desktop Apps
<ol>
{% for product in desktopAppsArray %}
  {% assign product_vals = product | split: ' | ' %}
  <li>
    <a class="item" target="_blank" href="{{product_vals[1]}}" rel="noopener">
        <img loading="lazy" alt="" src="https://s2.googleusercontent.com/s2/favicons?domain_url={{product_vals[1]}}"/>
        {{product_vals[0]}}
    </a>
</li>
{% endfor %}
</ol>


{% capture iosApps %}
YouTube | https://www.youtube.com/::
Snapchat | https://www.snapchat.com/::
Overcast | https://overcast.fm/::
NetNewsWire | https://netnewswire.com/::
Spark mail | https://sparkmailapp.com/::
Signal | https://signal.org/en/::
Books.app | https://www.apple.com/apple-books/::
Google Workspace | https://workspace.google.com/::
iA Writer | https://ia.net/writer::
Readwise | https://readwise.io/::
Clear | https://apps.apple.com/us/app/clear-todos/id493136154::
{% endcapture %}
{% assign iosAppsArray = iosApps | split: '::'%}

## iOS Apps
<ol>
{% for product in iosAppsArray %}
  {% assign product_vals = product | split: ' | ' %}
  <li>
    <a class="item" target="_blank" href="{{product_vals[1]}}" rel="noopener">
        <img loading="lazy" alt="" src="https://s2.googleusercontent.com/s2/favicons?domain_url={{product_vals[1]}}"/>
        {{product_vals[0]}}
    </a>
</li>
{% endfor %}
</ol>

(TBH, I have over 400 apps installed, but these are the ones I use consistently on a daily basis)

<style>
  h1 {
    text-align: center;
    margin-bottom: 0px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* padding-top: 20px; */
  }

  .grid-item {
    padding: 5px;
    font-size: 14px;
  }
  h2{
    font-size: 22px;
    padding-left: 20px;
    text-align:left;
    margin-bottom: .4em
  }
  img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    margin-top: 2px;
    float: left;
  }
  .grid-item {
    counter-reset: dopeCounter;
    position: relative;
  }
  ol {
    list-style: none; counter-reset: li;
    margin-left: 0;
    padding: 0;
    margin-top: 0;
  }
  /*
  li::before {
    counter-increment: dopeCounter 1;
    content: counter(dopeCounter,decimal-leading-zero);
    position: absolute;
    left: 0px;
    font-size: 13px;
    padding-top: 5px;
    width: 25px;
    height: 25px;
    color: #707070;
  }
  */
  .link{
    text-align:center;
  }

  a.item {
    width: 100%;
      padding: 2px 0;
      padding-top: 3px;
      border-top: 1px solid rgba(0,0,0,.07);
      color: #000;
      display: inline-block;
      text-align:left;
  }

  a.item:focus  {
      background-color: #84fab0
  }

  .pagebody-content{
    text-align:center;
  }

  #tooltip {
    width: 235px!important;
    text-align: center;
    color: #fff;
    background: #121212;
    position: absolute;
    z-index: 100;
    padding: 14px;
    border-radius: 8px;
}

    #tooltip:after /* triangle decoration */ {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #121212;
        content: '';
        position: absolute;
        left: 50%;
        bottom: -10px;
        margin-left: -10px;
    }

        #tooltip.top:after {
            border-top-color: transparent;
            border-bottom: 10px solid #121212;
            top: -20px;
            bottom: auto;
        }

        #tooltip.left:after {
            left: 10px;
            margin: 0;
        }

        #tooltip.right:after {
            right: 10px;
            left: auto;
            margin: 0;
        }


  @media screen and (max-width: 735px) {
    .grid-container {
      grid-template-columns: repeat(1, 1fr);
    }

    a.item{
      padding: 14px 0;
    }
}

</style>
