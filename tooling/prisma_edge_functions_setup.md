# Introduction
In this page, we will discuss how to setup Prisma ORM to be compatible with Next.js functions running in the Edge Runtime (such as middleware.ts). Before we get started, we will provide definitions for some terminology needed for the setup, and then outline the individual components involved with this setup.

## What is Prisma ORM?
Prisma ORM is an open-source relational mapping tool which is often used by Next.js projects managed by UTDesign EPICS. Its capabilities are extensive, including the ability to construct a database schema, create and drop database tables, query a database, and remove entries from a database. In this tutorial, no knowledge of how to use Prisma ORM will be required beyond knowing how to initialize the client. Also, keep in mind that whenever this page refers to 'Prisma', it is referring specifically to the ORM, not other Prisma services such as Accelerate or Pulse. If you want to read more about Prisma, you can check out their documentation at the link below:

[Getting Started with Prisma](https://www.prisma.io/docs/getting-started)

## What is a Next.js Edge Function?
A Next.js Edge Function is a function which runs utilizing the Next.js Edge Runtime. For this setup, all that is needed to be known about the Edge Runtime is that it is a lightweight version of the Next.js API which cannot make TCP requests and cannot perform I/O operations. If you want to read more about Edge Functions and their exact capabilities, you can check out their documentation at the link below:

[Edge Runtime API](https://nextjs.org/docs/pages/api-reference/edge)

# Prerequisites
Before beginning the setup, a few perquisites need to be satisfied. First, make sure your Prisma imports are all up to date (THIS IS IMPORTANT). this can be done by running `npm update` or `yarn update` (depending on the package manager you are using). Next, we will need to install a few additional packages which are required to serve as an adapter for Prisma so that it can operate in the Edge Runtime:

```
npm install @prisma/adapter-neon
npm install @neondatabase/serverless
```
### Prisma Schema
In your schema.prisma file, the generator and db should be updated to the following:

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]

}

datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_PRISMA_URL")
}
```

NOTE: Make sure to change your database URL environment variable name to POSTGRES_PRISMA_URL in your .env file. The variable must be this name, as naming it something else leads to complications due to the influence of Vercel's naming conventions on Next.js itself.

### Package Scripts
Next, you need to add a script to your `package.json` file:

```json
// package.json
{
  // ...
  "scripts": {
    // ...
    "postinstall": "prisma generate"
  }
}
```
### Enable WebAssembly
You will also need to enable WebAssembly 5 in your `next.config.js`. Add the following section to the config:

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  webpack(config) {
    config.experiments ??= {}
    config.experiments.asyncWebAssembly = true

    return config
  }
}
module.exports = nextConfig
```

### Add WebSocket Creation to docker-compose.yml
Additionally, you will have to add a WebSocket container to your `docker-compose.yml`. Add the following section to your docker-compose:

```yml
# docker-compose.yml
# ...

services:
  # ...
  # ...
  websockify:
    image: kamehb/websockify
    restart: unless-stopped
    command: "0.0.0.0:6432 db:5432"
    ports:
      - "6432:6432"
    depends_on:
      - db
    volumes:
      - websockify-data:/opt/websockify/data
      - websockify-config:/opt/websockify/config

volumes:
  # ...
  websockify-data:
    driver: local
  websockify-config:
    driver: local
```

NOTE: If your database isn't hosted on port 5432, or your database service isn't named "db", you will have to change the `command: "0.0.0.0:6432 db:5432"` db:port to match your database name and/or port.

After all these components have been added, you can now run `npx prisma init`. If you have already run this command in the past or have no prior database migrations, you must run `npx prisma migrate dev --name init`. (If you do not have a migrations directory, you do not have any prior migrations).

You are now ready to setup and configure Prisma!

# Setting up and Configuring Prisma
Now that all the dependencies are out of the way, lets get into how to actually use Prisma in the Edge Runtime. In your function operating within the scope of the Edge Runtime, add the following code before your function declaration:

```ts
const localDatabasePort = 6432;
const localDatabaseHost = 'localhost';
neonConfig.fetchEndpoint = `http://${localDatabaseHost}:${localDatabasePort}`;
neonConfig.useSecureWebSocket = false; // SET TO TRUE IN PROD
neonConfig.pipelineConnect = false;
neonConfig.wsProxy = 'localhost:6432';
const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
const adapter = new PrismaNeon(neon);
const client = new PrismaClient({ adapter });

// public async ...
```
### Neon Config Options
Neon is the database driver which Prisma uses to build their adapter for the Edge Runtime. In order for Neon to function, it requires a few configurations which we need to provide. Each configuration property is detailed below:

`fetchEndpoint: URL`: set the server endpoint to be sent queries via http fetch (just in case).

`useSecureWebSocket: boolean`: dictates whether the WebSocket should allow http:// connections.

`pipelineConnect: "password" | false`: To speed up connection times, the driver will pipeline the first three messages to the database. You can try to set this setting to your database password, but if it doesn't work, just set it to false.

`wsProxy: string`: set the server endpoint to be sent queries via the WebSocket.

If you would like to view documentation on the full list of neonConfig properties, you can find this documentation in the link below:

[Neon Serverless Config Properties](https://github.com/neondatabase/serverless/blob/main/CONFIG.md)

### Final Notes
You should now be able to query Prisma as you normally would in any other function! If you would like to see an example of this implementation, it can be found here:

[Demo of Prisma in a Next.js Edge Function](https://github.com/prisma/nextjs-edge-functions/tree/main)

NOTE: Neon was not configured in this example, as the platform to which they are deploying their code takes care of this on their behalf.


#### Written by Arif Nizami