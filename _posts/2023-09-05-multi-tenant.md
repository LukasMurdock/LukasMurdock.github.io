---
layout: post
title: 'Multi Tenant'
description: ''
date: 'September 05, 2023'
---

## Resources

- Wikipedia: [Multitenancy](https://en.wikipedia.org/wiki/Multitenancy)
- Microsoft: [Architect multitenant solutions](https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/overview)
- AWS: [Designing architectures for multi-tenancy](https://aws.amazon.com/blogs/architecture/lets-architect-multi-tenant-saas-architectures/)
- MongoDB: [Build a Multi-Tenant Architecture](https://www.mongodb.com/docs/atlas/build-multi-tenant-arch/)
- 2020 Tod Golding: [Designing and Building Multi-Tenant Solutions](https://www.youtube.com/watch?v=joz0DoSQDNw) (GOTO Chicago 2020)
- 2024 Tod Golding: [Building Multi-Tenant SaaS Architectures](https://www.oreilly.com/library/view/building-multi-tenant-saas/9781098140632/)


## Questions

- What is your tenant? a customer, a user, a group of users (a team)?
- How much isolation will you have between tenants? Shared or separate databases?
- Do any tenants have special requirements that must be met?

## Tenant isolation

Continuum: Fully isolated <--> Fully shared

- Compute
- Databases
- Networking
- Domain names

## Common tenancy models

- **Automated single-tenant deployments**: deploy a dedicated set of infrastructure for each tenant
- **Fully multitenant deployments**: all components are shared, application code separates tenants
- **Vertically partitioned deployments**: a combination of single-tenant and multitenant deployments that are able to share infrastructure
- **Horizontally partitioned deployments**: some shared components but maintain other components with single-tenant deployments, e.g., build a single application tier and then deploy individual databases for each tenant

## Tenant lifecycle

- Merge and split tenants: in business scenarios, companies might split or divest; in consumer scenarios, individual users might join or leave families.

## Pricing models

- Consumption-based pricing: “pay-as-you-go” bill by usage
- Per-user: bill by each user
- Per-active user: bill by each user that uses the solution over time
- Per-unit: e.g., a per-store pricing model
- Feature and service level: different tiers of functionality at different price points
- Cost of goods sold: each tenant only pays the cost of operating their share of resources
- Flat-rate: flat rate to a tenant for access to your solution, for a given period of time

Good ideas:
- Usage limits: restrict the usage of your service in order to prevent your pricing models from becoming unprofitable, or to prevent a single tenant from consuming a disproportionate amount of the capacity of your service
- Rate limits: limit the number of calls to an API, over a defined time period


## Measure the consumption of each tenant

- Indicative consumption metrics: it’s easier to use a single indicative measurement (e.g., data stored) to represent consumption in the solution
- Transaction metrics: identify a key transaction that is representative of the COGS for the solution, e.g., the number of documents created
- Per-request metrics: use a consumption metric that is based around the number of API requests being made to the solution
- Estimate consumption:

## Deployment strategies to support updates

- Deployment Stamps pattern: deploy multiple copies of your application and other components
- Feature flags: add functionality to your solution, while only exposing that functionality to a subset of your customers or tenants
- Deployment rings: progressively roll out updates across a set of tenants or deployment stamps
- API versions: [version your APIs](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design#versioning-a-restful-web-api)

## Approaches to identify tenants

- Domain names
- HTTP request properties
- Token claims
- API keys
- Client certificates

See: https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/considerations/map-requests
