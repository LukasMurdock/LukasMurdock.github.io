---
layout: post
title: 'University Organization'
description: ''
date: 'February 17, 2023'
code: true
---

## School folder structure

`/School/01_Classes/`

- `Y1S2_2019_Aug29-2019Dec14`
- `Y1S2_2020_Jan27-2020May16`
- `Y2S1_2020_Aug14-2020Dec`
- `Y2S2_2021_Jan25-2021May15`
- `Y3S1_2021_Aug17-Dec8`
- `Y3S1_2021_Winter`
- `Y3S2_2022_Jan24-2022May14`
- `Y4S1_2022_Aug22-Dec09`
- `Y4S2_2023_Jan23-May12`

Format (roughly):

```
Y{yearNumber}S{semesterNumber}_{semesterStartYear}_{semesterStartMonth + semesterStartDay}-{semesterEndYear + semesterEndMonth + semesterEndDay}
```

Each class gets its own folder.

If the class provides many documents, sub-folders are created based on the content format.

For example:

`/School/01_Classes/Y3S1_2021_Aug17-Dec8/CSE174/`

- `/assignments`
- `/labs`
- `/quizzes`

`/School/01_Classes/Y4S2_2023_Jan23-May12/ENG219/`

- `/assignments`
- `/slides`

## Syllabi

I rewrite syllabus dates for each class into .txt files with the following format:

```
MKT 442		Section A		Highwire Brand Studio

Mon, Jan 23	Referral Network Groups
Wed, Jan 25	Client Presents Project
Mon, Jan 30
Wed, Feb 1
Mon, Feb 6	Presentations: Referral Network Groups
Wed, Feb 8	Presentations: Referral Network Groups
Mon, Feb 13	Market Analysis Overview & Permanent Teams Assigned
Wed, Feb 15	Market Analysis Overview
Mon, Feb 20
--- You are here	---
Wed, Feb 22
Mon, Feb 27	Presentations: Market Analysis
Wed, Mar 1	Presentations: Market Analysis
Mon, Mar 6	Market Strategy Overview
Wed, Mar 8	Market Strategy Overview
Mon, Mar 13
Wed, Mar 15
---	Spring Break	---
Mon, Mar 27
Wed, Mar 29
Mon, Apr 3	Presentations: Market Strategy
Wed, Apr 5	Tactical Execution Overview
Mon, Apr 10
Wed, Apr 12
Mon, Apr 17	Presentations: Tactical Execution
Wed, Apr 19	Presentations: Tactical Execution
Mon, Apr 24	Finalize Deliverables
Wed, Apr 26	Final Presentation Rehearsals
Mon, May 1	Final Presentation Rehearsals
Wed, May 3	Present to Client
Final		Final Deliverables
```

These do not go into the class files. Instead they go into the semester root so I can easily reference and reopen them.

## Syllabus open script

I created a zsh alias `school` to quickly re-open all current semester syllabus files in TextEdit.

```
school='zsh ~/scripts/openschool.sh'
```

```zsh
# openschool.sh
# !/bin/zsh
# open school text files in TextEdit

# set school directory
schoolDir="/Users/<…/…/…/…>/School/01_Classes/Y4S2_2023_Jan23-May12"

# set word split to split on spaces
setopt sh_word_split

# get string of text files in school directory
schoolFiles=$(ls $schoolDir | grep .txt)

# open every school file in TextEdit
for file in $schoolFiles
do
    open -a TextEdit $schoolDir/$file
done
```
