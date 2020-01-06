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

## jQuery and the DOM

## Communicating with the server through XHR and rendering the response