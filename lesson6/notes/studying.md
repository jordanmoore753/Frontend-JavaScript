# JS239 Written Exam

## Using Web APIs to work with DOM

### API

An **API** is an Application Programming Interface. This provides a way for computer systems to interact with each other. The commonality between all APIs is the providing of functionality for use by another program. For instance, every programming language has a built-in API for writing programs. Another example is the API used by mobile devices to access location and sensor data.

**Web APIs** are APIs that are built with web technologies and operate over HTTP. 

### Provider vs Consumer

In a web API, the API provider is the system that provides an API for other parties to use. One example is Google is the provider of the Google Maps API.

An API consumer is the system which uses a provided API to accomplish some work. To extend the previous example, a website which generates trail maps using Google Maps data is the consumer, while Google is the API provider.

### Purpose of API

APIs make it possible to share data. This is one of their most powerful features.

Imagine that there is an application for generating wedding invitations. This invitation application is not a part of a larger application, like the Knot. Instead of needing to manually write each contact into the wedding invitation application, one could use the contacts API from The Knot to auto-populate the wedding invitations.

### Enabling Automation

Using APIs enables automation on the part of web applications.

Automation, in this sense, means the work that could be completed manually is instead done automatically by a program. 

Imagine that a local hotel opens and creates a simple website which allows for bookings. Since only a couple of rooms are booked daily, the database can be manually updated with bookings. Once the hotel expands into neighboring towns and has hundreds of bookings a day, a program must be devised which can automate the booking updates for the database. This program uses the API of the hotel to get the booking information, and uses the API of the booking system to add bookings to it.

APIs at their core allow developers to build their applications on top of existing, specialized systems. These specialized systems allow for developers to focus on other objectives, instead of implementing the specialized behavior from scratch.

### Data Serialization

APIs communicate by passing structured data back and forth. A **data serialization** format describes a way for programs to convert data into a form which is efficiently stored or transferred. The benefit of serializing data is that the data can be converted into the original data at any time by the original program, or any other program which understands that specific format.

Media types describe the format of a response's body. These media types are represented in a response's `Content-type` header. 

JSON is by far the most popular media type for web APIs.

### CRUD and REST

HTML forms only support two HTTP methods: GET and POST. APIs, on the other hand, can use all HTTP methods, which allows them to be **restful** in their design.

REST stands for Representational State Transfer. CRUD is an acronym which stands for:

- Create
- Read
- Update
- Destroy

CRUD represents the actions that can be used upon resources.

RESTful APIs model this functionality by matching an operation to its appropriate resource. For example, a CREATE operation coincides with POST. An UPDATE operation conincides with PUT. A DELETE operation coincides with DELETE. Instead of just using GET and or POST for each of these, one can truly represent the action taken upon the resource by using CRUD and REST design.

A very concrete example would be an HTML form passing `=delete` as a parameter to tell the server to delete a profile. Instead of using POST and sending that parameter, one could use a DELETE HTTP request. This is more accurate semantically and programmatically. Also, it avoids passing unnecessary parameters.

The universal conventions created by REST dictates that providers have fewer decisions about how to build a RESTful API, and that consumers also have fewer questions to answer with regards to how use a certain API. Most APIs use a RESTful design, so it can be assumed that deleting a resource will use a DELETE HTTP request, instead of passing a `delete` parameter in a POST request to some route.

So, to summarize, REST is a set of conventions about how to build and design APIs. RESTful APIs consist of CRUD actions on a resource.

REST requires thinking in a resource-oriented way, since the CRUD actions can be taken on **resources**. The best solution may not always be a RESTful one, but overall, it pays off to be as RESTful as possible in general.

### Resource, Element, Collection

A **resource** is a representation of some grouping of data in an application. Posts, likes, tags, and comments can all be resources in an API.

A **collection** represents a grouping of elements of the same type. For instance, all of the blog posts in an application are a collection.

An **element** represents a single resource. For instance, one blog post out of the collection of posts would be called an element.

## Event-driven programming for front-end development

An **event** is an object that represents an occurrence. The event object contains information about what happened and where it happened. These properties can be accessed within an event listener. Browsers can trigger events as the page loads, when certain elements are clicked on, or when the browser performs an action required by a program.

Events on the web are fired inside of the browser window. They are normally attached to specific items in the window: an element, a grouping of elements, the entire window, or the HTML document loaded in the tab.

UIs (user interface) are event-driven by nature. A user must do something on the page for an event to occur.

The entirety of the DOM content must load, however, before JavaScript can before the DOM can be interacted with through the UI and event firings. 

```js
document.addEventListener('DOMContentLoaded', function(event) {
  // what to do when DOM is done loading
});
```
To understand how events on the page can be triggered, it's important to understand the order in which assets on a page are loaded.

1. HTML code received from server
2. HTML parsed and JS evaluated
3. DOM constructed from parsed HTML
4. DOMContentLoaded event fires on document
5. Page displayed on screen
6. Embedded assets are loaded
7. load event fires on window

