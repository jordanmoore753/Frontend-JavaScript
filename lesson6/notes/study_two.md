# Exam Practice

## Using Web APIs to work with DOM

### API

An **API** stands for application programming interface. An API allows two computer systems to interact with each other. **All** APIs provide functionality for use by another program.

An example of an API would be that programming languages have an API for writing programs. Remember, the *I* stands for interface, so programming languages definitely have an API. Another example of an API is Google Maps API, which provides map data and functions to perform actions with map data. Developers can incorporate Google Maps into their own application.

**Web APIs** in particular are APIs that are built with web technologies and function using HTTP. Google Maps API is definitely an example of a Web API.

### Provider vs Consumer

A **provider** is the program which supplies an API for others to use. The API provider is the system that provides an API for another system to use.

A **consumer** is a user of an API, and this user uses the API to accomplish some work.

To extend the Google Maps API, Google is the **provider** of Google Maps API. My trail-service application which uses Google Maps to generate map data is the **consumer**.

### Purpose of API

An API is used to avoid unnecessary work on the part of a developer. If the functionality already, there is no need to create one's own version of it. One can use the provider's API and use its response in the way that the consumer requires.

APIs also provide an easy, streamlined way to share data. For instance, Google Maps makes it extremely easy for developers to access map data. This is the primary reason people use and develop APIs. 

One can use several APIs, and use each as a building block to create a new, innovative application. For instance, I created Botanist, an application which combines a plant-database API and MapQuest API, which allows one to map specific instances of plants which are available in the database. Neither of the two APIs can accomplish this task on their own, but when the developer uses them as building blocks, a new functionality can be created.

### Enabling Automation

APIs make automation on the part of web applications possible.

This is an extension of the idea that one can avoid having to do the gruntwork of creating an API from scractch, and instead use one that already exists. We can automate the task of creating an application by using other APIs to provide the functionality and/or data that we require for the application.

We can use APIs to automate specific tasks on an application as well. Imagine that one is creating a library application for an in-home library. This application will track which books have been loaned out to whom, when they were loaned out, and when they are due back. At first, the application requires manually inputting which books have been loaned out once the person says they want to take the book out.

However, if we decide to use an API instead, we can get rid of the work of manually tracking and inputting loaned and returned book data. We can create two APIs: one will return book data from a database; one will modify the book data from a database. We would request book data from the database with the first API and then request to modify the specific book data from the database with the second API.

Not only does this automate the behavior of the library, it also makes the process more reliable and safe, as the ways in which one interacts with an API must be defined strictly. In this way, APIs provide a layer of abstraction between the user and the actual data or function they are requesting.

### Data Serialization

APIs communicate by passing structured data back and forth between provider and consumer. The data must be passed in specific formats for an API to be able to provide the correct data.

A data serialization format describes a way that programs can convert data into a form which can be easily transferred and stored. The benefit of data serialization is that it provides common data types for providers and consumers to use, making the whole request/response cycle more reliable and safe.

Another benefit of data serialization is that the passed data can be converted back into the original data at any time by either the provider of the API or the consumer.

The most common-used data serialization format is JSON, which represents data in JS objects. The data is passed to the consumer is key-value pairs within a JS object.

### CRUD and REST

**CRUD** represents the basic operations of an application. These are:

1. Create
2. Read
3. Update
4. Destroy

These four operations are the main possibilites of an application. For instance, in my Stardew application, one can:

1. Create new plant data for a given user.
2. Read the plant data for a given user and season.
3. Delete specific plant data for a given user and season.

An update operation would be if one could update the quantity of a certain plant's crops in a season.

Essentially, CRUD operations represent the actions which can be taken upon resources.

These operations are relevant to APIs, as well. **REST** stands for representational state transfer, and this is a common set of practices which define a well-crafted API.

A RESTful API assigns the correct HTTP verbs with the equivalent CRUD action. 

Here are some examples:

1. Create => POST
2. Read => GET
3. Update => PUT || PATCH
4. Destroy => DELETE

A RESTful API models CRUD functionality by matching an appropriate HTTP verb with the appropriate resource. In this case, the resource is the HTTP verb and the operation is the CRUD action. Using the correct HTTP verb truly represents what the operation being taken upon a resource is.

A good example of when an API could be improved is when a `<form>` uses a `POST` action but passes `delete` as a parameter, which indicates that an element or collection must be deleted. Instead of using a POST request to delete, we should use a DELETE request.

The benefit of using RESTful design is that it makes predictable behavior across APIs. There is no guessing game about which route or HTTP verb to use when performing a certain operation, since the appropriate HTTP verb which represents the operation will be used. When we want to create a new element for the collection, we use the POST request. When we want to read a collection we can use the GET request.

REST is a set of conventions about how to build an API. RESTful APIs consist of CRUD actions on a resource.

REST requires thinking in a resource-oriented way.

### Resource, Element, and Collection

A **resource** is a representation of some grouping of data. In a Todo application, the most obvious resource would be Todos.

A **collection** is a grouping of elements of the same type. For instance, a group of Todos would be known as a collection of Todos.

An **element** is a single resource. A single todo is an element.