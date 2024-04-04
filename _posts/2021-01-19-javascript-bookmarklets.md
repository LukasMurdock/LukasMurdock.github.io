---
layout: post
title: 'JavaScript Bookmarklets'
description: ""
date: January 19, 2021
last_modified_at: 2021-05-06T19:35:12+0000
tags: dev, me
code: true
---

A [bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet) is a bookmark stored in a web browser that contains JavaScript commands that add new features to the browser.


Want to save JavaScript into a bookmarklet? Use [Coles Bookmarklet Creator](https://mrcoles.com/bookmarklet/).


## My Bookmarklets

Test them out by clicking the links. To use them anywhere simply drag the links to your bookmark bar.

**Docs view** toggles a Google doc between 'edit' and 'preview'.

```js
javascript:(function() {
  let path = window.location.pathname;
  if (path.endsWith('/edit')) {
    path = path.replace('/edit', '/preview');
  } else if (path.endsWith('/preview')) {
    path = path.replace('/preview', '/edit');
  }
  window.location.pathname = path;
})();
```

[**Remove URL Parameters**](javascript:(function()%7Bconsole.log('Original%20URL%3A'%2Bwindow.location)%3Bwindow.history.replaceState(''%2C''%2Cwindow.location.origin%2Bwindow.location.pathname)%3B%20navigator.clipboard.writeText(window.location.origin%2Bwindow.location.pathname)%7D)()) removes URL parameters and copies the URL to the clipboard.

[**Kill Sticky**](javascript:(function()%7Bfunction%20removeFixedStickyElements()%7Bdocument.querySelectorAll(%22*%22).forEach((e%3D%3E%7Bconst%20t%3Dwindow.getComputedStyle(e).getPropertyValue(%22position%22)%3B%22fixed%22!%3D%3Dt%26%26%22sticky%22!%3D%3Dt%7C%7Ce.remove()%7D))%7DremoveFixedStickyElements()%2CsetInterval(removeFixedStickyElements%2C5e3)%7D)()) checks the document for any elements with sticky or fixed CSS every 5 seconds and removes them.

```js
// Function to remove elements with fixed or sticky positioning
function removeFixedStickyElements() {
    // Get all elements from the DOM
    const allElements = document.querySelectorAll("*");

    // Loop through each element
    allElements.forEach(element => {
        // Get the computed style of the element
        const computedStyle = window.getComputedStyle(element);

        // Check if the computed position is fixed or sticky
        const position = computedStyle.getPropertyValue('position');

        if (position === 'fixed' || position === 'sticky') {
            // Remove the element from the DOM
            element.remove();
        }
    });
}

// Run the function initially
removeFixedStickyElements();

// Set interval to continuously check for fixed or sticky elements every 5 seconds
setInterval(removeFixedStickyElements, 5000);
```

[**Word Counter**](javascript:(function()%7Balert(window.getSelection().toString().match(%2F%5Cw%2B%2Fg).length%2B" Words")%7D)()) returns an alert with the word count of text you’ve selected.

[**Lorem Ipsum**](javascript:(function()%7B%2F**%20replaces%20any%20text%20content%20with%20Lorem%20ipsum%20...*%20script%20is%20to%20be%20injected%20by%20bookmarklet*%20N.%20Landsteiner%2C%20mass%3Awerk%20-%20media%20environments%20%3Chttp%3A%2F%2Fwww.masswerk.at%3E*%2F(function()%20%7Bvar%20loremipsum%3D%5B'Lorem%20ipsum%20dolor%20sit%20amet%2C%20consectetur%20adipisicing%20elit%2C%20sed%20do%20eiusmod%20tempor%20incididunt%20ut%20labore%20et%20dolore%20magna%20aliqua.'%2C'Ut%20enim%20ad%20minim%20veniam%2C%20quis%20nostrud%20exercitation%20ullamco%20laboris%20nisi%20ut%20aliquip%20ex%20ea%20commodo%20consequat.'%2C'Duis%20aute%20irure%20dolor%20in%20reprehenderit%20in%20voluptate%20velit%20esse%20cillum%20dolore%20eu%20fugiat%20nulla%20pariatur.'%2C'Excepteur%20sint%20occaecat%20cupidatat%20non%20proident%2C%20sunt%20in%20culpa%20qui%20officia%20deserunt%20mollit%20anim%20id%20est%20laborum.'%2C'Nam%20facilisis%20enim.'%2C'Pellentesque%20in%20elit%20et%20lacus%20euismod%20dignissim.'%2C'Aliquam%20dolor%20pede%2C%20convallis%20eget%2C%20dictum%20a%2C%20blandit%20ac%2C%20urna.'%2C'Pellentesque%20sed%20nunc%20ut%20justo%20volutpat%20egestas.'%2C'Class%20aptent%20taciti%20sociosqu%20ad%20litora%20torquent%20per%20conubia%20nostra%2C%20per%20inceptos%20hymenaeos.'%2C'In%20erat.'%2C'Suspendisse%20potenti.'%2C'Fusce%20faucibus%20nibi%20sed%20nisi.'%2C'Phasellus%20faucibus%2C%20dui%20a%20cursus%20dapibus%2C%20mauris%20nulla%20euismod%20velit%2C%20a%20lobortis%20turpis%20arcu%20vel%20dui.'%2C'Pellentesque%20fermentum%20ultrices%20pede.'%2C'Donec%20auctor%20lectus%20eu%20arcu.'%2C'Curabitur%20non%20orci%20eget%20est%20porta%20gravida.'%2C'Aliquam%20pretium%20orci%20id%20nisi.'%2C'Duis%20faucibus%2C%20mi%20non%20adipiscing%20venenatis%2C%20erat%20urna%20aliquet%20elit%2C%20eu%20fringilla%20lacus%20tellus%20quis%20erat.'%2C'Nam%20tempus%20ornare%20lorem.'%2C'Nullam%20feugiat.'%2C'Praesent%20ut%20leo%20massa.'%2C'Donec%20mattis%2C%20enim%20at%20pharetra%20cursus%2C%20arcu%20est%20sodales%20magna%2C%20in%20volutpat%20erat%20quam%20at%20risus.'%2C'Maecenas%20metus%20magna%2C%20malesuada%20id%20sodales%20tempor%2C%20porta%20a%20elit.'%2C'Vestibulum%20ornare%20varius%20vestibulum.'%2C'Nam%20risus%20tortor%2C%20tempus%20in%20interdum%20id%2C%20varius%20non%20dolor.'%2C'Maecenas%20sed%20enim%20a%20arcu%20molestie%20sollicitudin.'%2C'Integer%20nulla%20eros%2C%20egestas%20sed%20gravida%20placerat%2C%20pellentesque%20ut%20arcu.'%2C'Curabitur%20auctor%20vehicula%20neque%20aliquet%20fermentum.'%2C'Nam%20in%20enim%20non%20odio%20volutpat%20mattis%20eget%20et%20diam.'%2C'Vestibulum%20sit%20amet%20turpis%20tellus.'%2C'In%20molestie%20mattis%20orci%20vitae%20sagittis.'%2C'Fusce%20vel%20est%20non%20erat%20auctor%20molestie.'%2C'Morbi%20aliquam%2C%20mauris%20a%20blandit%20convallis%2C%20nunc%20dui%20fermentum%20diam%2C%20et%20feugiat%20lorem%20tellus%20eget%20sem.'%2C'Pellentesque%20tincidunt%20feugiat%20egestas.'%2C'Suspendisse%20tincidunt%20blandit%20orci%2C%20nec%20convallis%20purus%20suscipit%20in.'%2C'Sed%20a%20diam%20at%20quam%20congue%20sagittis%20id%20laoreet%20augue.'%2C'Sed%20aliquet%20velit%20id%20tortor%20ultricies%20cursus%20ac%20at%20mi.'%2C'Nullam%20a%20nibi%20vitae%20odio%20pellentesque%20porttitor%20vitae%20quis%20dui.'%2C'Cras%20malesuada%20quam%20nec%20urna%20interdum%20in%20imperdiet%20neque%20luctus.'%2C'Duis%20elit%20nulla%2C%20sagittis%20vitae%20sagittis%20nec%2C%20fringilla%20nec%20augue.'%2C'Fusce%20mattis%20tortor%20ut%20massa%20ultrices%20venenatis.'%2C'Praesent%20tincidunt%20ante%20purus%2C%20ut%20molestie%20lacus.'%2C'Etiam%20rhoncus%20venenatis%20eros%2C%20in%20tempus%20urna%20tincidunt%20vel.'%2C'Praesent%20sit%20amet%20massa%20vitae%20dui%20feugiat%20ultricies.'%2C'Nulla%20imperdiet%20convallis%20sapien%2C%20et%20elementum%20ipsum%20semper%20vitae.'%2C'Donec%20ultricies%20auctor%20enim%20in%20laoreet.'%2C'Vestibulum%20vitae%20ipsum%20risus.'%2C'Proin%20lorem%20felis%2C%20semper%20at%20rutrum%20at%2C%20dapibus%20ut%20arcu.'%2C'Cras%20volutpat%20interdum%20venenatis.'%2C'Integer%20pulvinar%20metus%20laoreet%20enim%20aliquam%20ut%20lobortis%20erat%20rutrum.'%2C'Mauris%20dignissim%20sagittis%20metus%2C%20sed%20placerat%20ipsum%20cursus%20sit%20amet.'%2C'Vivamus%20iaculis%20malesuada%20metus%20vel%20volutpat.'%2C'Praesent%20pulvinar%20lacus%20vel%20dolor%20pellentesque%20sed%20consequat%20justo%20convallis.'%2C'Integer%20vel%20sapien%20a%20libero%20aliquet%20porttitor%20a%20in%20felis.'%2C'Nulla%20in%20ipsum%20quis%20felis%20lacinia%20vulputate.'%2C'Phasellus%20eu%20nisi%20nec%20erat%20hendrerit%20mattis%20in%20at%20nunc.'%2C'Nullam%20interdum%20tempus%20euismod.'%2C'Vivamus%20eleifend%20iaculis%20dui%20a%20feugiat.'%2C'Aenean%20sed%20diam%20diam.'%2C'Nullam%20sed%20aliquet%20purus.'%2C'Donec%20quis%20ultricies%20ligula.'%2C'Donec%20sit%20amet%20nisi%20enim.'%2C'Vestibulum%20neque%20nisi%2C%20venenatis%20sit%20amet%20fermentum%20ut%2C%20tempor%20at%20dolor.'%2C'Morbi%20varius%20hendrerit%20nunc%2C%20nec%20varius%20neque%20pellentesque%20eu.'%2C'Nulla%20nec%20urna%20in%20diam%20consectetur%20adipiscing%20nec%20in%20dui.'%2C'Quisque%20accumsan%20quam%20quis%20erat%20porta%20nec%20feugiat%20ipsum%20varius.'%2C'Suspendisse%20blandit%20diam%20dolor.'%2C'Sed%20interdum%2C%20tortor%20a%20egestas%20pellentesque%2C%20arcu%20sapien%20facilisis%20quam%2C%20ut%20ultrices%20lectus%20augue%20a%20nibi.'%2C'Etiam%20laoreet%2C%20massa%20eget%20ultrices%20ullamcorper%2C%20nisi%20odio%20luctus%20diam%2C%20sed%20vestibulum%20sem%20justo%20id%20nulla.'%2C'Vestibulum%20tempor%20vestibulum%20dui%2C%20sed%20fermentum%20libero%20vehicula%20sit%20amet.'%2C'Vestibulum%20vitae%20sem%20augue%2C%20et%20aliquet%20metus.'%2C'Donec%20cursus%20purus%20eget%20libero%20elementum%20suscipit.'%2C'Vivamus%20vehicula%20auctor%20tristique.'%2C'Vestibulum%20lacinia%20urna%20in%20nisi%20blandit%20feugiat.'%2C'Aliquam%20ultrices%20metus%20sit%20amet%20diam%20iaculis%20rutrum%20interdum%20augue%20varius.'%2C'Sed%20non%20quam%20nisl.'%2C'Etiam%20nec%20ligula%20vel%20neque%20adipiscing%20pulvinar%20ac%20ac%20dui.'%2C'Sed%20vulputate%20tortor%20eget%20tellus%20rhoncus%20ac%20lobortis%20sem%20blandit.'%2C'Nam%20placerat%2C%20odio%20et%20suscipit%20vestibulum%2C%20leo%20orci%20vehicula%20ante%2C%20et%20tempor%20arcu%20elit%20et%20est.'%2C'Nulla%20facilisi.'%2C'Integer%20sit%20amet%20elit%20ut%20metus%20aliquet%20lobortis%20posuere%20id%20lorem.'%2C'Donec%20at%20leo%20enim%2C%20a%20blandit%20eros.'%2C'Integer%20eleifend%20aliquam%20lacinia.'%2C'Phasellus%20sapien%20tortor%2C%20volutpat%20in%20posuere%20eget%2C%20rutrum%20id%20nibi.'%2C'Maecenas%20porta%2C%20diam%20iaculis%20vulputate%20ultricies%2C%20massa%20metus%20laoreet%20est%2C%20sed%20elementum%20felis%20nibi%20vel%20mauris.'%2C'Vestibulum%20lobortis%20ipsum%20sed%20erat%20varius%20eget%20posuere%20dui%20consequat.'%2C'Integer%20vel%20eros%20nisi.'%2C'Phasellus%20non%20gravida%20sem.'%2C'Morbi%20id%20mauris%20libero.'%2C'Suspendisse%20consectetur%2C%20erat%20eget%20convallis%20pulvinar%2C%20nulla%20sem%20varius%20nisi%2C%20vel%20semper%20nibi%20leo%20id%20enim.'%5D%3Bvar%20whitespaceAtFrontRe%3D%2F%5E%5B%5Cs%5Cxa0%5D%2B%2F%3Bvar%20whitespaceAtEndRe%3D%2F%5B%5Cs%5Cxa0%5D%2B%24%2F%3Bvar%20punctationRe%3D%2F(%5B%3A!%3F%5C.%5D)%24%2F%3Bvar%20punctationFrontRe%3D%2F%5E(%5B%3A!%3F%5C.%5D%5Cs%2B)%2F%3Bvar%20capatializedRe%3D%2F%5E%5B%5E%5Cw%C3%83%E2%80%9E%C3%83%E2%80%93%C3%83%C5%93%C3%83%E2%82%AC%C3%83%E2%82%AC%C3%83%C2%81%C3%83%CB%86%C3%83%E2%80%B0%C3%83%E2%80%A1%5D*%5BA-Z%C3%83%E2%80%9E%C3%83%E2%80%93%C3%83%C5%93%C3%83%E2%82%AC%C3%83%E2%82%AC%C3%83%C2%81%C3%83%CB%86%C3%83%E2%80%B0%C3%83%E2%80%A1%5D%2F%3Bvar%20simpleExpressionRe%3D%2F%5E%5B%5C(%5C%5B%5D%3F.%5B%3A%5C.%5C)%5C%5D%5D%3F%24%2F%3Bvar%20singleWordRe%3D%2F%5E%5Cw*%24%2F%3Bvar%20charAtFrontRe%3D%2F%5E%5Ba-z%5D%2Fi%3Bvar%20headlineRe%3D%2F%5EH%5B1-3%5D%24%2Fi%3Bvar%20lastTextHadPunctation%3Dfalse%3Bvar%20foundMain%3Dfalse%3Bvar%20idx%3D0%3Bvar%20getLoremIpsum%3Dfunction(n%2C%20isHeadline%2C%20singleWord)%20%7Bif%20(!foundMain%20%26%26%20isHeadline)%20%7Bidx%3D0%3BfoundMain%3Dtrue%3B%7Dvar%20t%3Dloremipsum%5Bidx%5D%3Bvar%20l%3Dt.length%3Bwhile%20(l%3Cn)%20%7Bif%20(%2B%2Bidx%3E%3Dloremipsum.length)%20idx%3D0%3Bt%2B%3D'%20'%2Bloremipsum%5Bidx%5D%3Bl%3Dt.length%3B%7Dif%20(l%3En)%20%7Bvar%20t1%3Dt.substring(0%2Cn)%3Bvar%20t2%3Dt.substring(n).replace(%2F%5Cs.*%24%2F%2C%20'')%3Bif%20(!singleWord%20%26%26%20(t2.length%3C3%20%7C%7C%20(singleWordRe.test(t1)%20%26%26%20charAtFrontRe.test(t.charAt(n)))))%20%7Bt%3Dt1%2Bt2%3B%7Delse%20%7Bt%3Dt1.replace(%2F%2C%3F%5Cs%5Cw*%24%2F%2C%20'')%3B%7Dif%20(t.length%3E3)%20t%3Dt.replace(%2F%5Cs%5Cw%24%2F%2C%20'')%3B%7Dt%3Dt.replace(%2F%5Cs%2B%24%2F%2C%20'')%3Bif%20(%2B%2Bidx%3E%3Dloremipsum.length)%20idx%3D0%3Breturn%20t%3B%7D%3Bvar%20getDocumentBody%3Dfunction()%20%7Bif%20(document.getElementsByTagName)%20%7Breturn%20document.getElementsByTagName('body').item(0)%3B%7Delse%20if%20(document.body)%20%7Breturn%20document.body%3B%7Delse%20if%20((document.all)%20%26%26%20(document.all.tags))%20%7Breturn%20document.all.tags('body')%5B0%5D%3B%7Delse%7Breturn%20null%3B%7D%7D%3Bvar%20replaceText%3Dfunction(el%2C%20isHeadline)%20%7Bvar%20t%3Del.nodeValue%3Bif%20(!t)%20return%3Bvar%20n%3Dt.length%3Bt%3Dt.replace(whitespaceAtFrontRe%2C%20'')%3Bvar%20wsFront%3D(t.length!%3Dn)%3Bn%3Dt.length%3Bt%3Dt.replace(whitespaceAtEndRe%2C%20'')%3Bvar%20wsEnd%3D(t.length!%3Dn)%3Bn%3Dt.length%3Bif%20(n%3E0%20%26%26%20!simpleExpressionRe.test(t))%20%7Bvar%20tn%3DgetLoremIpsum(n%2C%20isHeadline%2C%20singleWordRe.test(t))%3Bvar%20matches%3DpunctationRe.exec(t)%3Bif%20(matches)%20%7Btn%3Dtn.replace(%2F%5B%2C%5C.%5D%2B%24%2F%2C%20'').replace(%2F%5Cs%2B%24%2F%2C%20'')%2Bmatches%5B1%5D%3B%7Delse%20%7Btn%3Dtn.replace(%2F%2C%5Cs*%24%2F%2C%20'')%3B%7Dvar%20first%3Dtn.charAt(0)%3Bvar%20rest%3Dtn.substring(1)%3Btn%20%3D%20((lastTextHadPunctation%20%7C%7C%20capatializedRe.test(t))%3F%20first.toUpperCase()%3Afirst.toLowerCase())%2Brest%3Bmatches%3DpunctationFrontRe.exec(t)%3Bif%20(matches)%20tn%3Dmatches%5B1%5D%2Btn%3BlastTextHadPunctation%3DpunctationRe.test(tn)%3Bif%20(wsFront)%20tn%3D'%20'%2Btn%3Bif%20(wsEnd)%20tn%2B%3D'%20'%3Bel.nodeValue%3Dtn%3B%7D%7D%3Bvar%20scanElement%3Dfunction(el%2C%20isHeadline)%20%7Bvar%20n%3Del.firstChild%3Bwhile%20(n)%20%7Bvar%20nt%3Dn.nodeType%3Bvar%20ns%3Dn.nextSibling%3Bif%20(nt%3D%3D1)%20%7Bvar%20nn%3Dn.nodeName%3Bif%20(nn!%3D'SCRIPT'%20%26%26%20nn!%3D'STYLE'%20%26%26%20nn!%3D'EMBED')%20%7BscanElement(n%2C%20isHeadline%20%7C%7C%20headlineRe.test(nn))%3B%7D%7Delse%20if%20(nt%3D%3D3)%20%7BreplaceText(n%2C%20isHeadline)%3B%7Dn%3Dns%3B%7D%7D%3Bvar%20b%3DgetDocumentBody()%3Bif%20(b)%20%7BscanElement(b%2C%20false)%3B%7D%7D)()%7D)()) turns all text on the page into lorem ipsum text.

[**Reveal Bullshit**](javascript:(function()%7Bvar d%3Ddocument,s%3Dd.createElement(%27script%27)%3Bs.src%3D%27https://unpkg.com/%40mourner/bullshit%401.1.0/bullshit.js%27%3Bd.body.appendChild(s)%3B%7D())) is a best-of-breed, mission-critical enterprise JavaScript bookmarklet that will empower you to evaluate the high impact of market-driven text on any Web resource, cultivating process-centric innovation and out-of-the-box thinking.

[**ANDI**](javascript:void((function(){andiScript=document.createElement('script');andiScript.setAttribute('src','https://www.ssa.gov/accessibility/andi/andi.js');document.body.appendChild(andiScript)})());)  is ANDI is an open source project created by the Accessible Solutions Branch of the Social Security Administration to test websites for accessibility.

*[Official page for Reveal Bullshit](https://mourner.github.io/bullshit.js/) and [Official page for ANDI](https://www.ssa.gov/accessibility/andi/help/install.html).*

## ct.css
Take a look inside your `<head>` with [ct.css](https://csswizardry.com/ct/).


[Add CSS Bookmarklet](https://rocktronica.github.io/Add-CSS-Bookmarklet/)