### Event Listeners and Event Handlers

Event listeners and event handlers are used interchangeably but do point at different constructs. Event listeners **listen** for the event happening, and the **handler** is the code that is run in response to it happening.

```js
document.addEventListener('DOMContentLoaded', function(event) {
  // this is the event handler
});

// 'DOMContentLoaded' is the action on which the listener listens
```
When we define code that is to be run in response to an event firing, we register an event handler. 

An object (element) receives an event. 

The event handler is passed an `Event` object which contains information about what the event was, what the object the event occurred on, and where the event occurred. This information can be used to access and re-assign properties of the `target`, which is the element that had an event fired upon, or the `currentTarget`, which is the element that was registered as the target for the event.

The event listener is attached to the `currentTarget` and the `target` is the element that was fired upon. This is important to realize, since events `capture` from the top of the document, all the way down to the most nested element, and then `bubble` all the way back up to the top of the document.

In the capturing phase, the browser checks to see if the element's outer-most ancestor has an appropriate event handler for the fired event. This capturing process occurs until the browser finds the element that was actually clicked on.

Next, the browser checks to see if the element that was clicked on (**target**) has the appropriate event handler for the fired event. If so, the event handler is run. Then, it moves to the next ancestor and performs the same operation, all the way until the browser reaches `<html>`. This behavior explains why outer elements can fire instead of nested elements.

This behavior can be stopped with `e.stopPropagation`, which enforces the first handler to be run but prevents the bubbling process from moving up the chain, disallowing any more handlers to be run.

This is similar to property and behavior delegation in JS. We can specify that all children of a `ul` should have a `click` event listener with a certain event handler. Now, all `li` have this event listener through the bubbling process, but each does not need to store its own event listener on itself. The bubbling process allows the `li` to delegate to the `ul` listener.

```js
$('ul').on('click', function(e) {
  // something!
});
```
### Event Listeners and Bubbling

In an `eventListener` function, one can specify that the event should listen on the capturing phase, instead of the bubbling:

```js
document.querySelector('ul').addEventListener('click', function(e) {

}, true);
```
The `true` value is used for the `useCapture` parameter, which indicates that the event of this type `click` should be dispatched to the registered listener before moving to any target beneath it in the DOM tree.

### Capturing and Bubbling

Capturing and bubbling are two processes that occur when an event listener is activated on an element.

Capturing happens first, and then bubbling.

The browser will run a capturing phase when an event is fired on an element with parent element(s). During this capturing phase, the browser will check to see if the element's **outer-most** ancestor (`<html`>) has an event handler which handles the type of event that was triggered. Once the browser finds the element that has the associated event listener, it is done capturing.

Next is bubbling. From the element that was the actual target of the event, the browser will check to see if it really has the event listener. If it does, the browser will invoke that event handler. Then, the bubbling continues up to each parent element until `<html>` is reached.

This means that each parent element that also has an event handler for that given event will be invoked. This is annoying behavior that is easy to avoid with `stopPropagation`, which is a method on the `event` object.

By default, all event handlers are registered for the bubbling phase; however, as we've seen above, it's possible to register the event handler for the capturing phase.

```js
document.getElementById('#one').addEventListener('click', function(e) {
  // something
}, true); // true makes it capturing phase
```
In jQuery, one cannot use the capturing phase for invoking event handlers. 

### Event Delegation

Obviously, it would save a lot of space and time to have all child elements, say `<li>`, delegate event listeners to their parent element `<ul>`. This is called **event delegation**, and is actually similar to object delegation in JS.

Instead of doing the following, which is attaching an event listener to each `li` of the `#first` `<ul>` tag. We can attach the event listener to the `#first` element and rely on **bubbling** to invoke the event handler.

```js
$('li').on('click', $.proxy(this.something, this)); // not delegation
$('#first').on('click', $.proxy(this.something, this)); // delegation

something(e) {
  e.preventDefault();
  let listItem = e.target; // access the actual clicked element with target
  // do something
}
```
However, one must check that the `target` is actually pointing at the right type of tag, as one could click the `ul` element's margin/padding and trigger the event.

```js
something(e) {
  e.preventDefault();

  if (e.target && e.target.nodeName === 'LI') {
    // something!
  }
}
```
## jQuery and the DOM

jQuery is a JavaScript library.

At its core, it is a function which wraps a collection of DOM elements and helper methods into an object.

One selects elements from the DOM by invoking methods on the jQuery object. From there, one can manipulate the selected object or elements using various helper methods.

Since jQuery acts on DOM elements, we must wait for the DOM to be finished loading before using jQuery. The elements we try to select and/or manipulate will not exist if the jQuery is used before the DOM is finished loading.

### DOM ready? 

We need to know that the DOM is finished loading so that we can execute our jQuery. For this, we use a callback called the **DOM Ready Callback**. Here's an example:

```js
$(document).ready(function() {
  // DOM loaded, ready, IMG tags not loaded
});
```
Also, we can write it shorter:

