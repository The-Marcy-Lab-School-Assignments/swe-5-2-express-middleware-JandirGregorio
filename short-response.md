# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use the exact terms and concepts from the lesson.

Your responses will each be evaluated out of 6 points. You can earn 3 points for writing quality and 3 points for the accuracy and precision of the technical content per question.

---

## Question 1: Express vs `node:http`

Express is described as a framework that "wraps" `node:http`. What does that mean? Compare how you would handle a `GET /api/users` request in `node:http` versus in Express. What does Express do for you automatically that you had to write manually with `node:http`?

**Your answer here**: Express _wraps_ `node:http` by abstracting and simplifying the `node:http` manual setup. Let's take a look at a one endpoint example to understand this:

```js
// httpServer.js
const http = require('node:http');

const server = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Welcome to the API</h1>');
  }
});

server.listen(8080, () => console.log('Listening on http://localhost:8080'));
```
```js
// expressServer.js
const express = require('express');

const app = express();

const serveHTML = (req, res, next) => {
  res.send('<h1>Welcome to the API</h1>');
};

app.get('/', serveHTML);

app.listen(8080, () => console.log('Listening on http://localhost:8080'));
```

With Express you can create a server by invoking the `express` function to create an application instance as opposed to creating one manually. Additionally, `res.send()` serializes objects to JSON and sets the `Content-Type` header automatically for you.
---

## Question 2: Endpoints, Controllers, and Middleware

What are **controllers** and **middleware** in Express? What are each responsible for and how do they work together to handle incoming requests?

**Your answer here**: A **controller** is a callback function that handles the request from an endpoint. It's responsible for reading the request object and sending a response. **Middleware** is the function that handles intermediate ("_middle_") steps between the request and the response. Its main responsibility is to intercept HTTP requests to parse, modify, or add more server-side logic before it invokes the `next()` function to pass the request to the next controller or middleware, otherwise it will hang indefinitely.

---

## Question 3: Query Strings and Route Parameters

How are **query strings** and **route parameters** similar? How are they different? In your answer, provide an example of when you would use each.

**Your answer here**: **Route parameters** are defined in the server-side endpoint using a colon (e.g. `/api/quotes/:id`), and their values can be accessed via `req.params` from the request object as a plain value (`/api/quotes/404`). **Query strings** appear at the end of a URL after a `?` followed by a `key=value` format (e.g. `/api/quotes/?category=life`), and can be accessed via `req.query`. Both enable filtering, searching, or additional logic in the url.

For instance, I would use a **route parameter** to isolate a singular piece of data when the the user knows the `id` property of an object.
I would use a **query string** to filter out a jokes category in a collection of objects.

---

## Question 4: Same-Origin Requests

For API fetch calls from a client-side application, explain the difference between fetching from endpoints with relative paths like `/api/quotes` and fetching from endpoints with a full URL like `https://dog.ceo/api/breeds/image/random`. Why do we not send a fetch using a url like `http://localhost:8080/api/quotes`?

**Your answer here**: Fetching data from endpoints with a relative path indicates that the client (browser) is sending the fetch request to the same host with port that served the page. Fetching from an endpoint with a full URL means that the fetched data is stored in an external source. Using a hardcoded path will break the application when deploying it because the host will not be the same one used when developing the app.
