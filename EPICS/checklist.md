# Checklist

## Project structure

- [ ] `schema.prisma` in a top level `prisma` folder
- [ ] `docker-compose.yml` at top level for project database
- [ ] `.env.example` file containing NON SENSITIVE environment variables (Auth0 Issuer, dev database url, etc)
- [ ] For projects needing authentication, Auth0 or UTD SSO implementation
- [ ] Any migration scripts, dev scripts, etc belong in a top level `scripts` folder. If the project has separate frontend/backend folders, the `scripts` folder should be in the backend folder.

## Documentation

A README.md file at the top level containing:

- [ ] Conceptual overview - what is the project intended to accomplish?
- [ ] Functional requirements (broken down by page) - what are the discrete operations the app needs to be capable of?
- [ ] Third party integrations - do we need to touch HubSpot? Stripe? Auth0?
- [ ] Deployment notes - is the partner running the application on their own servers or are they using something like AWS or Azure?
- [ ] Migration scripts - do we need to import any data from an existing system that the partner is using?
- [ ] Instructions for project setup

In the repo's GitHub wiki, there must be the following:

- [ ] List of user workflows
- [ ] Each workflow must have a corresponding wiki page, linked in the list, that either contains the workflow information or a TODO.
- [ ] Each workflow must list the pages involved
- [ ] List of user roles and what each role is able to do
- [ ] Every third party integration must have its own page describing what parts of that service are used, how, and why

These should be high level - students should not be explaining every line of code.

### Project Management

- [ ] All functional requirements must have a corresponding issue
- [ ] Each project must have a corresponding GitHub Project
- [ ] Students must update issues when they start or finish them, and use the issue comments for tracking progress on a specific issue (e.g. what was done every week)
- [ ] Students must be assigned on GitHub to the tasks they are working on
