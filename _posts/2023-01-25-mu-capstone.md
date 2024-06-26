---
layout: post
title: 'MU Capstone'
description: ''
date: 'January 25, 2023'
---

<style>
    main a:hover {
        text-decoration: underline 3px black;
        background: #FFDD00;
        color: black;
    }
</style>

<style>

    /*=------------------------------=*/
    /*= Internal (within-site) links =*/
    /*=------------------------------=*/

    main a[href^="/"]::after {
        content: "𝔏";
        position: static;
        margin: 0;
        padding: 2px;
        opacity: 0.6;
    }

    main a[href^="#"]::after {
        content: "↴";
        position: static;
        font-size: 12px;
        margin: 0;
        padding: 2px;
        /* opacity: 0.6; */
    }

    /*=---------------------------------=*/
    /*= Graphical per-domain link icons =*/
    /*=---------------------------------=*/

    a[href*="wikipedia.org"]::after{
        display: inline-block;
        content: '';
        position: static;
        background-image: url('/images/icons/wikipedia.svg');
        background-size: 17px 17px;
        background-position-x: center;
        height: 17px;
        width: 17px;
        margin: 0;
        opacity: 0.6;
    }

    a[href*="bls.gov"]::after{
        display: inline-block;
        content: '';
        position: static;
        background-image: url('/images/icons/bls.svg');
        background-size: 17px 17px;
        background-position-x: center;
        height: 17px;
        width: 17px;
        margin: 0;
        opacity: 0.6;
    }

    a[href*="hhs.gov"]::after,
    a[href*="samhsa.gov"]::after,
    a[href*="findtreatment.gov"]::after,
    a[href*="nih.gov"]::after {
        display: inline-block;
        content: '';
        position: static;
        background-image: url('/images/icons/hhs.svg');
        background-size: 17px 17px;
        background-position-x: center;
        height: 17px;
        width: 17px;
        margin: 0;
        opacity: 0.6;
    }

    /*
    internetarchive
    naics
    ibisworld
    */

</style>

## Table of contents

* Do not remove this line (it will not be displayed)
{:toc}

---

## Background on project

tl;dr: A team of researchers and professors received a grant from the Ohio Department of Higher Education to develop “a downloadable cell-phone ready application” to help people with substance use disorders and their family members find suitable recovery placement options. In addition, the app will provide information on the availability, qualifications, and potential fit of different recovery facilities. The project will last 18 months and involve partnerships with multiple organizations and stakeholders to ensure the app meets the community’s needs.

---

