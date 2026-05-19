---
layout: post
title: 'Management'
description: ''
date: 'December 22, 2022'
tags: business
---

> Management is the act of aligning peoples actions, behaviors, and attitudes with the needs of the organization, and making sure little problems don’t become big ones.
>
> — Patrick Lencioni, The Motive

Management is a core [business challenge](/business-challenges/).

## Management is an information system

Management is the practice of keeping the organization's model of reality updated fast enough to act.

A team fails when reality changes faster than the team can notice, interpret, decide, and respond. The manager's job is to increase the speed and quality of that loop without creating unnecessary bureaucracy.

This means management is not primarily meetings, status reports, or task tracking. Those are tools. The actual work is:

- clarifying the goal
- making ownership explicit
- surfacing reality early
- shortening feedback loops
- resolving uncertainty
- communicating changes
- making decisions legible
- preventing small problems from becoming big ones

A good manager creates the conditions where people can make better local decisions without waiting for permission.

Internal:

- Vision and values
- Goals
- Onboarding
- One-on-ones
- Coaching
- Feedback
- Decision making
- Communication
- Motivation

## Questions

[What do we value?](/values/)

[How do we communicate?](/communication/)

[What technology do we all use to operate?](/saas/) If non-default (e.g., Zoom over Google Meet, why? Where can we learn how to use them?

[What are the core areas of responsibility and who is directly responsible for that area?](#areas-of-responsibility-aor-and-directly-responsible-individuals-dri ↴)

What, specifically, are we responsible for? When?

[What are we measuring?](#outcome-super-prompt)

[How do we propose improvements for others to comment on?](#improvement-proposals↴)

How do we make decisions?

Where do decision records go?

## Communication cadence ladder

Different problems need different communication cadences.

### Immediate

Use when there is a production issue, blocked decision, customer impact, or irreversible action.

Medium: call, huddle, urgent Slack.

### Daily

Use when the project is time-sensitive or many people need shared context.

Medium: short standup or async update.

### Weekly

Use for most active projects.

Medium: weekly meeting plus broadcast update.

### Monthly

Use for business review, metrics, strategic direction, and retrospectives.

Medium: WBR / MBR.

### Durable

Use for decisions, operating principles, strategy, architecture, and policies.

Medium: working doc, ADR, decision record, handbook.

## Management without authority

Embedded operators often need to manage projects without being the manager.

The move is not to seize authority. The move is to make the work more legible.

Default proposal:

> I think this project would benefit from one lightweight operating doc and a weekly update loop. I can draft the first version so we have one place for goals, risks, decisions, and current work. We can keep it minimal and adjust if it becomes overhead.

Useful asks:

- Can I create the project working doc?
- Can we agree who the DRI is?
- Can we define "done"?
- Can we choose where decisions live?
- Can we keep important updates in the project channel instead of DMs?
- Can I send a weekly summary of shipped, learned, blocked, and next?

Management without authority works by reducing ambiguity for everyone.

## Management failure modes

Knowing management theory is not the same as installing a management system.

Common failure modes:

### 1. Passive ownership

Waiting for permission instead of proposing the operating system.

Countermeasure: write the project landing page, propose the cadence, and ask for objections.

### 2. Status without orientation

Reporting activity without explaining whether the project is on track.

Countermeasure: every update should include goal, current state, risk, next step, and ask.

### 3. Invisible uncertainty

Letting unknowns live in conversation, memory, or anxiety.

Countermeasure: maintain a ranked uncertainty list.

### 4. Decision fog

Decisions happen, but nobody can find the decision later.

Countermeasure: write decision records with context, decision, consequences, and date.

### 5. Thread rot

Important project state is buried in Slack threads, DMs, meetings, or memory.

Countermeasure: summarize decisions and updates back into the project channel and working doc.

### 6. Unowned escalation

Problems are noticed but not raised early enough.

Countermeasure: define what "at risk" means and broadcast it early.

### 7. Delegating tasks instead of outcomes

People receive checklists but not the goal or decision context.

Countermeasure: delegate crisp outcomes, constraints, and success criteria.

## Frameworks

### Project DRI Operating System

Process goal: create shared context, fast feedback loops, and clear ownership for important projects.

[How I've run major projects](https://www.benkuhn.net/pjm/) argues that major projects are high-leverage when someone has enough technical context and trust to make prioritization decisions.

A project DRI is responsible for maintaining the system that lets the project move quickly:

1. A clear goal
2. A working doc / landing page
3. A plan for victory
4. A ranked uncertainty list
5. A visible "who is working on what"
6. A project communication channel
7. A weekly broadcast update
8. A regular retro

The DRI does not own every task. The DRI owns direction, context, prioritization, and escalation.

#### Project landing page

Every important project should have one obvious place to go.

Minimum contents:

- Goal: what outcome are we trying to create?
- Why now: why does this matter?
- DRI: who owns direction and escalation?
- People: who is involved?
- Links: Slack channel, PRs, docs, designs, dashboards, tickets
- Plan for victory: what steps lead to success?
- Roadmap: intermediate milestones and rough dates
- Open questions / risks: ranked by importance
- Who is working on what: current work and owner
- Running notes: meeting notes, decisions, updates

#### Plan for victory

A plan for victory is a concrete list of steps that ends in the goal being achieved.

The point is not prediction. The point is orientation.

The plan helps answer:

- Are we on track?
- What changed?
- What is blocking us?
- What needs to be cut?
- What needs escalation?
- Who else needs to know?

#### Ranked uncertainty list

Most projects are constrained by uncertainty, not effort.

Maintain a ranked list of the most important unanswered questions:

- What must be true for this project to succeed?
- What do we not know yet?
- Which uncertainty is on the critical path?
- Who is resolving it?
- When will we know more?

The highest-priority uncertainty often becomes the highest-priority work.

#### Weekly broadcast update

Once a week, send a concise update to everyone who depends on the project.

Template:

- Vibe: on track / at risk / blocked
- What changed:
- What we learned:
- What shipped:
- Current risks:
- Next:
- Needs / asks:

Optimize for signal. Do not say "worked on X." Say "accomplished Y," "learned Z," or "blocked by Q."

#### Slack norms

- Use the project channel, not DMs.
- Link the working doc in the channel.
- Summarize long threads back to the channel.
- Cross-post important decisions.
- Make private channels only when confidentiality requires it.
- Bias toward shared context over hidden coordination.

#### Retro cadence

Every 2-8 weeks, ask:

- What went well?
- What could have gone better?
- What should we change next cycle?
- What action item has an owner?

### Areas of Responsibility (AOR) and Directly Responsible Individuals (DRI)

Process goal: clarify roles and responsibilities

https://www.atlassian.com/team-playbook/plays/roles-and-responsibilities

https://about.gitlab.com/handbook/people-group/directly-responsible-individuals/

### Objectives and Key Results (OKRs)

Process goal: clarify vision, goals, and progress

https://rework.withgoogle.com/guides/set-goals-with-okrs/steps/introduction/

https://www.atlassian.com/team-playbook/plays/okrs

### RAPID

Process goal: clarify decision accountability

RAPID is short for Recommend, Agree, Perform, Input and Decide.

- Recommend: the person who proposed the Issue and Solution
- Agree: people whose input is required to make the decision
- Perform: people who will have to enact any decision and therefore should be heard
- Input: people whose input is worth considering
- Decide: the one who will make the decision

https://www.bain.com/insights/rapid-tool-to-clarify-decision-accountability/

### Facts, Assumptions, Beliefs (FAB)

Process goal: align teams on foundations of work

[TBM 46/52: (F)acts, (A)ssumptions, (B)eliefs](https://cutlefish.substack.com/p/tbm-4652-facts-assumptions-beliefs)
[Spotify Wants To Be Good at Failing](https://www.infoq.com/news/2016/07/spotify-good-at-failing/)

1. Start a document
2. List incontrovertible facts relevant to your work, with links to support these facts. (e.g., [Competitor] recently launched [Product])
3. List assumptions relevant to your work with a level of certainty.
4. List your beliefs.
5. Regularly revisit document.

### Definition of Done

Process goal: prevent implicit expectations from becoming conflict.

Before starting meaningful work, define what "done" means.

Minimum template:

- User-visible outcome:
- Internal outcome:
- Acceptance criteria:
- Non-goals:
- Required review:
- Required documentation:
- Rollout plan:
- Monitoring / verification:
- Owner who accepts completion:

If "done" is not defined, the project will silently expand until someone is disappointed.

### Outcome super prompt

Process goal: help teams focus on what they are measuring (instead of how they will measure it).

[Outcome Super Prompt](https://cutlefish.substack.com/p/tbm-4252-outcome-super-prompt)

> Right now we are working to improve the [variable_A] [variable_B] for [for who] which we could potentially measure by tracking [measurement].

### The Tick Tock Doc

Process goal: strategy for sharing new information throughout an organization.

[The tick tock doc](https://larahogan.me/blog/the-art-of-the-tick-tock-doc/)

1. Draft the most important and straightforward version of what you need to share with your team.
    - (The what) I need my team to know  ________________________.
    - (The why) This change is happening right now because  ________________________.
    - (The who and how) This will impact ________________________.
    - (The when) The timeline for this change is ________________________.
2. Craft your talking points by threading together the key points from step 1.
3. Create a new row per audience (an audience might just be one person, a team or function, or the entire organization)
4. Prioritize audience order based on required input and impact.
5. Assign a message, delivery medium, and communicator for each audience.
6. Ask the other communicators for feedback and concerns about working, timing, and mediums.
7. As you execute communication make notes of feedback and reactions and share with other communicators.

| Date | Owner | Channel | Talking Points | Feedback |
|------|-------|---------|----------------|----------|

### Success and velocity metrics

[Success & Velocity](https://breakingpoint.substack.com/p/success-and-velocity)

Success metrics tell you whether you have achieved your goal. At any given time you should be able to measure your progress towards your goals using success metrics.

Velocity is how fast you’re moving. Your velocity should always be increasing, and if it’s slowing down then you likely have some significant problems.

Success metrics are many of the common metrics you likely use in your business today, including Revenue, MAU/DAU, Net Retention, and Churn Rate. You likely have goals right now that are measured by success metrics.

Velocity metrics measure the drivers of success. You always want to be more productive than you were last month, and velocity metrics are a measure of that productivity. Given the same level of investment, will you get more out of it in the future? Velocity metrics will tell you exactly that.

### WBR (Weekly Business Review)

Process goal: Provide a heartbeat of the business for operators to know what’s going on.

https://www.holistics.io/blog/how-amazon-measures/

### Improvement Proposals

Process goal: Source improvements and clarify decision-making accountability by removing uncertainty over roles or responsibilities for a decision.

[Improvement proposals](/improvement-proposals)

### ADRs (Architectural Decision Record)

Lightweight ADRs:
- Title
- Status (proposed, accepted, rejected, deprecated, superseded)
- Context (The issue motivating this decision or change)
- Decision (The change made)
- Consequences (What became easier or more difficult because of the change made)

https://adr.github.io/

### Next Step prompt

[TBM 214: From Assumption to Next Step](https://cutlefish.substack.com/p/tbm-214-from-assumption-to-next-step)

> Currently I [___A___] that [___B___] based on [___C___]. Given that assumption I [___D___]that we [___E___].

### The Core Magic Loop

Process goal: Help employees grow their skills and career by building a mutually beneficial relationship with their manager.

[The Core Magic Loop](https://drive.google.com/file/d/124Bvy9SUKlalweLBY2cPyUSepc0LJ5C-/view) is a five-step loop for growing an employee's skills, responsibilities, position, and compensation inside a job:

1. Do your current job well.
2. Ask your manager how you can help them.
3. Do what they ask.
4. Ask your manager if you could help in a way that also grows your skills toward a particular goal.
5. Do as they suggest, then repeat from step 4.

The loop works because people tend to invest in those who help them. Before asking for growth opportunities, the employee should verify they are in good standing with their current responsibilities. After completing useful work for their manager, they can ask for opportunities that both help the manager and develop them toward a specific goal, such as learning a skill, gaining responsibility, earning a raise, or preparing for promotion.

## Design from the Inside

[Design from the inside](https://mattstromawn.com/writing/design-from-the-inside/) argues that in fast-moving companies, designers should stop trying to map the whole product from the outside and instead work inside the product system.

- Work in the codebase
- Use real data and realistic conditions
- Ship small changes
- Build rituals instead of introducing processes
- Collapse feedback loops through support, instrumentation, and direct product changes

## PDSA Cycle

- **Plan** a change or test aimed at improvement. Set objective, ask questions and have predictions, plan to carry out the cycle (who, what, where, when)
- **Do** carry out the change or test (preferably on a small scale). Document problems and unexpected observations.
- **Study** the result. What did we learn? What went wrong? Summarize what we learned
- **Act** - adopt the change, abandon it, or run through the cycle again. What changes are to be made? Next cycle?

## Templates

### Small team project template

```md
## Project

Name:

DRI:

People:

Slack channel:

Working doc:

## Goal

We are trying to:

This matters because:

Success means:

## Plan for victory

1.
2.
3.
4.
5.

## Current state

Status: on track / at risk / blocked

Latest shipped:

Latest learned:

## Risks and open questions

| Priority | Question / Risk | Owner | Next check |
|---|---|---|---|
| P0 | | | |
| P1 | | | |
| P2 | | | |

## Who is working on what

| Person | Current focus | Expected output | Date |
|---|---|---|---|
| | | | |

## Decisions

| Date | Decision | Context | Consequence |
|---|---|---|---|
| | | | |

## Weekly update

Vibe:

What changed:

What shipped:

What we learned:

Current risks:

Next:

Needs:
```

## A Land & Expand Reading Program
- 1966 [Peter Drucker: The Effective Executive](https://www.harpercollins.com/products/the-effective-executive-peter-f-drucker?variant=32207495856162)
- 1982 [Ken Blanchard, Spencer Johnson: The One Minute Manager](https://www.kenblanchard.com/Store/The-New-One-Minute-Manager)
- 1983 [Andrew Grove: High Output Management](https://about.gitlab.com/handbook/leadership/high-output-management/)
- 1993 [David Maister: Managing the Professional Service Firm](https://davidmaister.com/books/mtpsf/)
- 2019 [Matt Mochary: The Great CEO Within](https://mocharymethod.org/the-great-ceo-within/)
- 2021 [Alex MacCaw: The Manager's Handbook](https://themanagershandbook.com/)

## Management Books

- 1936 [Dale Carnegie: How to win friends and influence people](https://fs.blog/how-to-win-friends-and-influence-people/)
- 1966 [Peter Drucker: The Effective Executive](https://www.harpercollins.com/products/the-effective-executive-peter-f-drucker?variant=32207495856162)
- 1973 [Peter Drucker: Management: Tasks, Responsibilities, Practices](https://www.academia.edu/7194379/Management_Tasks_Responsibilitiesit_Peter_Drucker_)
- 1982 [Ken Blanchard, Spencer Johnson: The One Minute Manager](https://www.kenblanchard.com/Store/The-New-One-Minute-Manager)
- 1983 [Andrew Grove: High Output Management](https://about.gitlab.com/handbook/leadership/high-output-management/)
- 1984 [Eliyahu M. Goldratt: The Goal](https://jamesclear.com/book-summaries/the-goal)
- 1987 [Timothy Lister, Tom DeMarco: Peopleware](https://www.oreilly.com/library/view/peopleware-productive-projects/9780133440706/)
- 1989 [Stephen R. Covey: The 7 Habits of Highly Effective People](https://www.franklincovey.com/the-7-habits/)
- 1993 [David Maister: Managing the Professional Service Firm](https://davidmaister.com/books/mtpsf/)
- 1998 [John C. Maxwell: The 21 Irrefutable Laws of Leadership](https://store.maxwellleadership.com/The-21-Irrefutable-Laws-of-Leadership-25th-Anniversary-Edition-Hardcover_p_3038.html)
- 2001 [Tom DeMarco: Slack](https://www.penguinrandomhouse.com/books/39276/slack-by-tom-demarco/)
- 2001 [David Allen: Getting Things Done](https://gettingthingsdone.com/)
- 2002 [Patrick Lencioni: the Five Dysfunctions of a Team](https://www.tablegroup.com/product/dysfunctions/)
- 2007 [Michael Lopp: Managing Humans](https://link.springer.com/book/10.1007/978-1-4842-7116-2)
- 2008 [David Allen: Making It All Work](https://www.samuelthomasdavies.com/book-summaries/business/making-it-all-work/)
- 2013 [L. David Marquet: Turn the Ship Around](https://davidmarquet.com/turn-the-ship-around-book/)
- 2014 [Jeff Sutherland: Scrum](https://www.scruminc.com/new-scrum-the-book/)
- 2015 [Jocko Willink, Leif Babin: Extreme Ownership](https://us.macmillan.com/books/9781250183866/extremeownership)
- 2016 [Mark Horstman: The Effective Manager](https://www.oreilly.com/library/view/the-effective-manager/9781119244608/)
- 2017 [John Doerr: Measure What Matters](https://www.whatmatters.com/the-book)
- 2018 [Daniel Coyle: The Culture Code](https://danielcoyle.com/the-culture-code/)
- 2019 [Matt Mochary: The Great CEO Within](https://mocharymethod.org/the-great-ceo-within/)
- 2019 [David Allen: The Getting Things Done Workbook](https://gettingthingsdone.com/books/)
- 2021 [Alex MacCaw: The Manager's Handbook](https://themanagershandbook.com/)
- 2023 [Claire Hughes Johnson: Scaling People](https://press.stripe.com/scaling-people)

## Management Resources

- [Workshop tactics](https://www.workshoptactics.com/pages/tactics)
- [Atlassian: Team Playbook](https://www.atlassian.com/team-playbook)
- [Managers playbook](https://github.com/ksindi/managers-playbook)
- [Managing Complex Change](https://addyosmani.com/blog/managing-complex-change/)
- [How Complex Systems Fail](https://how.complexsystems.fail/)
- [Focus on high-leverage activities](https://addyosmani.com/blog/high-leverage-activites/)
- [Manage like an engineer](https://ben.balter.com/2023/01/10/manage-like-an-engineer/)
- [Management cybernetics](https://en.wikipedia.org/wiki/Management_cybernetics)
- [Organizational boundary problems: too many cooks or not enough kitchens?](https://medium.com/@ElizAyer/organizational-boundary-problems-too-many-cooks-or-not-enough-kitchens-2ddedc6de26a)
- [Team topologies](https://teamtopologies.com/key-concepts)
- [The Dangerous Animals of Product Management](https://www.productboard.com/dangerous-animals/)
- [Your view of management is upside down](https://figuregrounds.substack.com/p/your-view-of-management-is-upside)
- [The roadmap is not the territory](https://tomcritchlow.com/2023/04/18/roadmap-territory/)
- [Why Are You Doing This? (Wrong Answers Only)](https://cutlefish.substack.com/p/tbm-217-why-are-you-doing-this-wrong)
- [Some mistakes I made as a new manager](https://www.benkuhn.net/newmgr/)
- [Project management for engineers](https://www.benkuhn.net/pjm/)
- [Handoff Waste and Taylorism](https://two-wrongs.com/handoff-waste-and-taylorism.html)
- [Leaky Delegation: You are not a Commodity](https://www.lesswrong.com/posts/tTWL6rkfEuQN9ivxj/leaky-delegation-you-are-not-a-commodity)
- 1970-03: [NASA SP-287: What Made Apollo a Success?](https://history.nasa.gov/SP-287/sp287.htm)
- [Tucker Connelly: Management & Leadership](https://tuckerconnelly.com/management-leadership)
- [Measuring developer productivity? A response to McKinsey](https://tidyfirst.substack.com/p/measuring-developer-productivity)
- [High Variance Management](https://blog.sbensu.com/posts/high-variance-management/)
- [Demings 14 points](https://deming.org/explore/fourteen-points/)
- [Kashs garden](https://seths.blog/2024/01/kashs-garden/)
- [Guide to the Theory of Constraints](https://www.dbrmfg.co.nz/)
- [How To Fix Broken Teams](https://staysaasy.com/management/2024/01/23/fix-teams.html)
- [A “Definition of Done” Template](https://danmall.com/posts/a-definition-of-done-template/)
- [TBM 269: Three Organizational Design Principles](https://cutlefish.substack.com/p/tbm-269-three-organizational-design)
- [A3: Avoid Memos With An Agenda](https://two-wrongs.com/a3-avoid-memos-with-an-agenda.html)
- [Handoff Waste and Taylorism](https://two-wrongs.com/handoff-waste-and-taylorism.html)
- [REVIEW: Scaling People, by Claire Hughes Johnson](https://www.thepsmiths.com/p/review-scaling-people-by-claire-hughes)
- [Accepting Uncertainty: The Problem of Predictions in Software Engineering](https://jmlascala71.medium.com/accepting-uncertainty-the-problem-of-predictions-in-software-engineering-26dbcd120b90)
- [Why Aren't We Talking About Continuous Improvement?](https://cutlefish.substack.com/p/tbm-284-why-arent-we-talking-about)
- [Managing Underperformers](https://jackdanger.com/managing-underperformers/)
