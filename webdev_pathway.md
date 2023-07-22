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

### Block Layout

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

## Use Javascript to interact with users

- button
- text input
- updating the DOM

# Creating a project with a JS framework

## Why frameworks

## Metaframeworks

## A simple Single Page Application with Vue

## Adding a standalone server

## Using Nuxt to merge the server and the frontend

# Databases
