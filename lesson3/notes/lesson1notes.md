# Network Programming in JavaScript

Although we use APIs for a ton of things on the internet, the request-response cycle is the constant foundation underpinning all web applications. When a user requests a new page, the browser must retrieve **all** the HTML code at once from the server.

1. User clicks link on a web page.
2. Browser sends HTTP request (GET) to server.
3. Server returns entire HTML page.
4. Browser parses and displays new page.

Since requesting a resource requires loading **all** of the HTML, having interactive, complex user interfaces can be costly and complicated. This is where AJAX, which stands for **Asynchronous JavaScript and XML**, comes into play. Using AJAX, developers can replace only part of a page, and not the entire page. AJAX can both fetch data and update parts of the page at the same time. 

An **AJAX Request** referes to an HTTP request from a web browser that does not perform a full page load.

AJAX requests are different from full-page HTML requests in that they:

1. Are not automatically requested by HTTP: JavaScript code initiates the request, most of the time from an event listener.
2. When browser receives a response from the AJAX request, JS code takes the response's body and updates the page as needed.

> When requesting a resource with JavaScript, the developer is responsible for writing the code that creates the request and handles the response.

Here's the flow for a typical AJAX request:

1. User actions triggers event listener.
2. JS sends HTTP request to server using *XMLHttpRequest*.
3. Server returns chunk of HTML code.
4. JavaScript code inserts new HTML into page.

## Making Requests with XMLHttpRequest

You can use `XMLHttpRequest` objects to send HTTP requests with JavaScript. This, like `Event` and `Node`, is not part of the JavaScript language; rather, it is a part of the browser API.

```js
let request = new XMLHttpRequest();
request.open('GET', '/path');
request.send();
```
This code snippet sends a `GET` request for `/path` from the local host.

## XMLHttpRequest Lifecycle Events

In the lifecycle of an `XMLHttpRequest`, several events must fire and there are some which may fire.

The first event to fire for an `XMLHttpRequest` is `loadstart`. This event fires when a request is sent to the server.

Next, in response to the request's handling by the server, any of the four events may fire:

1. `load`: a complete response loaded well
2. `abort`: the request was interrupted before it could complete
3. `error`: an error occurred
4. `timeout`: a response wasn't received before the timeout period ended

After one of these events fires, `loadend` fires, signifying that the response loading is done and all other events have fired.

The `load` event handler is used to determine if the `request` was successful. Inside of the `load` handler, inspect the response and ascertain its success.

Two other events to remember are:

1. `readystatechange`: the value of `readyState` changes.
2. `progress`: response data is received in *some* situations

## Data Serialization -- Again?

JS applications that run in a web browser **must** serialize data when communicating with remote systems. Serialization lets both the client and server transfer data in a format that preserves information without interfering with communication protocol. 

> Applications can use **any** data serialization format that both the client and server know how to read and write.

There are many types of data serialization formats.

### Query String / URL Encoding

A query string consists of one or more `name=value` pairs separated by the `&` character. This is what you see in google after you enter a search query. Any non-alphanumeric characters must be encoded, though. 

JS has a built-in function to make this easy: `encodeURIComponent`. This function allows you to encode a name or value using this format.

```js
let l = 'title=Do Androids Dream of Electric Sheep?&year=1968';
console.log(encodeURIComponent(l));
// title%3DDo%20Androids%20Dream%20of%20Electric%20Sheep%3F%26year%3D1968
```
Now **that** is useful. After the URL is encoded, you may append it to the GET request's path.

```js
let l = '/path?title%3DDo%20Androids%20Dream%20of%20Electric%20Sheep%3F%26year%3D1968';
```
The `?` characters marks where the query string begins.

### JSON Serialization

JSON (JavaScript Object Notation) is a popular data serialization format, often used by APIs. It mimics JavaScript's object literal data structure to exchange arrays, objects. strings, numbers, and boolean values between applications.

A `GET` request can return JSON, but you must use `POST` to send JSON data to the server.

## Submitting a Form with XHR

There are three steps to submitting a form using JS:

1. Serialize the form data.
2. Send the request using `XMLHttpRequest`.
3. Handle the response.

Here's one example:

```js
let request = new XMLHttpRequest();
request.open('POST', 'https://example.test/path');
let data = 'this test!';
request.send(data);
```
By passing `data` as an argument to `send`, we've included `this test!` in the request body.

### URL-encoding POST Parameters

You can also URL encode POST requests, but must include a `Content-Type` header with a value of `application/x-www-form-urlencoded`.

1. 

```
POST https://ls-230-book-catalog.herokuapp.com/books HTTPS/1.1
Host: ls-230-book-catalog.herokuapp.com
Content-Length: ...
Content-Type: application/json; charset=utf-8
Accept: */*

{"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"}
```

## Cross Origin Requests

An origin is the combination of a URL's scheme, hostname, and port. A cross-origin request occurs when the page tries to access a resource from a different origin. This means that if the port is different, or the host is different, or the scheme/protocol is different, it is a cross-origin request.

By default, `XHR` objects cannot send cross-origin requests due to hacking vulnerabilities that they expose. However, applications use the **Cross-Origin Resource Sharing** (CORS) mechanism to get around the default behavior of no cross-origin requests.

### CORS

CORS defines how the browser and server must communicate when accessing resources across origins. The two systems give each other just enough information about the other to determine if the response should succeed or fail.

Applications use custom HTTP request and response headers to implement this mechanism.

Each `XHR` object must have an `Origin` header that contains the origin of the requesting page. The server uses this header to determine whether it should send a corresponding header in the response.

The browser luckily automatically adds the `Origin` header as part of an XHR.
