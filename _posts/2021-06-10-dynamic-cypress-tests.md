---
layout: post
title: 'Dynamic Cypress Tests'
description: ''
date: 'June 10, 2021'
code: true
---

[Cypress](https://www.cypress.io/) is a tool for fast, easy, and reliable testing for anything that runs in a browser.

Developers utilize Cypress for End-to-end (E2E) testing. E2E tests tell the browser what to do, what to click, what to type, and test assertions.

[Front-end testing is for everyone](https://css-tricks.com/front-end-testing-is-for-everyone/).

I wanted to set up automatic tests for every API route in a Next.js project.

To set up automatic tests for every API route, I needed a way to access every file in the `/api` folder, including files contained in subfolders.

Looking through the Cypress documentation, You can execute code in Node via the task plugin event: `cy.task()`.

After fiddling with that for a bit, I eventually realized you couldn’t create dynamic tests with `cy.task()` without statically setting how many tests it will create. I want the number of tests to grow as I write more API routes, so this method doesn’t work.

I eventually realized you couldn’t ask for this kind of data from within the test.

So, next, I set the data as an environment variable when we initially run Cypress. And that worked.

I think the best method might be to store it in a separate JSON file as a fixture when we initially run Cypress.

{% highlight javascript %}
// plugins/index.js
const fs = require('fs');
const walk = function (dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function (file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      if (!file.includes('[')) {
        results.push(file.substring(0, file.length - 3).split('./pages')[1]);
      }
    }
  });
  return results;
};

fs.writeFile(
'./cypress/fixtures/apiroutes.json',
JSON.stringify(walk('./pages/api')),
'utf8'
);

module.exports = (on, config) => {
    // …
};
{% endhighlight %}

{% highlight javascript %}
// api_spec.js
describe('API locked', () => {
  const apiRoutes = require('../fixtures/apiroutes');

  apiRoutes.forEach((route) => {
    const titleForTest = `Test API ${route}`;
    it(titleForTest, () => {
      cy.request({
        url: 'http://localhost:3000' + route,
        failOnStatusCode: false
      }).then((response) => {
        // write API route tests
        // expect(response.status).to.eq(200);
      });
    });
  });
});
{% endhighlight %}

[Cypress example recipes for dynamic tests](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__dynamic-tests).