---
layout: post
title: '2020 Presidential Candidate Donate Form Comparison'
description: In a race over donations from a nation how do the players compare?

date: January 11, 2020
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

.w3-content {
  max-height: 667px;
  overflow: scroll;
}

.mySlides {
  display:none
  }

</style>

In my research for [2020 Presidential Candidate Website Comparison](/2020-presidential-website-comparison/) I realized that each party had their own fundraising tool called WinRed and ActBlue. These tools allow donors to save their information to give again with a single-click automatic payment. **Each party has their own Amazon Buy now with 1-click button.** Except instead of going back to Amazon products time and time again, the idea is you repeatedly support party-line members. And just like Amazon 1-click buttons, Candidates (their campaign teams) will A/B test every contribution form to maximize conversion rates.

## Tool Google Index
1. ActBlue: About 107,000 results
2. WinRed: About 1,200 results

## Candidate Google Index
This search was done using respective party tools (ActBlue/WinRed) sites and Candidate last names to account for some variability in naming.

1. About 4,240 results: Warren
2. About 617 results: Booker
3. About 390 results: Trump
4. About 359 results: Biden
5. About 213 results: Yang
6. About 45 results: Buttigieg
7. About 29 results: Klobuchar

## Form Previews

<div class="w3-content" style="max-width:800px">
  <img class="mySlides" src="/images/posts/trump_mobile_donate.png" style="width:100%" alt="Donald Trump 2020 Campaign mobile donation preview">
  <img class="mySlides" src="/images/posts/bernie_mobile_donate.png" style="width:100%" alt="Bernie Sanders 2020 Campaign mobile donation preview">
  <img class="mySlides" src="/images/posts/warren_mobile_donate.png" style="width:100%" alt="Elizabeth Warren 2020 Campaign mobile donation preview">
</div>

<div class="w3-center">
  <div class="w3-section">
    <button class="w3-button w3-light-grey" onclick="plusDivs(-1)">❮ Prev</button>
    <button class="w3-button w3-light-grey" onclick="plusDivs(1)">Next ❯</button>
  </div>
  <button class="w3-button demo" onclick="currentDiv(1)">Donald Trump</button> 
  <button class="w3-button demo" onclick="currentDiv(2)">Bernie Sanders</button> 
  <button class="w3-button demo" onclick="currentDiv(3)">Elizabeth Warren</button> 
</div>

## Form Evaluation
  <img src="/images/posts/trump_edit.png" style="width:100%" alt="Donald Trump 2020 Campaign mobile donation form evaluation" >
  <img src="/images/posts/bernie_edit.png" style="width:100%" alt="Bernie Sanders 2020 Campaign mobile donation form evaluation" >
  <img src="/images/posts/warren_edit.png" style="width:100%" alt="Elizabeth Warren 2020 Campaign mobile donation form evaluation" >


<script>
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-red", "");
  }
  x[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " w3-red";
}
</script>