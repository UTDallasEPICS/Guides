Some of these tutorials may use Sublime, or Atom - it is STRONGLY recommended that you use vscode.
Some of these may use MongoDB. DO NOT USE MONGODB. Instead, use Prisma and either PostgreSQL or MySQL.
Some of these use React/Next. We STRONGLY reccommend Vue/Nuxt over React/Next.

Breaking out of just reading tutorials
https://www.codewell.cc/blog/how-to-escape-tutorial-hell-and-start-building-your-own-projects

The Odin Project
https://www.theodinproject.com/paths/full-stack-javascript

CSS for absolute beginners
https://www.youtube.com/watch?v=yfoY53QXEnI

JS Crash Course
https://www.youtube.com/watch?v=hdI2bqOjy3c

CSS Grid
https://scrimba.com/learn/cssgrid

CSS Flexbox
https://www.youtube.com/playlist?list=PLC3y8-rFHvwg6rjbiMadCILrjh7QkvzoQ

HTML for absolute beginners
https://www.youtube.com/watch?v=UB1O30fR-EE

Overview of the Chrome DevTools - note that every browser engine (Firefox, Chrome/Chromium, Safari) has it's own equivalent
https://developer.chrome.com/docs/devtools/

NodeJS
For the API section: Express
Database section: Prisma + Postgresql
Testing: Vitest
https://roadmap.sh/nodejs

Vue Roadmap
https://roadmap.sh/vue

JS Overview
https://javascript.info

JS Roadmap
https://roadmap.sh/javascript

# Creating a Webpage with CSS, HTML, and JS

Prerequisites:

- VSCode/VSCodium (or text editor of choice)
- Familiar with CLI - navigating to folders, running commands
- Python (should still come preinstalled on macOS, may need to upgrade to python 3)

## Serving a website/webapp

Web content is delivered to the users browser from the server via HTTP/HTTPS. We can achieve this in our local dev environment in several ways. Here we look at directly opening a file and using pythons http.server module.

### Create an HTML file

1. Open a text editor and create a new file called index.html
2. Add the following HTML:

```html
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>This is my web page.</p>
  </body>
</html>
```

3. Save the file

### View in browser

1. Open your web browser (Chrome, Firefox etc)
2. Go to File > Open File
3. Select the index.html file you just created
4. The web page with "Hello World!" text will open

#### Serve with Python

1. Open terminal/command prompt
2. Navigate to directory containing index.html
3. Run:
   `python -m http.server 8000`

4. Open browser and go to http://localhost:8000
5. You will see your index.html rendered
6. Press Ctrl+C in terminal to stop the server

## Creating and styling elements

### Add HTML elements

In index.html:

```html
<div class="header">
  <h1>My Website</h1>
  <nav>
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </nav>
</div>

<div class="content">
  <div class="card">
    <h2>Card Title</h2>
    <p>This is some card content</p>
  </div>

  <div class="card">
    <h2>Another Card</h2>
    <p>Some content for this card</p>
  </div>
</div>
```

### CSS Tags

CSS can go in two places. `<style></style>` tags can contain class definitions. You can also write the rules for an element directly in the `style` attribute of any HTML element.

```html
<style>
  /* this all needs to be valid CSS - also this is how you do comments in CSS */
  /* this is a css class */
  .example {
    /* this is a 'rule' */
    padding: 50px;
  }
</style>
<!-- example of an HTML comment, and the next line is an example of providing styles via style attribute -->
<p style="background-color: red; color: blue;"></p>
<div class="header">
  <h1>My Website</h1>
  <nav>
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
  </nav>
</div>

<div class="content">
  <div class="card">
    <h2>Card Title</h2>
    <p>This is some card content</p>
  </div>

  <div class="card">
    <h2>Another Card</h2>
    <p>Some content for this card</p>
  </div>
</div>
```

### Grid Layout

The grid layout allows elements to be organized in rows and columns:

```css
.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

### Flexbox Layout

Flexbox allows responsive alignment using flex properties:

```css
.header {
  display: flex;
  align-items: center;
}
```

This by default will render as a horizontal row. You can make it vertical with `flex-direction: column;`

### Block Layout

This is the default display mode.

Block displays elements stacked vertically, at full width:

```css
.card {
  display: block;
}
```

### Styling and Transitions

```css
.header {
  background: #eee;
  padding: 20px;
}

.card {
  background: white;
  border: 1px solid #ddd;
  padding: 20px;
  transition: box-shadow 0.3s;
}

