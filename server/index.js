const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Data — do not modify
const quotes = [
  { id: 1, author: 'Marie Curie', topic: 'science', text: 'Nothing in life is to be feared, it is only to be understood.' },
  { id: 2, author: 'Albert Einstein', topic: 'science', text: 'Imagination is more important than knowledge.' },
  { id: 3, author: 'Carl Sagan', topic: 'science', text: 'Somewhere, something incredible is waiting to be known.' },
  { id: 4, author: 'Maya Angelou', topic: 'leadership', text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel." },
  { id: 5, author: 'Nelson Mandela', topic: 'leadership', text: "It always seems impossible until it's done." },
  { id: 6, author: 'Toni Morrison', topic: 'leadership', text: 'If you have some power, then your job is to empower somebody else.' },
  { id: 7, author: 'Plato', topic: 'philosophy', text: 'Wise men speak because they have something to say; fools because they have to say something.' },
  { id: 8, author: 'Aristotle', topic: 'philosophy', text: "The more you know, the more you realize you don't know." },
  { id: 9, author: 'Frida Kahlo', topic: 'art', text: 'I never painted dreams. I painted my own reality.' },
  { id: 10, author: 'Leonardo da Vinci', topic: 'art', text: 'Simplicity is the ultimate sophistication.' },
];

// TODO: Define middleware here

// 1. logRoutes — logs the HTTP method, URL, and timestamp for every request, then calls next()
// Middleware function for logging route requests

const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

// 2. express.static() — generates middleware that serves files from the frontend/ folder
//    Use path.join(__dirname, '../frontend') to construct the absolute path
const pathToFrontend = path.join(__dirname, '../frontend');
const serveStatic = express.static(pathToFrontend);

// TODO: Register middleware with app.use() before the controllers

app.use(logRoutes);
app.use(serveStatic);

// TODO: Define controllers here

// listQuotes — sends all quotes as JSON
//   If the request includes a ?topic= query string, send only quotes with a matching topic

const listQuotes = (req, res) => {
  const { topic } = req.query;

  if (topic) {
    res.send(quotes.filter((quote) => quote.topic.toLocaleLowerCase().includes(topic)));
  } else {
    res.send(quotes);
  }
};

// getQuote — sends a single quote whose id matches req.params.id
//   If no matching quote is found, respond with 404 and { error: 'No quote with id <id>' }

const getQuote = (req, res) => {
  const { id } = req.params;

  const quote = quotes.find((quote) => quote.id === Number(id));

  if (!quote) {
    res.status(404).send( {error: `No quote with id ${id}`});
    return;
  }

  res.send(quote);
};

const serve404 = (req, res) => {
  res.status(404).send( { error: `Not found: ${req.originalUrl}` });
};

// TODO: Register endpoints here

// GET /api/quotes
// GET /api/quotes/:id

app.get('/api/quotes', listQuotes);
app.get('/api/quotes/:id', getQuote);

// TODO: Add a catch-all fallback that responds with 404 and { error: 'Not found: <url>' }
// Use app.use() and place it after all other routes

app.use(serve404);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
