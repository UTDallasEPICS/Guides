# Conceptual Overview

This system is focused around advocates, families, and pages. Advocates invite families and guide them through the process of creating a memorial page. These pages contain obituaries, times, and locations. These pages are publicly viewable and searchable. Pages can receive donations, have donation goals, and have deadlines for fundraising. Family users can only access the system after being invited by an advocate. Family users have profiles.

# Functional Requirements

## Users

- There are two roles: family and advocate
- Users are invite only, regardless of roles
- Only advocates can
  - Invite users
  - See a lit of all pages
  - Change the role of a user
- All users can
  - Edit a page
  - See a list of their own pages
- Users are authenticated via Auth0
- Users receive invitation emails via AWS SES

## Pages

- All pages can be viewed publicly
- Pages must be publicly searchable
- Pages have
  - Name
  - Day of birth
  - Day of passing
  - Visitation
    - Date
    - Location
    - Description
  - Funeral
    - Date
    - Location
    - Description
  - Obituary
  - Donation goal
  - Amount donated
  - Deadline
  - Images
  - Donations
    - Processed through stripe

## Stack

Nuxt, postgres, prisma

## Research Questions

None

## Third party integrations

- Stripe for payments
- Auth0 for authentication
- AWS SES for emails

## Deployment

AWS EC2