.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
```

## Brief discussion of Javascript

There will be words here that you are not familiar with - look them up or ask!

### Vanilla JavaScript

- JavaScript was created in 1995 to add dynamic interactivity to web pages
- Early JS was simple scripts that manipulated the DOM (Document Object Model)
- Issues with loading complex projects due to async fetching
- Kinda hacky/janky, but in a lovable way

### jQuery

- jQuery was released in 2006 and quickly became popular
- It simplified DOM manipulation, AJAX (network calls), events etc with easy-to-use methods
- Still no guarantee an import will exist by the time it needs to be executed

### JavaScript Frameworks

- AngularJS (2010) and other frameworks emerged to manage code complexity
- React (2013) and Vue (2014) provided component architectures
- Allowed building complex SPAs efficiently

### Bundlers like Webpack

- As apps grew, bundling tools like Webpack were needed
- They bundle JS modules and assets into optimized files
- Enables features like code splitting for efficient delivery
- Solve the issues of async asset loading in browsers

### Meta Frameworks

- Next.js (2016) and Nuxt (2017) built on React and Vue
- Provide server-side rendering, routing, optimizations
- Complete framework for building web applications
- Deeper integration between frontend and backend code

The progression has been towards more powerful abstractions to manage complexity and enable faster development.

### JSON (JavaScript Object Notation)

- JSON is a text-based format for representing structured data
- It is derived from JavaScript object syntax, but JSON is language agnostic
- JSON uses key-value pairs, arrays, and objects to store data
- Keys and strings are enclosed in double quotes
- JSON data is easy for humans to read and write
- JSON is easy to parse and generate for machines
- JSON is lightweight and more compact than alternatives like XML
- Supported in all major programming languages
- Frequently used for API data and configuration files
- Popular alternative to XML for web services and web apps
- JSON data is transmitted as plain text and typically served with JSON content type
- Can be converted to/from native JavaScript objects

### Node.js

- Node.js allows running JavaScript on the server
- Having one language across the full stack simplifies a lot of things

```js
// Load HTTP module
const http = require("http");

// Create server
const server = http.createServer((req, res) => {
  // Handle request
});

// Listen on port
server.listen(3000);
```

### Express

- Express is a web framework for Node.js
- Makes it easier to build web apps and APIs

```js
// Load express
const express = require("express");

// Create app
const app = express();

// Handle GET request
app.get("/api/items", (req, res) => {
  // Return JSON response
  res.json([{ id: 1 }, { id: 2 }]);
});

// Listen on port
app.listen(3000);
```

### REST APIs

- REST APIs provide data via HTTP endpoints
- Express allows building REST APIs simply
- Route parameters - extract parts of an URL to use as variables
- Query parameters - https://example.com/?queryParam1=value&queryParam2=5
- Body - GET requests by convention do not allow a body, must use route/query parameters

```
GET /api/items - get items
POST /api/items - create item
PUT /api/items/1 - update item
DELETE /api/items/1 - delete item
```

## Use Javascript to interact with users

### Add button and text input

In HTML:

```html
<button id="increment">Increment</button>

<input id="nameInput" type="text" />

<p>Counter: <span id="counter">0</span></p>

<p>Name: <span id="name"></span></p>
```

### Javascript

Javascript will always go inside of a `<script></script>` tag. It can be loaded over network or be written directly inside the tag.

`<script src="https://path/to/js/file"></script>` will load a specific file over network.

An example inside a script tag:

```html
<script>
  console.log("this is javascript");
</script>
```

Add the following to the above HTML:

```js
// Get elements
/* these are javascript objects that represent elements in the page itself  */
const incrementBtn = document.getElementById("increment");
const nameInput = document.getElementById("nameInput");
const counterEl = document.getElementById("counter");
const nameEl = document.getElementById("name");

// Increment counter on click
let counter = 0;
/* this will run the function when the element emits the 'click' event - elements have a bunch of events they can emit */
incrementBtn.addEventListener("click", () => {
  // this is an arrow function
  counter++;
  counterEl.textContent = counter;
});

// Update name on input change
nameInput.addEventListener("input", () => {
  nameEl.textContent = nameInput.value;
});
```

# Creating a project with a JS framework

## Why frameworks

## Metaframeworks

## A simple Single Page Application with Vue

## Adding a standalone server

## Using Nuxt to merge the server and the frontend

# Databases
