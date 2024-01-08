---
layout: post
title: 'Software Design'
description: ''
date: 'December 24, 2023'
---


software design expertise

## What mistakes do you commonly see novices make in software design?

> I had an informal expertise extraction conversation yesterday, with a senior software engineer I respect. The preliminary takeaway for software design expertise is that experts _attempt to predict the direction of change_ for their software requirements, and design accordingly.
>
> They do this intuitively. By feel. So the expert novice difference here is that experts get it right more than they get it wrong. And one measure this engineer gave me is: if their commits on a new feature are all green, not yellow, it means they predicted correctly.
>
>
> (The implication being that the initial structure was the right one, and the changes in the requirements fit into the design, without too much restructuring.) My god. This explains a LOT of what I’ve seen.
>
> Of course, the main caveat here (again, from the engineer), is that below a certain level of skill, novices don’t realise that the initial structure they chose was wrong, and would keep patching the mistaken design. That is, the green-yellow heuristic is just a heuristic.
>
> “Look, everything is a tradeoff, right? And if you design your code this way, it becomes harder to change that way. (Illustrates) So the question is, can you make the right tradeoffs? The senior engineer is aware of the tradeoffs. The novice engineers can’t even see them.”
>
> “The junior engineer just thinks about the low level implementation details. They don’t even realise that the hard bit is when you uncover new information and the design or requirements change. The senior is always thinking about where the change is mostly likely to come from.”
>
> You know, this explains a whole bunch of behaviours I’ve seen. (Speculating here, this is not part of the extraction):
>
> - I’ve noticed senior coders tend to spike by doing throwaway prototypes.
> - They also tend to start on a brand new feature by writing everything in one file.
>
> I used to think they spiked prototypes to quickly generate information about the feature. But now I wonder if they’re also looking for ‘direction of change’.
>
> And writing everything in one file, with hard coded variables and very little structure makes sense if you have high uncertainty about a new feature: the best structure to use when you don’t know where the change is going to come from is to have no initial structure at all.
>
> (And of course keeping everything in one file makes the cognitive overhead really low, which means the inevitable restructuring — once the engineer knows where change is coming from/what tradeoffs to pick — is easier to do).
>
> — [Cedric Chin](https://twitter.com/ejames_c/status/1539847144622145536)


> choosing wrong or inappropriate abstractions, not encapsulating design decisions, and designing for data dependencies over functional dependencies.

## Books

- 1979 Edward Yourdon, Larry L. Constantine: Structured Design: Fundamentals of a Discipline of Computer Program and Systems Design
- 2008 Donella H. Meadows: Thinking in Systems
- 2021 Mark Richards, Benjamin Lange, Neal Ford: Fundamentals of Software Architecture: An Engineering Approach
- 2023 Kent Beck: Tidy First?

## References

- 2016 Sandi Metz: [The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)
- 2016 Adrian Colyer: [On the criteria to be used in decomposing systems into modules](https://blog.acolyer.org/2016/09/05/on-the-criteria-to-be-used-in-decomposing-systems-into-modules/)
- 2020 Alex Flint: [Search vs design](https://www.lesswrong.com/posts/r3NHPD3dLFNk9QE2Y/search-versus-design-1)
- 2020 Kent C. Dodds: [Avoid Hasty Abstractions](https://kentcdodds.com/blog/aha-programming)
- 2023 Commoncog forum: [Deliberate practice for software design?](https://forum.commoncog.com/t/deliberate-practice-for-software-design/1484/3)
