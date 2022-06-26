---
layout: post
title: 'Bayesian Average'
description: ""
date: June 26, 2022
---

We have a list of products. Each product has:
- a rating (1-5)
- a count of received ratings
- its average rating

However, we don’t want to blindly trust any given products average rating.

The more ratings a product has, the more confidence we can have in its average rating. Conversely, the less ratings a product has, the less confidence we can have in its average rating.

Instead of using the average review rating, we can calculate a new rating score to say:
> as the number of ratings on an item increase, the score should move from the lists average rating to the items average rating.

Given that the average product review rating is 4.2, and 25% of products have 10 reviews (lower quartile),
- if an item in is the lower quartile of reviews, the score should be around the average product review
- if an item has more than the lower quartile of reviews, the score should be the products average review

If a product has 1 review, and an average rating of 5, we can calculate our new score with a simple formula for [Bayesian Average](https://en.wikipedia.org/wiki/Bayesian_average):
- (itemRatings * itemRatingsAverage + listMean * listConfidence) / (itemRatings + listConfidence)
- (1 * 5 + 4.2 * 10) / (1 + 10) = 4.27

If a product has 10 reviews, and an average rating of 5:
- (itemRatings * itemRatingsAverage + listMean * listConfidence) / (itemRatings + listConfidence)
- (10 * 5 + 4.2 * 10) / (10 + 10) = 4.6

If a product has 100 reviews, and an average rating of 5:
- (itemRatings * itemRatingsAverage + listMean * listConfidence) / (itemRatings + listConfidence)
- (100 * 5 + 4.2 * 10) / (100 + 10) = 4.93

For calculating the list average and list threshold (Bayesian constants: mean and confidence), you can create a batch job that runs once a week or month.

These constants don’t need to change that often.

It’s important to store these constants so that you can calculate all products based on the same constants.

Thus, whenever you change these constants, you should recalculate every products Bayesian average.

```typescript
function bayesianAverage(
    itemRatings: number,
    itemRatingsAverage: number,
    listAverage: number,
    /** Confidence */
    listThreshold: number
) {
    return (
        (itemRatings * itemRatingsAverage + listAverage * listThreshold) /
        (itemRatings + listThreshold)
    );
}
```

## Resources
- [Algolia: Using the Bayesian Average](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/bayesian-average/#understanding-the-bayesian-average)
- [Better Ranking using Bayesian Average](https://arpitbhayani.me/blogs/bayesian-average)