```js
$(function() {
  // DOM loaded
});
```
Since the DOM is finished loading without `<img>` tags, one must wait for the `window` to be finished loading if one wants to execute jQuery **after** `<img>` tags have been loaded.

```js
$(window).ready(function() {
  // DOM and everything else loaded
});
```
### Adding Event Listeners with jQuery

jQuery makes it very easy to add event listeners on DOM elements.

```js
function handleClick(e) { // event handler
  // do something!
}

$('a').on('click', $.proxy(this.handleClick, this)); // listener
```
The event listener is the function which waits for a certain event to occur, and the event handler is the callback which is invoked in response to the event occurring.

`'click'` is the event that triggers the callback function `handleClick`, which is the event handler. So, if an `<a>` element is clicked, the event listener will invoke `handleClick` in response.

The `a` event listener will not listen for `<a>` elements that are added to the DOM **after** the event listener has been defined. In order to append this event listener onto elements that are added after the event listener is defined, one can use the second argument of the `on` method to specify which element to always give a certain event listener to.

```js
$('#parent-element').on('click', '.child-element', $.proxy(this.handleClick, this));
```
According to the previous code, the `click` event listener will be defined for any `child-element` under `#parent-element`.

## Communicating with the server through XHR and rendering the response

`XHR` is a `XMLHttpRequest`. XHR objects are used to interact with servers. One can retrieve data from a URL without needing a full page refresh, as XHR is asynchronous. XHR can be used for fetching other types of data, not just XML. 

One creates an `XHR` object by invoking the `XMLHttpRequest` function with the `new` keyword.

```js
const request = new XMLHttpRequest();
```
This constructor function takes no parameters.

### The Basic Flow

Essentially, an `XHR` object just represents an HTTP request, so it does the following:

1. Create `XMLHttpRequest` object.
2. Open a URL.
3. Send the request.
4. Do something with the response data.

So long as the parameter passed to `XMLHttpRequest` is `undefined` or `true`, the request will be processed asynchronously. Anything else, the request will be sent synchronously, which is undesirable because it will block other parts/events of a program from firing.

### How do we access the response or tell how the request is going?

Event listeners enable us to listen to various events which happen during the request being processed.

The process for using event listeners with `XHR` objects is:

1. Create `XHR` object.
2. Add event listeners to the object.
3. Open the url.

```js
function updateProgress(e) {
  // do something while request is progressing
}

function requestFinished(e) {
  alert('Request complete.');
}

function requestFailed(e) {
  alert('Error occurred during request.');
}

function requestCancelled(e) {
  alert('Request cancelled.');
}

let firstRequest = new XMLHttpRequest();

firstRequest.addEventListener("progress", updateProgress);
firstRequest.addEventListener("load", requestFinished);
firstRequest.addEventListener("error", requestFailed);
firstRequest.addEventListener("abort", requestCancelled);

firstRequest.open();
```
A simpler way to avoid having to write separate event listeners for `abort`, `load`, and `error` is to use the `loadend` event listener to listen for all three events.

However, `loadend` does not specify which ending the request resulted in, so the use case must be general to all scenarios.

### Methods for XHR

#### `open()`

`open` is a method for `XHR` objects which takes the following parameters:

1. method (POST, GET, etc)
2. url (string)
3. async (boolean)
4. user (default null)
5. password (default null)

The `open` method initializes a new request. It can also re-initialize an already existing request.

#### send()

`send` obviously sends the request to the server. When the request is asynchronous, the method returns immediately and the response is delivered and accessed through events and listeners. If the request is synchronous, the method only returns once the response has come in.

`send()` takes one optional parameter, `body`, which represents the body sent along with an HTTP request. The body contains data that is used to update data on a server.

#### setRequestHeader()

This method does exactly what you think it would do: it sets the value of an HTTP request header. 

This method must be invoked **after** calling `open()` but before calling `send()`. This method may be called multiple times for the same header; the values will be merged into a single header.

This method takes two arguments: `header`, which is the name of the header to give a value; `value`, the value to set as the body of the provided `header`.

### Examples

Let's make a **POST** request with `XHR`.

```js
const data = { 
  reg: 'string',
  str: 'string STRING',
  opt: 'i'
};

let xhr = new XMLHttpRequest();

xhr.onload = function(e) {
  // do stuff with regex return data
};

// or: xhr.addEventListener("load", function(e) {});

xhr.onerror = function(e) {
  // callback for if request encounters error
};

xhr.onabort = function(e) {
  // callback for if request is aborted and abort event is received by this object
};

xhr.open("POST", 'glacialwhatever/test', true);
xhr.send(JSON.stringify(data));
```
Make a **GET** request.

```js
let xhr = new XMLHttpRequest();

xhr.onload = function(e) {};
xhr.onerror = function(e) {};
xhr.onabort = function(e) {};

xhr.open('GET', '/server', true);
xhr.send();
```