const express = require("express");
const { PrismaClient } = require("@prisma/client");
// TODO: db file
const prisma = new PrismaClient();
const app = express();
const path = require("path");

// Automatically convert incoming requests with the 'Content-Type: application/json' header to JSON objects
app.use(express.json());

// Setup our static file serving
app.use(express.static(path.join(__dirname, "public")));

// Make sure the base route returns the index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create todo
app.post("/todos", async (req, res) => {
  const todo = await prisma.todo.create({
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.json(todo);
});

// Update todo
app.put("/todos/:id", async (req, res) => {
  const todo = await prisma.todo.update({
    // when we use the :label syntax in the route definition, those parts of the url
    // are made available as properties on req.params
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(todo);
});

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// Delete single todo
app.delete("/todos/:id", async (req, res) => {
  const todo = await prisma.todo.delete({
    where: { id: req.params.id },
  });
  res.json(todo);
});

// Start listening
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
