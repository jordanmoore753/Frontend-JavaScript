# Working with Web APIs

For this book, we will be using *Postman* and *httpie* to work with Web APIs.

## Using Postman

You can easily send requests with Postman. Just type in an address, click send request, and you get back the response body, cookies, headers, and even a preview.

Postman is essentially a specialized web browser that allows more manual control and has more buttons and switches as a result.

One other useful ability of Postman is the ability to format the response in accordance with the data you wish to see. You can have the response body come in HTML, CSS, JSON, or many other options.

JSON format is used to represent data that was derived from the JavaScript language.

APIs can also be accessed like pages in that they both can use HTTPS (secure version of hypertext transfer protocol). This can be done in Postman, too!

### Checking the Weather

Say you had an application which needed to display the weather, a location on Google maps, or a page from Facebook. Web APIs can be used to solve this problem of using the information provided by another service somewhere on the internet.

## What is an API?

An **API** is an Application Programming Interface. APIs provide a way for computer systems to interact with each other. Every programming language has a built-in API for writing programs. 

The commonality between all APIs is that they provide functionality for use by another program.

### Providers and Consumers

An API **provider** is the system that provides an API for other parties to use. GitHub is the provider of the GitHub API, for example.

An API **consumer** is the system that uses the API to accomplish some work. When you check the weather on your phone, it's running a program which consumes the weather API to retrieve forecast data.

When using the term **server** in the context of APIs, the server represents the API provider. The client represents the consumer. Stick to using provider and consumer though, since these mean different things than client and server.

### Wrapping Up

1. Web APIs allow one system to use the functionality of another over HTTP.
2. The system offering the web API is the provider.
3. The system using the web API is the consumer.

## Why are APIs useful?

APIs can do a seemingly infinite amount of things. The most common use of a web API is to share data between systems. 

### Data Sharing

One example would be a birthday card application. Instead of manually creating each potential receivee of a birthday card in a database, one can simply use the API provided by Facebook to fetch data about a user's friends much faster.

### Leveraging Existing Services

There's no need to reinvent the wheel in most cases. Imagine a person has an idea to create an application which stores collections of images relative to geographic areas. Obviously, the database for this needs to be massive, as millions-billions of pictures can possibly be stored. 

It may make more sense to capitalize on Instagram, Facebook, or Flickr's API for geographic image tags and outsource all of the effort to those APIs.

APIs enable application developers to build their applications on top of a variety of other specialized systems. This, in turn, allows them to focus on their primary objectives and not worry about the complexities of each part in the system. Instead of doing everything by yourself, you can outsource the project to several specialists. This almost always results in better outcomes.

## Data Serialization

APIs are generally used to allow systems to communicate by passing structured data back and forth. The content of most requests will use a format and media type that works well for representing hierarchical data. These formats are known as **data serialization formats**,

A **data serialization format** describes a way for programs to convert data into a form which is more efficiently stored and/or transferred. The data can then be converted back into the original data at any time by the original program or any other program which can understand its format.

### XML

**XML** stands for **extensible markup language**. XML is similar to HTML but is stricter: it cannot handle missing tags or improper nesting. JSON is now much more common than XML in its use by APIs.

Here is an example of an XML file:

```xml
<address>
  <street>Penelope Drive</street>
  <city>Shawshank</city>
  <state>MI</state>
  <country>United States</country>
</address>
```
### JSON

**JSON** stands for **JavaScript Object Notation** and is probably the most popular data serialization format used by web APIs today. The syntax that it uses is based on the way that object literals are written in JavaScript. JSON is simpler and less ambigious than XML.

```js
{
  'street': 'Penelope Drive',
  'city': 'Shawshank',
  'state': 'MI',
  'country': 'United States'
}
```
JSON can also represent specific objects, arrays, strings, and numbers.

```js
{
  'object': {
    'city': 'Point'
  },
  'array': [1, 1, 2, 3],
  'string': 'Hello',
  'number': 8772.233
}
```
We access the values nested in JSON just like we do with objects (dot notation).

`object.city; // Point`
`array[2];    // 2`

### Summary of Media and Data Serialization

1. Media types describe the format of a response's body
2. Media types are represented in an HTTP reponse's `Content-Type` header.
3. Data serialization provides a common way to pass data between systems with the guarantee that each system will be able to understand the data.
4. JSON is the most popular media type for web APIs (people love JS).

## REST and CRUD

**REST** is a term used to describe a set of conventions for how to build APIs. It stands for **representational state transfer**.

*Representational* refers to how a representation of a resource is being transferred, and not the resource itself.

*State transfer* refers to how HTTP is a stateless protocol. Servers know nothing about the client and everything the server needs to process a request (the **state**) is included in the request.

Unlike HTML, APIs do not have forms. Also, APIs can use all of the HTTP methods, which further helps clarify the purpose of API requests. 

REST is used to determine the *what* and *how* of a resource.

What are resource is being acted upon?

How are we changing/interacting with this resource?

### CRUD

**CRUD** is an acronym used to describe the four actions that can be taken upon resources: create, read, update, delete.

RESTful APIs model most functionality by matching the CRUD operations to the appropriate resource. For example, in place of using HTML-form driven actions, one can use operations that are more succinct to be performed by an API.

RESTful APIs only include actions that make changes to a resource. Actions like loading a form are instead handled by documentation, not by the developer. APIs have far fewer limitations when it comes to which HTTP methods they can use. For this reason, APIs tend to embrace HTTP more than HTML.

## Fetching Resources

A **resource** is a representation of some grouping of data. For JSON, a resource comes in the form of an object literal.

A resource can be anything that an API user needs to interact with. Blogs may have posts, tags, sections, users, comments, replies, likes, dislikes, etc., all available as resources in its API. It may allow users to even create or edit those resources. 

A **collection resource** identifies multiple resources as a single group. One example of this would be **products**, which would contain the resources that are products on a web store.

### Elements and Collections

There are two types of resources involved in RESTful APIs.

**Elements** are the representation of a single resource. Operations that involve a single resource are done in the context of that resource and use that resource's path.

`www.bookstore.com/v1/products/:id` `:id` is the path for that element.

**Collections** are groupings of elements of the same type. It's common for collection and element resources to have a parent-child relationship. 

`www.bookstore.com/v1/products`

The parent is normally the collection, and the elements are its children.