[Interact for Health](https://interactforhealth.org/) focuses on reducing tobacco use, addressing the opioid epidemic and ensuring that children have access to health care through school-based health centers. They are an independent foundation that serves 20 counties in Ohio, Kentucky and Indiana.

August 22, 2019: [Survey by Miami U. will connect addicts with recovery options](https://www.daytondailynews.com/news/first-its-kind-survey-miami-will-connect-addicts-with-recovery-options/r5qInvsmJKGLL2skFFaWlJ/), funded by Interact for Health.

M. Cameron Hay, Professor of Anthropology at Miami University, and Abbe Lackmeyer prepared the report “[Recovery Housing Gap Analysis](https://www.interactforhealth.org/upl/media/recovery_housing_gap_analysis.pdf)” for Interact for Health on April 30, 2020.

A proposal was made in 2021 to the ODHE ([Ohio Department of Higher Education](https://highered.ohio.gov/about)).

> As a transdisciplinary team of researchers and professors, we propose to develop a downloadable cell-phone ready application (app) to enable people with substance use disorders and their family members to initiate evidence-based care by finding recovery placement options with up-to-date availability, needed qualifications, and potential fit information.
> […]
> We propose an 18 month project […] to enable people seeking recovery and their family members to easily find and match with available placements with recovery services. This project will be measured by a reduction in reported time and stress it takes to find placement in a recovery house, and a reduction in reported time and stress in filling empty beds at recovery houses.

Phases:
1. Identify characteristics and challenges of the potential app
2. Spring 2022 IMS 351 designs app prototype
3. Summer 2022 GHS 201 tests app prototype
4. Fall 2022 IMS 440 develops app beta
5. Winter 2022 App development tech company finalizes app
6. Spring 2023 Highwire Brand Studio develops marketing campaign for app
7. May 2023 deliver app, business plan, and marketing plan

[Third Frontier & Technology](https://development.ohio.gov/business/third-frontier-and-technology)

On May 01, 2022, Miami University news published _The Wrap-Up: May_ and noted an ODHE grant for $278,750.

> Cameron Hay-Rollins, chair and professor of Anthropology, Michael Bailey-Van Kuren, interim chair and associate professor of EBTD, Christopher Sutter, associate professor of Entrepreneurship, and Timothy Greenlee, professor of Marketing, received a grant from the Ohio Department of Higher Education of $278,750 for their project “Finding Recovery: Research and Development to Match People with Substance Use Disorders to Recovery Services in Real Time.” ([MU News](https://miamioh.edu/news/2022/06/the-wrap-up-may.html))

On July 15, 2022, a Formative Report was provided to the ODHE.

>  Currently peer support case workers use a facebook group and carry a binder to find placements in recovery houses. Some houses (particularly for-profit houses) send emails daily to case managers on a list serv to update the number of available beds. Case managers tell clients about the houses, but reported that clients do not feel like they have much choice. Case workers underscored how this app would allow them to quickly narrow down options to a couple of potential houses for their clients, enabling those clients or their advocates to visually weigh the options, make choices, and directly contact the house within the app.

On January 23, 2023, Highwire Brand Studio had its first day of class. Led by:
- Dr. Tim Greenlee, Professor, Department of Marketing
- Christy Carr, Assistant Teaching Professor, Communication Design
- Michael Bailey-Van Kuren, Ph.D., Associate Professor and Chair Emerging Technology in Business

AORs:
- Marketing Plan: Greenlee
- Prototype and Beta App: Bailey-Van Kuren

On the first day, they put us into groups to come up with a list of names, without much explanation. The name and logo they had used for two years was denied by legal.

Items on the syllabus include:
- Market analysis presentation (Mon, Feb 27 – Wed, Mar 1)
- Market strategy presentation (Mon, Apr 3)
- Tactical execution presentation (Mon, Apr 17 – Wed, Apr 19)
- Final presentation (Wed, May 3)

~Between late February and March 1st, [Seven Hills Technology](https://sevenhillstechnology.com/) selected as app partner.

---

## Project challenges

See [business challenges](/business-challenges) for a broader overview of challenges.

Core challenges:
1. An atomic network that can grow on its own
2. An accessible service that all can use

A directory is a [two-sided network](https://en.wikipedia.org/wiki/Two-sided_market) subject to [network effects](https://en.wikipedia.org/wiki/Network_effect), or [allee effect](https://en.wikipedia.org/wiki/Allee_effect). Network effects are destructive when starting—new networks regress to zero. At the start, this project is subject to the [Cold Start Problem](https://en.wikipedia.org/wiki/Cold_start_(recommender_systems)).

Reaching critical mass from a cold start is a major challenge for this project.

> There are usually a minority of users that will create disproportionate value and as a result, they will have disproportionate power. This the “Hard Side” of your network. They do more work, contribute more to your network, but are that much harder to acquire and retain. For social networks, these are often the content creators that generate the media everyone consumes. For app stores, these are the developers that actually create the products. For workplace apps, these are the managers that author and create documents and projects, and who invite coworkers to participate. For marketplaces, these are usually the sellers and providers who spend their entire day attracting users with their products and services.
>
> [The Cold Start Problem, Andrew Chen](https://andrewchen.com/solve-a-hard-problem-cold-start-problem/)

Questions to hypothesize:
- Who is the hard side of your network and how will they use the product?
- How do they first hear about the app, and in what context?
- As the network grows, why will people on the hard side come back?
- What makes the hard side sticky to the network such that when a new network emerges, they will retain on the product?

**The hard side of this network is residential mental health and substance abuse facilities.**

This directory could lean into the [Rich Barton Playbook](https://kwokchain.com/2019/04/09/making-uncommon-knowledge-common/) (founder of Expedia, Zillow, Glassdoor)—win markets with products that make uncommon knowledge common. Focus on becoming the authoritative public source on a subject at scale and low cost. High quality pages unique for each listing for an SEO land grab.

[FindTreatment.gov](https://findtreatment.gov/locator/details?U2FsdGVkX19qOSOYOSb61wsx6mC/Xpha3Nb8DJwNebUkiijkG+OAkZk13WTxU97vJynBn3CLt/onJRDWt29HwMvoiPsqekQlhsJBkU1KqX8flzgd99l/947OEQl5CtIKfQg0OvIrMbqr2TkxGR6zaySfXlKqfQ7kHtkEB0h1bRs=) has _extremely_ authoritative pages for listings. However, these pages lack even basic structured metadata (dev: what are you even using react helmet for??).


## Treatment facility directories

### Directory users

- People looking for information on treatment facilities
    - [Organizations supporting people with SUD](#organizations)
        - Government
            - [SAMHSA](#substance-abuse-and-mental-health-services-administration-samhsa)
            - [NIH](#national-institutes-of-health)
            - [OhioMHAS](#the-ohio-department-of-mental-health-and-addiction-services-ohiomhas)
        - Non-profit
            - [NARR](#national-alliance-of-recovery-residences-narr)
            - [AA](https://www.aa.org/)
            - [Hazelden Betty Ford Foundation](#hazelden-betty-ford-foundation)
            - [ASAM](#american-society-of-addiction-medicine-asam)
            - [Partnership to End Addiction](#partnership-to-end-addiction)
            - [Young People in Recovery](#young-people-in-recovery)
        - For-profit (assumption)
            - [Outpatient mental health and substance abuse centers](#621420-outpatient-mental-health-and-substance-abuse-centers)
            - [Psychiatric and substance abuse hospitals](#622210-psychiatric-and-substance-abuse-hospitals)
            - [Residential mental health and substance abuse facilities](#623220-residential-mental-health-and-substance-abuse-facilities)
            - [Other residential care facilities](#623990-other-residential-care-facilities)
            - [Temporary shelters](#624221-temporary-shelters)
            - [Other community housing services](#624229-other-community-housing-services)
            - [Sober Nation](#sober-nation)
    - Jobs supporting people with SUD
        - [Substance abuse, behavioral disorder, and mental health counselors](#substance-abuse-behavioral-disorder-and-mental-health-counselors)
        - [Social workers](#social-workers)
        - [Miscellaneous community and social service specialists](#health-education-specialists)
    - Friends of a person with SUD
    - Family of a person with SUD
    - Researchers
- People looking to make information on their treatment facilities available
    - Facility owners
    - Facility managers

### Directory core service

- **Network:** The service must have the smallest possible network that is stable and can grow on its own
- **Accessible:** The service must be more accessible than alternatives
    - The goal is access for all
    - [WCAG: Four principles of accessibility](https://www.w3.org/WAI/WCAG21/Understanding/intro#understanding-the-four-principles-of-accessibility)
        1. The information must be perceivable to them
        2. The information must be understandable to them
        3. The interface must be operable
        4. The interface must be robust

### Mental and substance abuse disorder treatment directories

#### Binders

Social workers (frequency) carry binders with information on treatment locations.

> Currently peer support case workers use a facebook group and carry a binder to find placements in recovery houses.
>
> – July 15, 2022, Formative Report provided to ODHE


#### FindTreatment.gov

For individuals seeking substance use and mental health treatment options, FindTreatment.gov is the reliable online resource that delivers up-to-date information on available facilities, services, and providers because only FindTreatment.gov is maintained by [SAMHSA's](#substance-abuse-and-mental-health-services-administration-samhsa) CBHSQ, with designated representatives in each state agency responsible for updating information, ensuring accuracy and accessibility for those in need.

- ✓ Backed by [SAMHSA](#substance-abuse-and-mental-health-services-administration-samhsa)
- ✓ Authorized by the [21st Century Cures Act](#114c-hr34-21st-century-cures-act-of-2016)
- ✓ Data from [the National Substance Use and Mental Health Services Survey (N‑SUMHSS)](#cbhsq-data-collections)
- ✓ Designated people to update status and location information
- Accessibility is not a priority, terrible performance
    - !!! 1.5 minutes to load on Slow 3G (Large bundle sizes, no SSR)
    - !! No metadata for facility pages
    - ! Requires JS (No SSR)
    - ! Filter state does not exist in URL
- ✓ Facilities have URLs
- ✓ _Extremely_ authoritative pages
- ✓ Robust treatment filters
- ✓ Search results are paginated
- ✓ Button to redirect to print-friendly search results page
- ✓ Button to download search results as Excel and CSV
- ✓ At some point in 2020, the [“SAMHSA box”](https://www.seroundtable.com/google-samhsa-national-hotline-for-rehab-addiction-queries-29519.html) now shows above all relevant Google searches and for others, SAMHSA results will appear above other results
- ✓ [Recover Together](https://recovertogether.withgoogle.com/treatment/) project by Google links to FindTreatment.gov

Wayback machine shows:
- [findtreatment.samhsa.gov/locator](https://web.archive.org/web/20230000000000*/https://findtreatment.samhsa.gov/locator) first saved in 2014.
- [findtreatment.gov](https://web.archive.org/web/20230000000000*/https://findtreatment.gov/) first saved sometime in 2019.

#### [Ohio Recovery Housing Locator](https://find.ohiorecoveryhousing.org)

See: [ORH](#ohio-recovery-housing-orh)

- Accessibility is not a priority: bad performance, bad screen reader support
- !! Facilities do not have URLs or views
- !! Search results are not paginated
- ✓ SSR, does not require JS
- ✓ Filter state exists in URL
- ✓ State affiliate of [NARR](#national-alliance-of-recovery-residences-narr)

#### [Sober Nation directory](https://sobernation.com/)

See: [#sobernation]

- ✓ [Facilities have URLs](https://sobernation.com/listing/sojourner-recovery-services-hamilton-oh/)
- ✓ Facilities have metadata
    - head
    - opengraph
    - json-ld
    - microdata
- ✓ Lists nearby facilities

#### [Taste Recovery](https://tasterecovery.com/)

On 2020-05-15, Brianna Nowlan registered Taste Recovery LLC in California. Taste Recovery is available on [Web](https://tasterecovery.com/home), [iOS](https://apps.apple.com/ua/app/taste-recovery/id1504035022), and [Google Play](https://play.google.com/store/apps/details?id=com.tasterecovery.app&pli=1).

[LinkedIn: Brianna](https://www.linkedin.com/in/breezy-nowlan-4374a078)

Runs: [Camp Sober Fest](https://campsoberfest.com/), a 3-Day event celebrating fun and fellowship in sobriety that ran October 14-16, 2022.

From [FAQ](https://tasterecovery.com/faq): “you can then upgrade your house to a promoted home through our ad services.”

Web version relaunched in 2023 rebuilt with Create-React-App.
- Accessibility is not a priority, terrible performance
    - ! Limited metadata on facility pages
    - ! Requires JS (No SSR)
    - ! Filter state does not exist in URL
- ✓ [Filter state exists in API URL](https://api.tasterecovery.com/v6/living/search?paymentPeriod=any&servingForWhom=any&availability=any&pets=any&transportation=any&room=any&bathroom=any&handicapFriendly=any&smokeFriendly=any&privateChef=any&children=any&acceptMAT=any&isCertifiedSoberLiving=any&priceMin=0&priceMax=30000&page=1&stateLong=Ohio)
    - ! API requires filters to be set
- ✓ Allows reviews





## Background on recovery housing

[SAMHSA: Recovery and Recovery Support](https://www.samhsa.gov/find-help/recovery)

[One Step Software: Sober living all-in-one software, website, and marketing](https://www.onestepsoftware.com/)

Recovery housing is for:
- People who struggle with addiction
- People in addiction recovery
- People leaving residential treatment programs (after addiction program, before returning home)
- People without a home
- People leaving the criminal justice system
- People with mental health issues

Recovery housing is a housing environment that is free from alcohol and illicit drug use and offers peer support, connection to treatment, recovery supports, and other associated supports in the community.

Example recovery home: [Talbert House](https://www.talberthouse.org/help/)

Recovery housing is a [type of treatment](https://findtreatment.gov/what-to-expect/treatment#Types%20of%20Treatment) among:
- Supervised withdrawal from substance use (detox)
- Daily medication and emergency counseling (interim care)
- Treatment at a program site while a patient lives on their own (outpatient)
    - See [NAICS: 621420, Outpatient mental health and substance abuse centers](#621420-outpatient-mental-health-and-substance-abuse-centers)
- 24/7 care connected to a hospital, lasting days or weeks (hospital inpatient)
    - See [NAICS: 622210, Psychiatric and substance abuse hospitals](#622210-psychiatric-and-substance-abuse-hospitals)
- Live-in care, lasting for one month to one year (residential)
    - See [NAICS: 623220, Residential mental health and substance abuse facilities](#623220-residential-mental-health-and-substance-abuse-facilities)
    - See [NAICS: 623990, Other residential care facilities](#623990-other-residential-care-facilities)
- A temporary space to stay while transitioning from an intensive treatment setting. Sometimes called a halfway house or sober living facility. (transitional housing)
    - See [NAICS: 624221, Temporary shelters](#624221-temporary-shelters)
    - See [NAICS: 624229, Other community housing services](#624229-other-community-housing-services)
- Integrated care that addresses substance use and mental illness
- Care given over the phone or online to support treatment and recovery (telemedicine)

The [2021 N-SUMHSS survey](https://www.samhsa.gov/data/sites/default/files/reports/rpt39450/2021%20N-SUMHSS%20Annual%20Detailed%20Tables_508_Compliant_2_8_2023.pdf) categorizes services in the buckets:
- Assessment and pre-treatment services
    - Screening for substance abuse
- Testing
    -  Drug and alcohol oral fluid testing
- Medical services
    - Hepatitis A (HAV) vaccination
- Transitional services
    - Discharge planning
- Recovery support services
    - Mentoring/peer support
    - Self-help groups
    - Assistance in locating housing for clients
    - Employment counseling or training for clients
    - Assistance with obtaining social services (for example, Medicaid, WIC, SSI, SSDI)
    - Recovery coach
- Education and counseling services
    - HIV or AIDS education, counseling, or support
- Ancillary services
    - Case management services
- Other services
    - Treatment for gambling disorder
- Pharmacotherapies
    - Disulfiram (Antabuse®)

Clinical/therapeutic approaches used frequently
- Substance abuse counseling
- 12-step facilitation
- Brief intervention
- Cognitive behavioral therapy
- Contingency management/motivational incentives
- Motivational interviewing
- Trauma-related counseling
- Anger management
- Matrix model
- Community reinforcement plus vouchers
- Relapse prevention
- Telemedicine/telehealth
- Other treatment approach

The categorization of housing is not standardized across the US. Some states do have category standards.

(2018) [OhioMHAS: Ohio housing categories and definitions](https://mha.ohio.gov/static/Portals/0/assets/SchoolsAndCommunities/CommunityAndHousing/HousingResources/Housing-Definitions_122018.pdf)

OhioMHAS lists four housing categories (confirm):
1. Permanent housing
    - Private apartments
    - Permanent supportive housing (PSI)
    - Recovery residence
2. Residential care
    - Child residential care/group home
    - Residential facility
    - Assisted living
3. Temporary
    - Foster care (adult or child)
    - Homeless emergency shelter
    - Respite care
    - Temporary housing
    - Transitional housing
4. Residential treatment
    - Crisis care
    - Detox
    - Residential facility class 1 (residential treatment mental health)
    - Recovery residence Level 4 (residential treatment substance use)

Here are steps someone might take to find themselves in recovery housing from [Substance Use Disorder](https://www.nimh.nih.gov/health/topics/substance-use-and-mental-health): [What happens next?](https://findtreatment.gov/what-to-expect/treatment#What%20Happens%20Next?)

Seeking help → Assessment → Detox → Rehabilitation → Aftercare → Ongoing support

1. **Seeking help**: The first step is to admit that there is a problem and to seek help. This could involve talking to a trusted friend or family member, seeing a doctor or mental health professional, or reaching out to a local support group.
2. **Assessment**: A professional will conduct an assessment to determine the extent of the substance use disorder and to develop a treatment plan.
3. **Detox**: Depending on the severity of the addiction, a medically supervised withdrawal may be necessary to help the individual safely withdraw from the substance they are using as withdrawal can be so severe that people hallucinate, have convulsions, or develop other dangerous conditions. Detox can take place on a regular medical ward of a hospital, in a specialized inpatient detoxification unit, or on an outpatient basis with close medical supervision. Detoxification may take several days to a week or more.
4. **Rehabilitation**: After detox, the individual may enter a rehabilitation program where they receive treatment and support for their addiction. This could involve individual or group therapy, counseling, and participation in support groups.
5. **Aftercare**: Upon completion of the rehabilitation program, the individual may transition to recovery housing where they can continue to receive support as they work on their recovery.
6. **Ongoing support**: It is important for the individual to continue to attend support groups, therapy sessions, and to have a strong support network as they work on their ongoing recovery.

People with SUD (Substance Use Disorder) can find recovery homes through several ways, including:

- Referrals from healthcare providers: Doctors, therapists, or other healthcare providers may know about recovery homes in the area and can make a referral.
- Online resources: There are websites and online directories that list recovery homes and provide information about their services and locations.
- Support groups: Support groups such as Alcoholics Anonymous or Narcotics Anonymous may have information about recovery homes in the area.
- Hotlines: Substance abuse hotlines can provide information about recovery homes and help connect individuals with appropriate resources.
- Community organizations: Community organizations such as churches or non-profits may have information about recovery homes and can provide referrals.

See [NAICS 62322: Residential mental health and substance abuse facilities](#623220-residential-mental-health-and-substance-abuse-facilities)

## Mental health and substance use disorder treatment

[Find treatment](https://www.samhsa.gov/find-treatment)

### [Who provides care?](https://findtreatment.gov/what-to-expect/treatment#Who%20Provides%20Care?)

In most treatment programs, the main caregivers are specially trained individuals who are certified or licensed as substance use treatment counselors.

Most treatment programs assign patients to a treatment team of professionals. Depending on the type of treatment, teams can be made up of social workers, counselors, doctors, nurses, psychologists, and psychiatrists.

- [Who provides care?](#who-provides-care)
    - [Substance abuse, behavioral disorder, and mental health counselors](#substance-abuse-behavioral-disorder-and-mental-health-counselors)
    - Social workers
        - [Healthcare social workers](#healthcare-social-workers)
        - [Mental health and substance abuse social workers](#mental-health-and-substance-abuse-social-workers)
    - Miscellaneous community and social service specialists
        - [Health education specialists](#health-education-specialists)
        - [Probation officers and correctional treatment specialists](#probation-officers-and-correctional-treatment-specialists)
        - [Social and human service assistants](#social-and-human-service-assistants)
        - [Community health workers](#community-health-workers)

### [Substance abuse, behavioral disorder, and mental health counselors](https://www.bls.gov/ooh/community-and-social-service/substance-abuse-behavioral-disorder-and-mental-health-counselors.htm)

Substance abuse, behavioral disorder, and mental health counselors advise people on a range of issues, such as those relating to alcoholism, addictions, or depression.

Substance abuse, behavioral disorder, and mental health counselors work in a variety of settings, such as mental health centers, community health centers, and private practice. Most work full time, although part-time work is common.

- Number of jobs (2021): 351,000
- Job outlook: 22% (much faster than average)

[Similar occupations](https://www.bls.gov/ooh/community-and-social-service/substance-abuse-behavioral-disorder-and-mental-health-counselors.htm):
- Psychologists
- Registered nurses
- Rehabilitation counselors
- Social and community services managers

[Industry profile for Substance Abuse, Behavioral Disorder, and Mental Health Counselors](https://www.bls.gov/oes/current/oes211018.htm#ind):
- [Outpatient care centers](#621420-outpatient-mental-health-and-substance-abuse-centers): 72,820 (7.38% of industry)
- Individual and family services: 51,580 (1.94% of industry)
- Officies of other health practitioners 38,250 (3.93% of industry)
- [Residential intellectual and developmental disability, mental health, and substance abuse facilities](#623220-residential-mental-health-and-substance-abuse-facilities): 35,410 (5.78% of industry)
- [Psychiatric and substance abuse hospitals](#622210-psychiatric-and-substance-abuse-hospitals): 15,270 (6.38% of industry)
- [Other residential care facilities](#623990-other-residential-care-facilities): 7,660 (5.08% of industry)

[Geographic profile for Substance Abuse, Behavioral Disorder, and Mental Health Counselors](https://www.bls.gov/oes/current/oes211018.htm#st)

### [Social Workers](https://www.bls.gov/ooh/community-and-social-service/social-workers.htm)

Social workers help people prevent and cope with problems in their everyday lives.

Social workers are employed in a variety of settings, including child welfare and human service agencies, healthcare providers, and schools. Most work full time, and some work evenings, weekends, and holidays.

- Number of jobs (2021): 708,100
- Job outlook: 9% (faster than average)

#### [Healthcare Social Workers](https://www.bls.gov/oes/current/oes211022.htm)

Provide individuals, families, and groups with the psychosocial support needed to cope with chronic, acute, or terminal illnesses. Services include advising family caregivers. Provide patients with information and counseling, and make referrals for other services. May also provide case and care management or interventions designed to promote health, prevent disease, and address barriers to access to healthcare.

Employment: 173,860

**Industry profile for Healthcare Social Workers**

- General medical and surgical hospitals: 43,120 (0.77% of industry)
- Individual and family services: 22,040 (0.83% of industry)
- Home health care services: 21,350 (1.41% of industry)
- Nursing care facilities (Skilled Nursing Facilities): 13,510 (0.96% of industry)
- [Outpatient care centers](#621420-outpatient-mental-health-and-substance-abuse-centers): 13,480 (1.37% of industry)

#### [Mental Health and Substance Abuse Social Workers](https://www.bls.gov/oes/current/oes211023.htm)

Assess and treat individuals with mental, emotional, or substance abuse problems, including abuse of alcohol, tobacco, and/or other drugs. Activities may include individual and group therapy, crisis intervention, case management, client advocacy, prevention, and education.

Employment: 113,810

**Industry profile for Mental Health and Substance Abuse Social Workers**

- [Outpatient care centers](#621420-outpatient-mental-health-and-substance-abuse-centers): 24,900 (2.52% of industry)
- Individual and family services: 14,860 (0.56% of industry)
- [Residential intellectual and developmental disability, mental health, and substance abuse facilities](#623220-residential-mental-health-and-substance-abuse-facilities): 11,960 (1.95% of industry)
- [Psychiatric and substance abuse hospitals](#622210-psychiatric-and-substance-abuse-hospitals): 10,370 (4.33% of industry)

[Data USA](https://datausa.io/profile/soc/mental-health-and-substance-abuse-social-workers)

### Miscellaneous community and social service specialists

#### [Health Education Specialists](https://www.bls.gov/oes/current/oes211091.htm)

Provide and manage health education programs that help individuals, families, and their communities maximize and maintain healthy lifestyles. Use data to identify community needs prior to planning, implementing, monitoring, and evaluating programs designed to encourage healthy lifestyles, policies, and environments. May link health systems, health providers, insurers, and patients to address individual and population health needs. May serve as resource to assist individuals, other health professionals, or the community, and may administer fiscal resources for health education programs. Excludes “Community Health Workers” (21-1094).

Employment: 55,830

#### [Probation Officers and Correctional Treatment Specialists](https://www.bls.gov/oes/current/oes211092.htm)

Provide social services to assist in rehabilitation of law offenders in custody or on probation or parole. Make recommendations for actions involving formulation of rehabilitation plan and treatment of offender, including conditional release and education and employment stipulations.

Employment: 92,140

#### [Social and Human Service Assistants](https://www.bls.gov/oes/current/oes211093.htm)

Assist other social and human service providers in providing client services in a wide variety of fields, such as psychology, rehabilitation, or social work, including support for families. May assist clients in identifying and obtaining available benefits and social and community services. May assist social workers with developing, organizing, and conducting programs to prevent and resolve problems relevant to substance abuse, human relationships, rehabilitation, or dependent care. Excludes “Rehabilitation Counselors” (21-1015), “Psychiatric Technicians” (29-2053), “Personal Care Aides” (31-1122), and “Eligibility Interviewers, Government Programs” (43-4061).

Employment: 398,380

**Industry profile for Social and Human Service Assistants**

- Individual and family services: 116,000	(4.37% of industry)
- Local government: 47,310	(0.88% of industry)
- State government: 38,270	(1.74% of industry)
- [Residential intellectual and developmental disability, mental health, and substance abuse facilities](#623220-residential-mental-health-and-substance-abuse-facilities): 31,670 (5.17% of industry)
- [Community food and housing, and emergency and other relief services](#6242-community-food-and-housing-and-emergency-and-other-relief-services): 28,520 (15.00% of industry)

#### [Community Health Workers](https://www.bls.gov/oes/current/oes211094.htm)

Promote health within a community by assisting individuals to adopt healthy behaviors. Serve as an advocate for the health needs of individuals by assisting community residents in effectively communicating with healthcare providers or social service agencies. Act as liaison or advocate and implement programs that promote, maintain, and improve individual and overall community health. May deliver health-related preventive services such as blood pressure, glaucoma, and hearing screenings. May collect data to help identify community health needs. Excludes “Health Education Specialists” (21-1091).

Employment: 61,010

## Opioid Treatment Programs

In the United States, the use of medication for opioid use disorder (MOUD) in opioid treatment programs (OTPs) is governed by the [Certification of Opioid Treatment Programs, 42 Code of Federal Regulations (CFR) 8](https://www.govregs.com/regulations/expand/title42_chapterI_part8_subpartC_section8.12).

The regulation created a system to certify and accredit OTPs, allowing them to administer and dispense FDA-approved medications. In addition, opioid use disorder (OUD) patients receiving these medications also receive counseling and other behavioral therapies to provide patients with a whole-person approach.

An OTP can help connect individuals with recovery housing options in their community, and may have established relationships with local recovery housing providers. The OTP staff can also help the individual navigate the process of securing housing, including identifying funding sources or other resources that may be available to support their transition.

[https://www.samhsa.gov/medications-substance-use-disorders/become-accredited-opioid-treatment-program](https://www.samhsa.gov/medications-substance-use-disorders/become-accredited-opioid-treatment-program)

### [Medications for Substance Use Disorders](https://www.samhsa.gov/medications-substance-use-disorders)

FDA has approved several different medications to treat alcohol use disorders (AUD) and opioid use disorders (OUD). These medications relieve the withdrawal symptoms and psychological cravings that cause chemical imbalances in the body. Medications used are evidence-based treatment options and do not just substitute one drug for another.

**Medications for Alcohol Use Disorder (MAUD)**

Acamprosate, disulfiram, and naltrexone are the most common medications used to treat alcohol use disorder. They do not provide a cure for the disorder but are most effective for people who participate in a treatment program.

**Medications for Opioid Use Disorder (MOUD)**

Buprenorphine, methadone, and naltrexone are the most common medications used to treat OUD. These medications operate to normalize brain chemistry, block the euphoric effects of alcohol and opioids, relieve physiological cravings, and normalize body functions without the negative and euphoric effects of the substance used.

Buprenorphine, methadone, and naltrexone are used to treat OUD to short-acting opioids such as heroin, morphine, and codeine, as well as semi-synthetic opioids like oxycodone and hydrocodone. These medications are safe to use for months, years, or even a lifetime.

### Title 42 of the Code of Federal Regulations: Public Health

[Title 42](https://www.ecfr.gov/current/title-42) is the principal set of rules and regulations issued by federal agencies of the United States regarding public health.

- [Title 42](https://www.ecfr.gov/current/title-42): Public Health
    - [Chapter 1](https://www.ecfr.gov/current/title-42/chapter-I): Public Health Service, Department of Health and Human Services
        - [Subchapter A](https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A): General Provisions
            - [Part 8](https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A/part-8): Medication Assisted Treatment for Opioid Use Disorders
                - Subpart A: General Provisions
                    - § 8.1	Scope.
                    - § 8.2	Definititions.
                - Subpart B: Accreditation of Opioid Treatment Programs
                    - § 8.3 Application for approval as an accreditation body.
                    - § 8.4 Accreditation body responsibilities.
                    - § 8.5 Periodic evaluation of accreditation bodies.
                    - § 8.6 Withdrawal of approval of accreditation bodies.
                - Subpart C: Certification and Treatment Standards for Opioid Treatment Programs
                    - § 8.11 Opioid treatment program certification.
                    - § 8.12 Federal opioid treatment standards.
                    - § 8.13 Revocation of accreditation and accreditation body approval.
                    - § 8.14 Suspension or revocation of certification.
                    - § 8.15 Forms.
                - Subpart D: Procedures for Review of Suspension or Proposed Revocation of OTP Certification, and of Adverse Action Regarding Withdrawal of Approval of an Accreditation Body
                - Subpart E: [Reserved]
                - Subpart F: Authorization To Increase Patient Limit to 275 Patients

#### Definitions

- **Accreditation body**: a body that has been approved by SAMHSA to accredit opioid treatment programs using opioid agonist treatment medications.
- **Accreditation survey**: an onsite review and evaluation of an opioid treatment program by an accreditation body for the purpose of determining compliance with the Federal opioid treatment standards described in [§ 8.12](https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A/part-8/subpart-C/section-8.12).
- **Accredited opioid treatment program**: an opioid treatment program that is the subject of a current, valid accreditation from an accreditation body approved by SAMHSA under § 8.3(d).
- **Behavioral health services**: any non-pharmacological intervention carried out in a therapeutic context at an individual, family, or group level. Interventions may include structured, professionally administered interventions (e.g., cognitive behavior therapy or insight oriented psychotherapy) delivered in person, interventions delivered remotely via telemedicine shown in clinical trials to facilitate medication-assisted treatment (MAT) outcomes, or non-professional interventions.
- **Certified opioid treatment program**: an opioid treatment program that is the subject of a current, valid certification under § 8.11.
- **Comprehensive maintenance treatment**: maintenance treatment provided in conjunction with a comprehensive range of appropriate medical and rehabilitative services.
- **Detoxification treatment**: the dispensing of an opioid agonist treatment medication in decreasing doses to an individual to alleviate adverse physical or psychological effects incident to withdrawal from the continuous or sustained use of an opioid drug and as a method of bringing the individual to a drug-free state within such period.
- **Interim maintenance treatment**: maintenance treatment provided in an opioid treatment program in conjunction with appropriate medical services while a patient is awaiting transfer to a program that provides comprehensive maintenance treatment.
- **Long-term detoxification treatment**: detoxification treatment for a period more than 30 days but not in excess of 180 days.
- **Short-term detoxification treatment**: detoxification treatment for a period not in excess of 30 days.
- **Maintenance treatment**: the dispensing of an opioid agonist treatment medication at stable dosage levels for a period in excess of 21 days in the treatment of an individual for opioid use disorder.
- **Medical director**: a physician, licensed to practice medicine in the jurisdiction in which the opioid treatment program is located, who assumes responsibility for administering all medical services performed by the program, either by performing them directly or by delegating specific responsibility to authorized program physicians and healthcare professionals functioning under the medical director's direct supervision.
- **Medical and rehabilitative services**: means services such as medical evaluations, counseling, and rehabilitative and other social programs (e.g., vocational and educational guidance, employment placement), that are intended to help patients in opioid treatment programs become and/or remain productive members of society.
- **Medication-Assisted Treatment (MAT)**: the use of medication in combination with behavioral health services to provide an individualized approach to the treatment of substance use disorder, including opioid use disorder.
- **Medication unit**: a facility established as part of, but geographically separate from, an opioid treatment program from which licensed private practitioners or community pharmacists dispense or administer an opioid agonist treatment medication or collect samples for drug testing or analysis.
- **Opioid agonist treatment medication**: any opioid agonist drug that is approved by the Food and Drug Administration under section 505 of the Federal Food, Drug, and Cosmetic Act (21 U.S.C. 355) for use in the treatment of opioid use disorder.
- **Opioid treatment program (OPT)**: a program or practitioner engaged in opioid treatment of individuals with an opioid agonist treatment medication registered under [21 U.S.C. 823(g)(1)](https://www.govinfo.gov/content/pkg/USCODE-2021-title21/pdf/USCODE-2021-title21-chap13-subchapI-partC-sec823.pdf).
- **Patient**: for purposes of subparts B through E of this part, means any individual who receives maintenance or detoxification treatment in an opioid treatment program. For purposes of subpart F of this part, patient means any individual who is dispensed or prescribed covered medications by a practitioner.
- **Practitioner**: means a physician who is appropriately licensed by the State to dispense covered medications and who possesses a waiver under 21 U.S.C. 823(g)(2).

#### [Certification of Opioid Treatment Programs, 42 Code of Federal Regulations (CFR) 8](https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A/part-8/subpart-C)

**[General](https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A/part-8/subpart-C#p-8.11(a))**

An OTP must be the subject of a current, valid certification from SAMHSA to be considered qualified by the Secretary under section 303(g)(1) of the Controlled Substances Act ([21 U.S.C. 823(g)(1)](https://www.govinfo.gov/content/pkg/USCODE-2021-title21/pdf/USCODE-2021-title21-chap13-subchapI-partC-sec823.pdf)) to dispense opioid drugs in the treatment of opioid use disorder.

To obtain certification from SAMHSA, an OTP must meet the Federal opioid treatment standards in § 8.12, must be the subject of a current, valid accreditation by an accreditation body or other entity designated by SAMHSA, and must comply with any other conditions for certification established by SAMHSA.

Certification shall be granted for a term not to exceed 3 years, except that certification may be extended during the third year if an application for accreditation is pending.

An OTP must be determined to be qualified under section 303(g)(1) of the Controlled Substances Act, and must be determined to be qualified by the Attorney General under section 303(g)(1), to be registered by the Attorney General to dispense opioid agonist treatment medications to individuals for treatment of opioid use disorder.

**[Medication units, long-term care facilities and hospitals](https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A/part-8/subpart-C#p-8.11(i))**

Certified OTPs may establish medication units that are authorized to dispense opioid agonist treatment medications for observed ingestion.

If a patient in a hospital or long-term care facility needs maintenance or detoxification treatment during their stay, but the patient was admitted for medical conditions other than opioid use disorder, an OTP is not required to have certification to provide maintenance or detoxification treatment.

**[Required Services of a Certified OTP](https://www.ecfr.gov/current/title-42/chapter-I/subchapter-A/part-8/subpart-C#p-8.12(f))**

- adequate medical, counseling, vocational, educational, and other assessment and treatment services.
- Initial medical examination
- Special services for pregnant patients
- Initial and periodic assessment
- Counseling
- Drug abuse testing

Opioid Treatment Program directory: [https://dpt2.samhsa.gov/treatment/](https://dpt2.samhsa.gov/treatment/)

There are 117 Opioid Treatment Programs in Ohio.

## NAICS

Establishments primarily engaged in providing treatment of mental health and substance abuse illnesses on an exclusively outpatient basis are classified in Industry 621420, Outpatient Mental Health and Substance Abuse Centers.

Establishments primarily engaged in providing residential care for persons with intellectual and developmental disabilities are classified in Industry 623210, Residential Intellectual and Developmental Disability Facilities.

Establishments known and licensed as hospitals primarily engaged in providing inpatient treatment of mental health and substance abuse illnesses with an emphasis on medical treatment and monitoring are classified in Industry 622210, Psychiatric and Substance Abuse Hospitals.

Establishments primarily engaged in operating halfway group homes for delinquents and ex-offenders are classified in Industry 623990, Other Residential Care Facilities.

---

Relevant industries:
- Sector 62: Health care and social assistance
    - 621000: Ambulatory Health care services
        - 621400: Outpatient care centers
            - [621420: Outpatient mental health and substance abuse centers](#621420-outpatient-mental-health-and-substance-abuse-centers)
    - 622000: Hospitals
        - [622200: Psychiatric and substance abuse hospitals](#622210-psychiatric-and-substance-abuse-hospitals)
    - 623000: Nursing and residential care facilities
        - 623200: Residential intellectual and developmental disability, mental health, and substance abuse facilities
            - [623220: Residential mental health and substance abuse facilities](#623220-residential-mental-health-and-substance-abuse-facilities)
        - 623900: Other Residential Care Facilities
            - [623990: Other residential care facilities](#623990-other-residential-care-facilities)
    - 624000: Social assistance
        - [624200: Community food and housing, and emergency and other relief services](#6242-community-food-and-housing-and-emergency-and-other-relief-services)
            - [624221: Temporary shelters](#624221-temporary-shelters)
            - [624229: Other community housing services](#624221-other-community-housing-services)
- Sector 99: Federal, state, and local government
    - [999300: Local government](https://www.bls.gov/oes/current/naics4_999300.htm)

### 621420: Outpatient mental health and substance abuse centers

- [NAICS code description: 621420](https://www.naics.com/naics-code-description/?code=621420)
- [BLS: 621420](https://www.bls.gov/oes/current/naics5_621420.htm)
- [IBISWorld: 62142](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62142/about) (Miami proxy)

This industry comprises establishments with medical staff primarily engaged in providing outpatient services related to the diagnosis and treatment of mental health disorders and alcohol and other substance abuse. These establishments generally treat patients who do not require inpatient treatment. They may provide a counseling staff and information regarding a wide range of mental health and substance abuse issues and/or refer patients to more extensive treatment programs, if necessary.

Illustrative examples:
- Outpatient alcoholism treatment centers and clinics (except hospitals)
- Outpatient mental health centers and clinics (except hospitals)
- Outpatient detoxification centers and clinics (except hospitals)
- Outpatient substance abuse treatment centers and clinics (except hospitals)
- Outpatient drug addiction treatment centers and clinics (except hospitals)

**IBISWorld Industry at a glance**

- $33.1BN Revenue
- $1.8BN Profit
- 15,163 Businesses
- 319K Employment
- $15.9BN Wages

### 622210: Psychiatric and substance abuse hospitals

- [NAICS code description: 622210](https://www.naics.com/naics-code-description/?code=622210)
- [BLS: 622200](https://www.bls.gov/oes/current/naics4_622200.htm)
- [IBISWorld: 62221](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62221) (Miami proxy)

This industry comprises establishments known and licensed as psychiatric and substance abuse hospitals primarily engaged in providing diagnostic, medical treatment, and monitoring services for inpatients who suffer from mental illness or substance abuse disorders. The treatment often requires an extended stay in the hospital. These establishments maintain inpatient beds and provide patients with food services that meet their nutritional requirements. They have an organized staff of physicians and other medical staff to provide patient care services. Psychiatric, psychological, and social work services are available at the facility. These hospitals usually provide other services, such as outpatient services, clinical laboratory services, diagnostic X-ray services, and electroencephalograph services.

- Alcoholism rehabilitation hospitals
- Children's hospitals, psychiatric or substance abuse
- Detoxification hospitals
- Drug addiction rehabilitation hospitals
- Hospitals for alcoholics
- Hospitals, addiction
- Hospitals, mental (except intellectual and developmental disability)
- Hospitals, psychiatric (except convalescent)
- Hospitals, psychiatric pediatric
- Hospitals, substance abuse
- Mental (except intellectual and developmental disability) hospitals
- Mental health hospitals
- Psychiatric hospitals (except convalescent)
- Rehabilitation hospitals, alcoholism and drug addiction

**IBISWorld Industry at a glance**

- $33.1BN Revenue
- $1.8BN Profit
- 466 Businesses
- 264K Employment
- $18.2BN Wages

**622210 SOC major groups**

- 00-0000  All Occupations
- 11-0000  Management Occupations
- 13-0000  Business and Financial Operations Occupations
- 15-0000  Computer and Mathematical Occupations
- 19-0000  Life, Physical, and Social Science Occupations
- 21-0000  Community and Social Service Occupations
    - 21-1000   Counselors, Social Workers, and Other Community and Social Service Specialists
        - 21-1010   Counselors
            - [21-1018   Substance Abuse, Behavioral Disorder, and Mental Health Counselors](#substance-abuse-behavioral-disorder-and-mental-health-counselors)
        - [21-1020   Social Workers](#social-workers)
            - 21-1022   [Healthcare Social Workers](#healthcare-social-workers)
            - 21-1023   [Mental Health and Substance Abuse Social Workers](#mental-health-and-substance-abuse-social-workers)
        - 21-1090   Miscellaneous Community and Social Service Specialists
            - 21-1091   [Health Education Specialists](#health-education-specialists)
            - 21-1092   [Probation Officers and Correctional Treatment Specialists](#probation-officers-and-correctional-treatment-specialists)
            - 21-1093   [Social and Human Service Assistants](#social-and-human-service-assistants)
            - 21-1094   [Community Health Workers](#community-health-workers)
- 23-0000  Legal Occupations
- 25-0000  Educational Instruction and Library Occupations
- 27-0000  Arts, Design, Entertainment, Sports, and Media Occupations
- 29-0000  Healthcare Practitioners and Technical Occupations
    - 29-1223   Psychiatrists
- 31-0000  Healthcare Support Occupations
- 33-0000  Protective Service Occupations
- 35-0000  Food Preparation and Serving Related Occupations
- 37-0000  Building and Grounds Cleaning and Maintenance Occupations
- 39-0000  Personal Care and Service Occupations
- 41-0000  Sales and Related Occupations
- 43-0000  Office and Administrative Support Occupations
- 47-0000  Construction and Extraction Occupations
- 49-0000  Installation, Maintenance, and Repair Occupations
- 51-0000  Production Occupations
- 53-0000  Transportation and Material Moving Occupations

[IBISWorld competitive landscape](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62221/competitive-landscape)

Key success factors

- Accreditation with the Joint Commission on the Accreditation of Healthcare Organizations can enhance reputation, attract staff and help to gain access to private and government insurance reimbursement programs.
- Access to highly skilled workforce
- Hospitals located close to referring doctors and the general population are in a stronger position to attract patients.
- Larger hospital operators can spread fixed costs over a greater number of patients, thereby improving profitability.

Competition in psychiatric hospital services is relatively low due to high fragmentation and growing demand for services.

IBISWorld major companies: [Universal Health Services](https://uhs.com/) (17.4% market share)

### 623220: Residential mental health and substance abuse facilities

- [NAICS code description: 623220](https://www.naics.com/naics-code-description/?code=623220)
- [BLS: 623220](https://www.bls.gov/oes/current/naics5_623220.htm)
- [IBISWorld: 62322](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62322/about) (Miami proxy)

This industry comprises establishments primarily engaged in providing residential care and treatment for patients with mental health and substance abuse illnesses. These establishments provide room, board, supervision, and counseling services. Although medical services may be available at these establishments, they are incidental to the counseling, mental rehabilitation, and support services offered. These establishments generally provide a wide range of social services in addition to counseling.

Illustrative examples:
- Alcoholism or drug addiction rehabilitation facilities (except licensed hospitals)
- Psychiatric convalescent homes or hospitals
- Mental health halfway houses
- Residential group homes for the emotionally disturbed

**IBISWorld Industry at a glance**

- $24.8BN Revenue
- $1.5BN Profit
- 4,649 Businesses
- 240K Employment
- $10.7BN Wages

[IBISWorld market segmentation](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62322/products-and-markets)

- 45.6% Medicare and medicaid
- 24.7% All other government funding (SAMHSA)
- 14.4% Other
- 10.7% Private insurance
- 4.6% Out-of-pocket payers

Government is the largest source of funding.

[IBISWorld competitive landscape](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62322/competitive-landscape)

Providing in-residence mental health or substance abuse center care is often more expensive than outpatient services alone. Consequently, most facilities are small-sized. Two-thirds of centers had under 20 employees in 2020.

Most residential centers (62.0% in 2020) are nonprofit and operate one to two locations.

Key success factors

- Must comply with government regulations
- Proximity to key markets (located close to referring doctors or their home, school or office)
- Access to highly skilled workforce



### 623990: Other Residential Care Facilities

- [NAICS code description: 623990](https://www.naics.com/naics-code-description/?code=623990)
- [BLS: 623990](https://www.bls.gov/oes/current/naics4_623900.htm)
- [IBISWorld: 62399](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62399/about) (Miami proxy)

This industry comprises establishments primarily engaged in providing residential care (except residential intellectual and developmental disability facilities, residential mental health and substance abuse facilities, continuing care retirement communities, and assisted living facilities for the elderly). These establishments also provide supervision and personal care services.

Illustrative Examples:
- Boot or disciplinary camps (except correctional) for delinquent youth
- Group homes for the hearing or visually impaired
- Child group foster homes
- Halfway group homes for delinquents or ex-offenders
- Delinquent youth halfway group homes
- Homes for unwed mothers
- Group homes for the disabled without nursing care
- Orphanages

### 6242: Community food and housing, and emergency and other relief services

- [NAICS code description: 6242](https://www.naics.com/naics-code-description/?code=6242)
- [BLS: 624200](https://www.bls.gov/oes/current/naics4_624200.htm)
- [IBISWorld: 62399](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62399/about) (Miami proxy)

This industry group comprises establishments primarily engaged in one of the following: (1) collecting, preparing, and delivering food for the needy; (2) providing short-term emergency shelter, temporary residential shelter, transitional housing, volunteer construction or repair of low-cost housing, and/or repair of homes for individuals or families in need; or (3) providing food, shelter, clothing, medical relief, resettlement, and counseling to victims of domestic or international disasters or conflicts (e.g., wars).

### 624221: Temporary shelters

- [NAICS code description: 624221](https://www.naics.com/naics-code-description/?code=624221)
- [IBISWorld: 62422](https://my-ibisworld-com.proxy.lib.miamioh.edu/us/en/industry/62422/about) (Miami proxy)

This U.S. industry comprises establishments primarily engaged in providing (1) short-term emergency shelter for victims of domestic violence, sexual assault, or child abuse and/or (2) temporary residential shelter for homeless individuals or families, runaway youth, and patients and families caught in medical crises. These establishments may operate their own shelters or may subsidize housing using existing homes, apartments, hotels, or motels.

- Emergency shelters
- Homeless shelters
- Runaway youth shelters
- Temporary housing for families of medical patients

### 624229: Other Community Housing Services

- [NAICS code description: 624229](https://www.naics.com/naics-code-description/?code=624229)

This U.S. industry comprises establishments primarily engaged in providing one or more of the following community housing services: (1) transitional housing to low-income individuals and families; (2) volunteer construction or repair of low-cost housing, in partnership with the homeowner who may assist in the construction or repair work; and (3) the repair of homes for elderly or disabled homeowners. These establishments may subsidize housing using existing homes, apartments, hotels, or motels or may require a low-cost mortgage or sweat equity. These establishments may also provide low-income families with furniture and household supplies.


## Organizations

### [Substance Abuse and Mental Health Services Administration (SAMHSA)](https://www.samhsa.gov/)

The Substance Abuse and Mental Health Services Administration (SAMHSA) is the agency within the U.S. Department of Health and Human Services that leads public health efforts to advance the behavioral health of the nation.

Congress established the Substance Abuse and Mental Health Services Administration (SAMHSA) in 1992 to make substance use and mental disorder information, services, and research more accessible.

SAMHSA maintains multiple treatment directories:
- [FindTreatment.gov](#findtreatmentgov)
- [Buprenorphine Practitioner Locator](https://www.samhsa.gov/medication-assisted-treatment/find-treatment/treatment-practitioner-locator)
- [Early Serious Mental Illness Treatment Locator](https://www.samhsa.gov/esmi-treatment-locator)
- [Opioid Treatment Program Directory](https://dpt2.samhsa.gov/treatment/)

#### [SAMHSA Offices and Centers](https://www.samhsa.gov/about-us/who-we-are/offices-centers)

SAMHSA Offices and Centers provide national leadership and assistance for quality behavioral health services while supporting states, territories, tribes, communities, and local organizations through grants and contract awards.

- Office of the Assistant Secretary for Mental Health and Substance Use: responsible to the Secretary of the Department of Health and Human Services for managing and directing SAMHSA.

- Office of Behavioral Health Equity Office of Behavioral Health Equity (OBHE): advances behavioral health equity by reducing disparities in racial, ethnic, LGBTQIA+, and other under-resourced communities across the country by improving access to quality services and supports that enables all to thrive, participate, and contribute to healthier communities.

- Office of the Chief Medical Officer (OCMO): provides assistance to the Assistant Secretary in evaluating and organizing programs within the Agency, and to promote evidence-based and promising best practices emphasizing clinical focus.

- Office of Financial Resources: develops and implements the policies and programs of the Assistant Secretary.

- Office of Intergovernmental and Public Affairs: provides leadership through the development, coordination, implementation, and articulation of national behavioral health policy.

- 988 & Behavioral Health Crisis Coordinating Office: transforming America’s behavioral health crisis care system to one that saves lives by serving anyone, at any time, in a seamless way, from anywhere across the nation.

- Office of Management, Technology, and Operations: oversees and supports SAMHSA needs.

- Office of Recovery: evaluates and initiates policy, programs and services with a recovery focus and ensure the voices of individuals in recovery are represented. The Office will forge partnerships to support all people, families and communities impacted by mental health and/or substance use conditions to pursue recovery, be resilient and achieve wellness.

- National Mental Health and Substance Use Policy Laboratory: leads the equitable coordination, analysis, development, and implementation of national policy to promote mental health, prevent substance misuse and addiction, provide treatment and support recovery.

- [Center for Behavioral Health Statistics and Quality (CBHSQ)](https://www.samhsa.gov/about-us/who-we-are/offices-centers/cbhsq): the lead Federal government agency for behavioral health data and research.

See: [CBHSQ data collections](#cbhsq-data-collections).

CBHSQ provides [FindTreatment.gov](#findtreatmentgov) as a resource for persons seeking treatment for themselves or for someone else. However, CBHSQ is not a treatment referral agency and cannot make specific recommendations or endorsements regarding individual treatment facilities or types of treatment.

SAMHSA has designated representatives in each State Mental Health Agency (SMHA) and Single State Agency for substance use (SSA) who are responsible for updating the status and location information for substance use and mental health facilities in their jurisdictions.

- [Center for Mental Health Services (CMHS)](https://www.samhsa.gov/about-us/who-we-are/offices-centers/cmhs): leads federal efforts to promote the prevention and treatment of mental disorders. Congress created CMHS to bring new hope to adults who have serious mental illness and children with emotional disorders.

- [Center for Substance Abuse Prevention (CSAP)](https://www.samhsa.gov/about-us/who-we-are/offices-centers/csap): improves behavioral health through evidence-based prevention approaches.

- [Center for Substance Abuse Treatment (CSAT)](https://www.samhsa.gov/about-us/who-we-are/offices-centers/csat): promotes community-based substance use disorder treatment, and recovery support services for individuals and families in every community. CSAT provides national leadership to improve access, reduce barriers, and promote high-quality, life-saving, and effective treatment and recovery support services.

#### [Certification of Opioid Treatment Programs (OTPs)](https://www.samhsa.gov/medications-substance-use-disorders/become-accredited-opioid-treatment-program)

[SAMHSA’s Division of Pharmacologic Therapies (DPT)](https://www.samhsa.gov/medications-substance-use-disorders/about-dpt), part of the [SAMHSA Center for Substance Abuse Treatment (CSAT)](https://www.samhsa.gov/about-us/who-we-are/offices-centers/csat), is responsible for certifying that an Opioid Treatment Program (OTP) conforms with federal regulations governing treatment for substance use Disorders

#### [SAMHSA programs](https://www.samhsa.gov/programs)

SAMHSA’s programs and campaigns offer information, training, and technical assistance to improve the quality and delivery of behavioral health services across the nation.

- [Medications for Substance Use Disorders](https://www.samhsa.gov/medications-substance-use-disorders)
- [Evidence-Based Practices Resource Center](https://www.samhsa.gov/resource-search/ebp)
- [National Network to Eliminate Disparities in Behavioral Health (NNED)](https://www.samhsa.gov/national-network-eliminate-disparities-behavioral-health-nned)
- [National Recovery Month](https://www.samhsa.gov/recovery-month)
- [Behavioral Health Equity](https://www.samhsa.gov/behavioral-health-equity)
- [Screening, Brief Intervention, and Referral to Treatment (SBIRT)](https://www.samhsa.gov/sbirt)
- ["Talk. They Hear You."® Campaign](https://www.samhsa.gov/talk-they-hear-you)

#### [CBHSQ data collections](https://www.samhsa.gov/data/data-we-collect)

- [Drug Abuse Warning Network (DAWN)](https://www.samhsa.gov/data/data-we-collect/dawn-drug-abuse-warning-network): a nationwide public health surveillance system that captures data on emergency department (ED) visits related to recent substance use and misuse directly from the electronic health records of participating hospitals.

- [National Substance Use and Mental Health Services Survey (N-SUMHSS)](https://www.samhsa.gov/data/data-we-collect/n-sumhss-national-substance-use-and-mental-health-services-survey): a survey of all substance use and mental health treatment facilities in the United States.

N-SUMHSS replaced the [National Survey of Substance Abuse Treatment Services (N-SSATS)](https://www.samhsa.gov/data/data-we-collect/n-ssats-national-survey-substance-abuse-treatment-services) and [National Mental Health Services Survey (N-MHSS)](https://www.samhsa.gov/data/data-we-collect/n-mhss-national-mental-health-services-survey)

[ICF](https://www.icf.com/) conducts the [N‑SUMHSS](https://info.nsumhss.samhsa.gov/) on behalf of SAMHSA. SAMHSA gives the option for N-SUMHSS participants to be listed in SAMHSA’s online Behavioral Health Treatment Services Locator ([https://findtreatment.samhsa.gov](https://findtreatment.samhsa.gov)).

- [Treatment Episode Data Set (TEDS)](https://www.samhsa.gov/data/data-we-collect/teds-treatment-episode-data-set): demographic and drug history information about individuals admitted and discharged from substance abuse treatment.

- [Mental Health Client-Level Data (MH-CLD)](https://www.samhsa.gov/data/data-we-collect/mh-cld-mental-health-client-level-data): data on the demographic, clinical, and outcome characteristics of individuals receiving mental health treatment services.

- [National Survey on Drug Use and Health (NSDUH)](https://www.samhsa.gov/data/data-we-collect/nsduh-national-survey-drug-use-and-health): estimates of substance use and mental illness at the national, state, and substate levels.

- [Uniform Reporting System (URS)](https://www.samhsa.gov/data/data-we-collect/urs-uniform-reporting-system): a series of Excel tables that are developed by the federal government in consultation with state mental health agencies (SMHAs).

[Laws and regulations pertaining to substance abuse and mental health services, SAMHSA programs, and related topics](https://www.samhsa.gov/about-us/who-we-are/laws-regulations)

#### [Recovery Month](https://www.samhsa.gov/recovery-month)

National Recovery Month (Recovery Month), which started in 1989, is a national observance held every September to promote and support new evidence-based treatment and recovery practices, the nation’s strong and proud recovery community, and the dedication of service providers and communities who make recovery in all its forms possible.

[Recovery Month Facebook](https://www.facebook.com/RecoveryMonth/) has 55k followers but has not posted since 2019.

### [National Institutes of Health](https://www.nih.gov/)

#### [National Institute of Mental Health (NIMH)](https://www.nimh.nih.gov/)

The National Institute of Mental Health (NIMH) is the lead federal agency for research on mental disorders.

#### [National Institute on Drug Abuse (NIDA)](https://nida.nih.gov/)

NIDA is the lead federal agency supporting scientific research on drug use and addiction.

#### [National Institute on Alcohol Abuse and Alcoholism (NIAAA)](https://www.niaaa.nih.gov/)

NIAAA supports and conducts research on the impact of alcohol use on human health and well-being.

### [National Alliance of Recovery Residences (NARR)](https://narronline.org/)

NARR is a 501-c3 nonprofit organization dedicated to expanding the availability of well-operated, ethical and supportive recovery housing.

NARR was founded in 2011 by a group of organizations and individuals with deep recovery housing expertise, and a goal of developing and promoting best practices in the operation of recovery residences.

NARR works with federal government agencies, national addiction and recovery organizations, state-level recovery housing organizations, and with state addiction services agencies in pursuit of better and more accessible recovery housing opportunities.

[narronline.org](https://narronline.org/) uses “for” in the name, however, they are [registered in Missouri](https://mblsportal.sos.state.mn.us/Business/SearchDetails?filingGuid=fd57fc9f-b8d4-e011-a886-001ec94ffe7f) as “National Alliance of Recovery Residences”.

NARR has seemingly faced three separate [involuntary dissolutions](https://revisor.mo.gov/main/OneSection.aspx?section=347.143) filed on:
- 1997-12-31
- 2015-06-11
- 2021-02-11

[2019 tax filings](https://projects.propublica.org/nonprofits/organizations/416077863):
- Total revenue: $389,790
- Net income: $84,410

### [Ohio Recovery Housing (ORH)](https://www.ohiorecoveryhousing.org/)

Ohio Recovery Housing (ORH) was officially established as a nonprofit LLC on September 19, 2014 after years of work to organize recovery housing in Ohio.

ORH is a state affiliate of the National Alliance for Recovery Residences (NARR).

ORH creates and maintains standards of excellence for recovery housing in Ohio that meet expectations of NARR.

ORH provides opportunities for peer reviews that regularly document an ongoing commitment to ORH quality standards.

Maintains [Ohio's Recovery Housing Locator](#ohio-recovery-housing-locator) at:
- [www.ohiorecoveryhousing.org/find-a-residence](https://www.ohiorecoveryhousing.org/find-a-residence)
- [find.ohiorecoveryhousing.org](https://find.ohiorecoveryhousing.org/)

### [the Ohio Department of Mental Health and Addiction Services (OhioMHAS)](https://mha.ohio.gov/)

The Ohio Department of Mental Health and Addiction Services (OhioMHAS) exists to provide statewide leadership of a high-quality mental health and addiction prevention, treatment and recovery system that is effective and valued by all Ohioans.

[Read the OhioMHAS Strategic Plan for 2021-2024](https://mha.ohio.gov/wps/wcm/connect/gov/12fea5fa-3653-47ec-99dd-a05745892b27/strategic-plan-2021-2024+FINAL.pdf?MOD=AJPERES&CVID=nNQnPWi).

The [Get Help > Get Help Now](https://mha.ohio.gov/get-help/get-help-now/get-help-now) page on OhioMHAS links to the SAMHSA FindTreatment.gov resource.

The [Get Help > Recovery Supports > Housing Assistance](https://mha.ohio.gov/get-help/recovery-supports/housing-assistance) page on OhioMHAS links to the Ohio Recovery Housing Finder.

[OhioMHAS community partners](https://mha.ohio.gov/community-partners)

- Peer supporters
- First responders

#### OhioMHAS [certified peer supporters](https://mha.ohio.gov/community-partners/peer-supporters)

A certified peer supporter is someone who has direct lived experience with behavioral health challenges, or someone who has navigated services on behalf of an individual with behavioral health challenges. Certified peer supporters are trained and certified in using their lived experience to help others  impacted by  mental illness or substance use disorders. Ohio offers three types of Peer Supporter certification: Adult, Family, and Youth/Young Adult.

> Five peer organizations have partnered with OhioPRO and OhioMHAS to create technical assistance call centers for peers. These centers will be staffed by certified peer recovery supporters who will be available to answer any questions regarding the new eLicensing platform. They have received training so that they may provide information and answer any questions related to peer recovery supporter certification or recertification. ([OhioMHAS](https://mha.ohio.gov/community-partners/peer-supporters/resources/elicense-help))

### American Society of Addiction Medicine (ASAM)

The American Society of Addiction Medicine is a 501-c3 nonprofit organization.

[Guidestar: ASAM](https://www.guidestar.org/profile/13-3177396)

ASAM, founded in 1954, is a professional medical society representing over 7,000 physicians, clinicians, and associated professionals in the field of addiction medicine.

- [Website: www.asam.org](https://www.asam.org/)
- [Twitter: @ASAMorg](https://twitter.com/ASAMorg) (21.9k followers)
- [Facebook: @addictionmedicine](https://www.facebook.com/addictionmedicine) (24k followers)

[2020 tax filing](https://projects.propublica.org/nonprofits/organizations/133177396)
- Total revenue: $10,002,532
    - Contributions: $2,096,572 (21.0% of revenue)
    - Program services: $5,525,104 (55.2% of revenue)
    - Royalties: $802,699 (8.0% of revenue)
- Net income: -$306,897

### Hazelden Betty Ford Foundation

[Website: www.hazeldenbettyford.org](https://www.hazeldenbettyford.org/)

Hazelden Betty Ford Foundation is a 501-c3 nonprofit organization classified as Alcohol, Drug and Substance Abuse, Dependency Prevention and Treatment (Mental Health, Crisis Intervention)


[Guidestar: Hazelden Betty Ford Foundation](https://www.guidestar.org/profile/41-0682405)

Addiction and mental health treatment services.

[2020 tax filings](https://projects.propublica.org/nonprofits/organizations/410682405):
- Total Revenue: $187,826,240
    - Contributions: $13,001,552 (6.9% of revenue)
    - Program services: $170,151,373 (90.6% of revenue)
- Net income: $10,849,746

### Sober Nation

Sober Nation is a Florida LLC, [registered in 2013](http://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?inquirytype=OfficerRegisteredAgentName&directionType=Initial&searchNameOrder=STODDARTTIMOTHYG%20L130000239061&aggregateId=flal-l13000023906-c46652e0-99a0-4f85-8e45-a0f7e45d9f55&searchTerm=Stoddart%20%20%20%20%20%20%20%20%20%20%20%20Timothy&listNameOrder=STODDARTTIMOTHY%20L140000551231), run by [Tim Stoddart](https://www.timstodz.com/).

Stoddart has registered two other organizations in Florida:
- [New Life Resources LLC](http://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?inquirytype=OfficerRegisteredAgentName&directionType=Initial&searchNameOrder=STODDARTTIMOTHYG%20L110000637203&aggregateId=flal-l11000063720-bf70c121-0a10-47a2-a544-3964de48f571&searchTerm=Stoddart%20%20%20%20%20%20%20%20%20%20%20%20Timothy&listNameOrder=STODDARTTIMOTHY%20L140000551231) which dissolved in 2012
- [Stodzy Incorporated](http://search.sunbiz.org/Inquiry/CorporationSearch/SearchResultDetail?inquirytype=OfficerRegisteredAgentName&directionType=Initial&searchNameOrder=STODDARTTIMOTHYG%20P120000704421&aggregateId=domp-p12000070442-fee7620a-fff8-4747-aeba-b059d90775ff&searchTerm=Stoddart%20%20%20%20%20%20%20%20%20%20%20%20Timothy&listNameOrder=STODDARTTIMOTHY%20L140000551231) since 2012. [Stodzy Internet Marketing](https://stodzyinternetmarketing.com/our-team/)

Sober Nation links:

- [Website: sobernation.com](https://sobernation.com)
- [Facebook: @SoberNation](https://www.facebook.com/SoberNation/) (300K followers)
- [Twitter: @Sober_Nation](https://twitter.com/Sober_Nation) (17.4K followers)
- [Sobriety engine](https://www.sobrietyengine.com/) (a [Circle](https://circle.so/) community)

### Sobriety for Women

- [Website: sobrietyforwomen.com](https://sobrietyforwomen.com/)
- [Twitter: @Sobriety4Women](https://twitter.com/Sobriety4Women) (8.9K followers)


### SMART Recovery

- [Website: www.smartrecovery.org](https://www.smartrecovery.org/)
- [Facebook: @SmartRecoveryUSA](https://www.facebook.com/SmartRecoveryUSA/) (24K followers)
- [Twitter: @smartrecovery](https://twitter.com/smartrecovery) (21.3K followers)
- [YouTube: @smartrecovery](https://www.youtube.com/user/smartrecovery) (18.9K subscribers)
- [SMART Recovery Podcast](https://smartrecovery.libsyn.com/)


### Young People in Recovery

Young People in Recovery (YPR) is a 501-c3 nonprofit organization that serves youth and young adults in recovery from substance use disorder.

[Guidestar: YPR](https://www.guidestar.org/profile/46-4109067)

- [Website: youngpeopleinrecovery.org](https://youngpeopleinrecovery.org/)
- [Twitter: @YngPplRecover](https://twitter.com/YngPplRecover) (14.1k followers)

[2020 tax filing](https://projects.propublica.org/nonprofits/organizations/464109067)
- Total revenue: $2,217,693
    - Contributions: $1,069,822 (48.2% of revenue)
    - Program services: $1,144,428 (51.6% of revenue)
- Net income: -$80,053

### Partnership to End Addiction

Partnership to End Addiction is a 501-c3 nonprofit organization dedicated to addiction prevention, treatment and recovery, made up of researchers, advocates, clinicians, communicators and more.

[Guidestar: Partnership to End Addiction](https://www.guidestar.org/profile/52-1736502)

[Website: drugfree.org](https://drugfree.org/)

[2020 tax filing](https://projects.propublica.org/nonprofits/organizations/521736502):
- Total revenue: $26,719,760
    - Contributions: $3,779,842 (14.1% of revenue)
    - Program services: $4,116,823 (15.4% of revenue)
    - Sales of assets: $18,313,498 (68.5% of revenue)
- Net income: $4,195,152

### [Interact for Change](https://www.interactforhealth.org/interact-for-change/)

InterAct for Change is the 501-c3 public charity arm of Interact for Health.

[2020 tax filings](https://projects.propublica.org/nonprofits/organizations/300065901):
- Total revenue: $756,551
    - Contributions: $733,004 (96.9% of revenue)
    - Program services: $9,939 (1.3% of revenue)
- Net income: -$24,863

### Online forums

- [drugs-forum.com](https://drugs-forum.com/)
- [bluelight](https://bluelight.org/xf/)
- [erowid](https://erowid.org/)
    - [visualizing erowid](https://chemicalyouth.org/visualising-erowid/) (2016)

### Subreddits

#### [r/opiates](https://www.reddit.com/r/opiates/)

Discussion of all things related to the narcotics known as opiates, from harm-reduction to pharmacology.

Created June 24, 2009.

192k members

[Related subreddits: opiates](https://anvaka.github.io/sayit/?query=opiates)

#### [r/addiction](https://www.reddit.com/r/addiction/)

A place to discuss addiction. Get inspired, educated and guided to manage your addiction!

Created April 18, 2009.

82.4k members

[Related subreddits: addiction](https://anvaka.github.io/sayit/?query=addiction)
- r/benzodiazepines (18+, 135.3k members)
- r/Stims (18+, 126.4k members)
- r/askdrugs (18+, 78.9k members)
- [r/Sober](https://www.reddit.com/r/Sober/) (60.8k members, since 2010)
- [r/REDDITORSINRECOVERY](https://www.reddit.com/r/REDDITORSINRECOVERY/) (58.4k members, since 2009)
- [r/alcoholism](https://www.reddit.com/r/alcoholism/) (58.1k members, since 2010)
- [r/alcoholicsanonymous](https://www.reddit.com/r/alcoholicsanonymous/) (55.7k members, since 2010)
- [r/AlAnon](https://www.reddit.com/r/AlAnon/) (53.2k members, since 2011)
- [r/OpiatesRecovery](https://www.reddit.com/r/OpiatesRecovery/) (43.7k members, since 2012)
- [r/benzorecovery](https://www.reddit.com/r/benzorecovery/) (34.7k members, since 2014)
- [r/Methadone](https://www.reddit.com/r/Methadone/) (29.1k members, since 2011)
- [r/StopSpeeding](https://www.reddit.com/r/StopSpeeding/) (27.7k members, since 2016)
- [r/recovery](https://www.reddit.com/r/recovery/) (23.4k members, since 2009)
- [r/NarcoticsAnonymous](https://www.reddit.com/r/NarcoticsAnonymous/) (17.1k members, since 2010)

#### r/Drugs

18+ as of 2022.

…

[Related subreddits: drugs](https://anvaka.github.io/sayit/?query=Drugs)

## Reports

(2000) [SAMHSA: Substance Abuse Treatment for Persons With HIV/AIDS](https://store.samhsa.gov/sites/default/files/d7/priv/sma12-4137.pdf)

### (2000) [SAMHSA: Comprehensive Case Management for Substance Abuse Treatment (TIP: Treatment Improvement Protocol)](https://store.samhsa.gov/sites/default/files/d7/priv/sma15-4215.pdf)

Although it defies precise definition, case management generally can be described as a coordinated approach to the delivery of health, substance abuse, mental health, and social services, linking clients with appropriate services to address specific needs and achieve stated goals.

Two reasons why case management is effective as an adjunct to substance abuse treatment:
1. Retention in treatment is associated with better outcomes, and a principal goal of case management is to keep clients engaged in treatment and moving toward recovery.
2. Treatment may be more likely to succeed when a client’s other problems are address concurrently with substance abuse.

A treatment professional utilizing case management will:
- Provide the client a single point of contact for multiple health and social services systems
- Advocate for the client
- Be flexible, community-based, and client-oriented
- Assist the client with needs generally thought to be outside the realm of substance abuse treatment

A treatment professional should possess particular knowledge, skills, and attitudes including:
- Understanding various models and theories of addiction and other problems related to substance abuse
- Describe philosophies, practices, policies, and outcomes of models of treatment, recovery, relapse prevention, and continuing care for addiction and other substance-related problems
- Recognize importance of family, social networks, community systems, and self-help groups in the treatment and recovery process
- Understanding available insurance and health maintenance options and importance of access
- Understanding diverse cultures and incorporating the relevant needs of culturally diverse groups, as well as people with disabilities, into clinical practice
- Understanding the value of an interdisciplinary approach to addiction treatment

Substance abuse treatment and case management functions differ in that treatment involves activities that help substance abusers recognize their problems, acquire the motivation and tools to stay abstinent, and use the acquired tools; case management focuses on helping the substance abuser acquire needed resources.

In the field of substance abuse, three interagency models have been identified.
1. Single agency model: case manager personally establishes a series of distinct relationships on an as-needed basis with counterparts in other agencies.
2. Informal partnership model: staff members from several agencies work as a collaborative team, often constituted case by case
3. Formal consortium: binds case managers and service providers through formal written agreements.

Many communities have published directories of social, health, welfare, housing, vocational, and other service organizations to help case management programs identify resources, possible provider linkages, and potential gaps in services for their clients. Although such directories are a good starting point, it is important to follow up on the listings to ensure they are still accurate and will be of use to the client.

Substance abuse treatment programs, including those that receive public funding, are increasingly operating in a managed care environment. In such an environment, policy and clinical decision making rely on outcome data that traditionally describe the impact of case management and substance abuse treatment interventions in the context of services used and money spent.

Treatment programs may undertake case-finding activities through formal liaisons with potential referral sources such as employers, law enforcement authorities, public welfare agencies, acute emergency medical care facilities, and managed care companies. Health maintenance organizations and managed care companies often require case finding when hotlines are called. General media campaigns and word of mouth also lead substance abusers to contact treatment programs.

Some treatment programs operate aggressive outreach street programs to identify and engage clients. Outreach workers contact prospective clients and offer to facilitate their entry into treatment. Although treatment admission may be the foremost goal of the worker and the treatment program, prospective clients frequently have other requests before agreeing to participate. Much of the assistance offered by outreach workers resembles case management in that it is community-based, responds to an immediate client need, and is pragmatic.

### (2013) [MHA: Ohio Environmental Scan](https://mha.ohio.gov/static/Portals/0/assets/SchoolsAndCommunities/CommunityAndHousing/HousingResources/2013%20Ohio%20Environmental%20Scan.pdf)

### (2018) [GAO: Information on Recovery Housing Prevalence, Selected States' Oversight, and Funding](https://www.gao.gov/assets/700/691302.pdf)

Contents:
- Nationwide prevalence of recovery housing is unknown, but national organizations collect data on the number and characteristics of a subset of recovery homes
- Most states we reviewed have investigated potential fraud related to recovery housing and taken steps to enhance oversight
- Certain SAMHSA grant funding can be used for recovery housing, and selected states have used SAMHSA and state funding to support recovery housing

Fraudulent activities identified by state investigators included schemes in which recovery housing operators recruited individuals with SUD to specific recovery homes and treatment providers, who then billed patients’ insurance for extensive and unnecessary drug testing for the purposes of profit. For example, officials from the Florida state attorney’s office told GAO that SUD treatment providers were paying $300 to $500 or more per week to recovery housing operators for every patient they referred for treatment and were billing patients’ insurance for hundreds of thousands of dollars in unnecessary drug testing over the course of several months. Some of these investigations have resulted in arrests and other actions, such as changes to insurance payment policies.

(2020-01) [MHACBO: National Overview of Recovery Housing Accreditation Legislation and Licensing](https://mhacbo.org/media/NATIONAL.OVERVIEW.RECOVERY.HOUSING.January.2020.pdf)

### (2020-04-20) [Interact For Health: Recovery Housing Gap Analysis](https://www.interactforhealth.org/upl/media/recovery_housing_gap_analysis.pdf)

Some states have accrediting or certifying bodies for recovery housing:
- [Ohio Recovery Housing](https://www.ohiorecoveryhousing.org) (ORH)
- [Indiana National Alliance for Recovery Residences](https://inarr.org) (INARR)

Ohio’s population is multiples larger than Indiana and Kentucky combined.

Self reported levels of recovery houses from Ohio:
1. Peer run: 0
2. Monitored: 25 houses, 421 beds (avg 16 beds/house)
3. Supervised: 8 houses, 87 beds (avg 10 beds/house)
4. Service provider: 16 houses, 256 beds (avg 16 beds/house)
5. Unknown: 13 houses, 17 beds (avg 1 bed/house)

Annual estimate of adults who receive SUD treatment in Ohio: 10,660

Summary statistics from Greater Cincinnati region:
- Total houses: 103
- Certified houses: 22 (21%)
- Total beds: 1,259
- Total staff: 228
- Houses with paid staff: 36 (34%)
- Length of stay: 90 days to 3+ years
- Weekly fee: $75-$120
- Monthly fee: $300-$600
- Weekly denials from lacking beds: 56

Recommendations from analysis:
1. More recovery houses
2. More recovery houses in safe residential areas with access to transportation, supportive services, and employment opportunities
3. Regular monitoring of certification process
4. Enable people to estimate potential fit in a house prior to arrival
5. Anti-stigma campaigns about recovery housing
6. Agree on language for recovery housing and attributes for recovery housing
7. Connect committed individuals to place more people struggling with SUD in recovery homes

### (2020-11) ORH: Recovery Housing in Ohio: Analysis of Resident Survey Data

Prepared by [Mighty Crow Media, LLC](https://mightycrow.com/).

#### Data collection

Between March 2016 and November 2020:
- Completed move-in and six-month survey: 315 people
- Completed move-in and move-out survey: 882 people
- Completed six-month and move-out survey: 141 people
- Completed move-in survey more than once: 4 people (left recovery housing and returned to it)

#### Gender

- Male: 58%
- Female: 40%
- Prefer not to answer: 2%

#### Race

- White: 82%
- Black: 11%
- Hispanic or latino: 4%

#### Age

- Under 21: 6%
- 21-30: 33%
- 31-40: 33%
- 41-50: 16%
- 51-60: 10%
- 60+: 2%

#### Personal documents

|                      | Move-in (percent) | Move-out (percent) |
|----------------------|------------------:|-------------------:|
| Driver’s license     | 36                | 47                 |
| State ID             | 59                | 65                 |
| Social security card | 62                | 75                 |
| Birth certificate    | 60                | 74                 |

#### Summary

- Average stay: 18.4 weeks
- Employed on move-in: 21%
- Employed on move-out: 52%
- No income on move-in: 48%
- No income on move-out: 33%
- Continuing recovery support on move-out: 98%
- Stable living environment on move-out: 91%
- In debt: 99%
- Parents with child under 18: 47%
- Parents with child in custody and living together before move-in: 6%
- Parents with child in custody and living together after move-out: 11%
- In recovery from opiates: 69%
- In recovery from alcohol: 57%
- In recovery from cocaine: 53%
- In recovery from marijuana: 51%
- In recovery from methamphetamines: 34%
- In recovery from multiple substances: 60%
- In criminal justice system: 50%

### (2021) [MHA: Environmental Scan of Recovery Housing in Ohio](https://mha.ohio.gov/static/SupportingProviders/HousingProviders/RecoveryHusing/Recovery-Housing-in-Ohio-2021-Environmental-Scan.pdf)

### (2022-15-07) Finding Recovery: ODHE formative report

Finding Recovery is a project developing a downloadable cell-phone application (app) to fill the current gap in recovery support services.

Identified target audience: recovery house managers, peer support case workers, and family members.

Currently peer support case workers use a facebook group and carry a binder to find placements in recovery houses. Some houses (particularly for-profit houses) send emails daily to case managers on a list serv to update the number of available beds. Case managers tell clients about the houses, but reported that clients do not feel like they have much choice. Case workers underscored how this app would allow them to quickly narrow down options to a couple of potential houses for their clients, enabling those clients or their advocates to visually weigh the options, make choices, and directly contact the house within the app.

Identified most important filters useful for peer support case workers and family members to search for best potential fit recovery houses on behalf of people seeking recovery housing.

Identified most important attributes about houses to help narrow the options and that recovery house managers have found are of key importance to maximizing the likelihood that someone will “fit” with the house.

Account for differences in recovery house resources, so that houses can choose whether they want to live update bed availability.

The two respondents who were unsure voiced concerns about accessibility to people who are homeless, concerns about protection of privacy of clients who were in recovery, and concerns that family members who used the app might not understand the language (e.g. the difference between recovery houses that have clinical treatment components and those that do not).

Recovery house managers are excited that this app would save them time advertising their house to case workers and filling beds with people who are most likely going to do well in their house (“fit”). Case workers are excited that this app would save them time and help them better assist clients in making choices regarding recovery houses. The few family members we talked to thought that this app would help parents feel a bit more informed about recovery houses and how to find them.

Make the transitions into recovery housing easier, more efficient, and not dependent upon who one knows in the recovery world.

### (2022) [SAMHSA: National Substance Use and Mental Health Services Survey (N-SUMHHS)](https://info.nsumhss.samhsa.gov/)

The N‑SUMHSS is the most comprehensive source of substance use and mental health treatment data in the country. SAMHSA, other Federal, state, and local agencies, and behavioral health care professionals use these data to understand treatment availability and identify gaps in our nation’s treatment services. The survey gathers information about the services that treatment facilities provide and summary‐level information about the clients served.

Participating facilities will have the option of being listed in SAMHSA’s online Behavioral Health Treatment Services Locator (https://findtreatment.samhsa.gov), which will make others aware of your services, and help you reach potential clients in your community you do not currently reach. Your facility must complete the N‑SUMHSS every year to maintain your listing on the locator.

## Bills

### [110C H.R.6983: Mental Health Parity and Addiction Equity Act of 2008](https://www.congress.gov/bill/110th-congress/house-bill/6983)

Health insurers are required to provide the same level of benefits for mental health and substance use treatment for medical and surgical care.

### [114C H.R.34: 21st Century Cures Act of 2016](https://www.congress.gov/bill/114th-congress/house-bill/34)

To accelerate the discovery, development, and delivery of 21st century cures, and for other purposes.

In December 2016, the [21st Century Cures Act](https://www.congress.gov/bill/114th-congress/house-bill/34) was signed into law, codified the Center for Behavioral Health Statistics and Quality (CBHSQ), which serves as the federal government’s lead agency for behavioral health statistics. CBHSQ conducts national surveys tracking population-level behavioral health issues, including the National Survey on Drug Use and Health.

SEC. 520E–4. TREATMENT REFERRAL ROUTING SERVICE

IN GENERAL.— The Secretary, acting through the Assistant Secretary, shall maintain the National Treatment Referral Routing Service (referred to in this section as the ‘Routing Service’) to assist individuals and families in locating mental and substance use disorders treatment providers.

ACTIVITIES OF THE SECRETARY—To maintain the Routing Service, the activities of the Assistant Secretary shall include administering:
1. a nationwide, telephone number providing year-round access to information that is updated on a regular basis regarding local behavioral health providers and community based organizations
2. an Internet website to provide a searchable, online treatment services locator of behavioral health treatment providers and community-based organizations, which shall include information on the name, location, contact information, and basic services provided by such providers and organizations.

REMOVING PRACTITIONER CONTACT INFORMATION.—In the event that the Internet website described in subsection (b)(2) contains information on any qualified practitioner that is certified to prescribe medication for opioid dependency under section 303(g)(2)(B) of the Controlled Substances Act, the Assistant Secretary:
1. shall provide an opportunity to such practitioner to have the contact information of the practitioner removed from the website at the request of the practitioner
2. may evaluate other methods to periodically update the information displayed on such website

### [115C H.R.6: SUPPORT for Patients and Communities Act of 2018](https://www.congress.gov/bill/115th-congress/house-bill/6)

To provide for opioid use disorder prevention, recovery, and treatment, and for other purposes.

### [117C H.R.2376: Excellence in Recovery Housing Act](https://www.congress.gov/bill/117th-congress/house-bill/2376/text)

- Sponsor: Rep. Trone, David J. [D-MD-6] (Introduced 04/05/2021)
- Committees: House - Energy and Commerce
- Latest Action: House - 04/06/2021 Referred to the Subcommittee on Health

To amend title V of the Public Health Service Act to provide for increased oversight of recovery housing, and for other purposes.

**Sec. 2. Clarifying the role of SAMHSA in promoting the availability of high-quality recovery housing**

(26) collaborate with national accrediting entities and reputable providers and analysts of recovery housing services and all relevant Federal agencies, including the Centers for Medicare & Medicaid Services, the Health Resources and Services Administration, other offices and agencies within the Department of Health and Human Services, the Office of National Drug Control Policy, the Department of Justice, the Department of Housing and Urban Development, and the Department of Agriculture, to promote the availability of high-quality recovery housing for individuals with a substance use disorder.

**Sec. 3. Developing guidelines for states to promote the availability of high-quality recovery housing**

Substance use disorder treatment services—In this section, the term ‘substance use disorder treatment services’ means items or services furnished for the treatment of a substance use disorder, including—
- medications approved by the Food and Drug Administration for use in such treatment, excluding each such medication used to prevent or treat a drug overdose;
- the administering of such medications;
- recommendations for such treatment;
- clinical assessments and referrals;
- counseling with a physician, psychologist, or mental health professional (including individual and group therapy); and
- toxicology testing.

**Sec. 4. Coordination of federal activities to promote the availability of high-quality recovery housing.**

Federal agencies described:
- The Department of Health and Human Services
- The Centers for Medicare & Medicaid Services
- The Substance Abuse and Mental Health Services Administration
- The Health Resources and Services Administration
- The Indian Health Service
- The Department of Housing and Urban Development
- The Department of Agriculture
- The Department of Justice
- The Office of National Drug Control Policy
- The Bureau of Indian Affairs
- The Department of Labor
- Any other Federal agency as the co-chairs determine appropriate

**Sec. 5. Nas study and report.**

General

the Secretary of Health and Human Services, acting through the Assistant Secretary for Mental Health and Substance Use, shall enter into an arrangement with the National Academies of Sciences, Engineering, and Medicine to conduct a study, which may include a literature review and case studies as appropriate, on

- the quality and effectiveness of recovery housing in the United States, including the availability in the United States of high-quality recovery housing and whether that availability meets the demand for such housing in the United States; and
- State, Tribal, and local regulation and oversight of recovery housing.

Topics: a literature review of studies that

- examine the quality of, and effectiveness outcomes for, the types and characteristics of covered recovery housing programs listed in subsection (c); and
- identify the research and data gaps that must be filled to better report on the quality of, and effectiveness outcomes related to, covered recovery housing.

Type and characteristics of covered recovery housing programs:

- Nonprofit and for-profit covered recovery housing.
- Private and public covered recovery housing.
- Covered recovery housing programs that provide services to
    - residents on a voluntary basis
    - residents pursuant to a judicial order
- Number of clients served, disaggregated to the extent possible by covered recovery housing serving
    - 6 or fewer recovering residents
    - 10 to 13 recovering residents
    - 18 or more recovering residents
- Bedroom occupancy in a house, disaggregated to the extent possible by
    - single room occupancy
    - 2 residents occupying 1 room
    - more than 2 residents occupying 1 room
- Duration of services received by clients, disaggregated to the extent possible according to whether the services were
    - 30 days or fewer
    - 31 to 90 days
    - more than 90 days and fewer than 6 months
    - 6 months or more
- Certification levels of staff
- Fraudulent and abusive practices by operators of covered recovery housing and inpatient and outpatient treatment facilities, both individually and in concert, including
    - deceptive or misleading marketing practices, including
        - inaccurate outcomes-based marketing
        - marketing based on non-evidence-based practices
    - illegal patient brokering
    - third-party recruiters
    - deceptive or misleading marketing practices of treatment facility and recovery housing online aggregators
    - the impact of such practices on health care costs and recovery rates

### [117C H.R. 2367: SOBER Homes Act](https://www.congress.gov/bill/117th-congress/house-bill/2367/text)

- Sponsor: Rep. Levin, Mike [D-CA-49] (Introduced 04/05/2021)
- Committees: House - Energy and Commerce
- Latest Action: House - 04/06/2021 Referred to the Subcommittee on Health.

To direct the Secretary of Health and Human Services to enter an agreement with the National Academies of Sciences, Engineering, and Medicine to conduct a study on the quality and effectiveness of covered recovery housing in the United States, and for other purposes.

This Act may be cited as the “Studying Outcomes and Benchmarks for Effective Recovery Homes Act” or the “SOBER Homes Act”.


## Wikipedia

- [Substance Use Disorder](https://en.wikipedia.org/wiki/Substance_use_disorder#United_States)
- [Halfway house](https://en.wikipedia.org/wiki/Halfway_house)
- [Sober living houses](https://en.wikipedia.org/wiki/Sober_living_houses)
- [Drug rehabilitation](https://en.wikipedia.org/wiki/Drug_rehabilitation)
- [Twelve-step program](https://en.wikipedia.org/wiki/Twelve-step_program)
- [Caseworker](https://en.wikipedia.org/wiki/Caseworker)

## HRSA Map Tool

[HRSA Map Tool](https://data.hrsa.gov/maps/map-tool/)

<style>
    #toc-drawer .toc-active {
        text-decoration: underline 3px black;
        background: #FFDD00;
    }

    #toc-drawer a:hover {
        text-decoration: underline 3px black;
        background: #FFDD00;
        color: black;
    }
</style>

<script>
    function useState(initialState) {
        let state = initialState;

        function getState() {
            return state;
        }

        function setState(newState) {
            state = newState;
        }

        return [getState, setState];
    }

    const [currentHeading, setCurrentHeading] = useState(null);

    function updateHeadingId(newHeadingId) {
        // Update state
        setCurrentHeading(newHeadingId);

        // Get all elements with class 'active' and remove it
        const activeElements = document.getElementsByClassName('toc-active');
        for (let i = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove('toc-active');
        }
        const drawerHeadingEl = drawer.querySelector(`#markdown-toc-${newHeadingId}`);
        if (drawerHeadingEl) {
            // drawerHeadingEl.scrollIntoView();
            drawerHeadingEl.classList.add('toc-active');
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                updateHeadingId(entry.target.id)
            }
        });
    });

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
    headings.forEach((heading) => {
        // observe each heading
        observer.observe(heading);
    });

    // Clone table of contents

    const clonedTableOfContents = document.getElementById('markdown-toc').cloneNode(true);
      // Create a button element to toggle the drawer
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Table of Contents';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.zIndex = '9999';

    // Create a div element to hold the cloned table of contents
    const drawer = document.createElement('div');
    drawer.id = 'toc-drawer';
    drawer.style.display = 'none';
    drawer.style.position = 'fixed';
    drawer.style.bottom = '80px';
    drawer.style.right = '20px';
    drawer.style.width = '300px';
    drawer.style.maxHeight = '70vh';
    drawer.style.overflowY = 'auto';
    drawer.style.padding = '10px';
    drawer.style.background = '#fff';
    drawer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    drawer.style.zIndex = '9999';
    drawer.appendChild(clonedTableOfContents);

    // Add an event listener to the toggle button to show/hide the drawer
    toggleButton.addEventListener('click', () => {
        if (drawer.style.display === 'none') {
            drawer.style.display = 'block';
            // scroll to current heading
            const currentHeadingId = currentHeading();

            if (currentHeadingId) {
                const currentHeadingElement = drawer.querySelector(`#markdown-toc-${currentHeadingId}`);
                if (currentHeadingElement) {
                    currentHeadingElement.scrollIntoView({
                        behavior: 'smooth',
                    });
                }
            }
        } else {
            drawer.style.display = 'none';
        }
    });

    // Add the toggle button and drawer to the document
    document.body.appendChild(toggleButton);
    document.body.appendChild(drawer);
</script>
