# Event-Driven and Asynchronous Programming

**Asynchronous code** is code that runs non-sequentially, which means that it runs partly, then with delays, and can take days, hours, or seconds to run. It doesn't run continuously or even when the runtime encounters it.

`setTimeout` is a function and takes two arguments: a callback function and a time to wait specified in **milliseconds**. This function can be used to time different functions to execute at different times.

```js
setTimeout(function() { // 1
  console.log('World'); // 4
}, 2000);

setTimeout(function() { // 2
  console.log('!');     // 5
}, 3000);

console.log('Hello!');  // 3
```
The number refers to which order they occur in. The functions are invoked sequentially but the execution of each is done in accordance with the number of milliseconds passed to it as an argument.

> You can't tell if code is asynchronous just by looking at it, since it may call functions that you are unfamiliar with. Also, the code could have been invoked asynchronously, which adds another layer of abstraction to wade through.

Now, with asynchronous code, we must think about **what** the code does and **when** the code does it.

## Problems

1. Write a function `delayLog` which loops through the numbers from 1 to 10 and logs each number after that number of seconds.

```js
function delayLog() {
  for (let i = 1; i < 11; i += 1) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  }

  return;
}
```

2. Number each sequence and when it will execute.

```js
setTimeout(function() {   // 1
  console.log('Once');    // 5
}, 1000);

setTimeout(function() {   // 2
  console.log('upon');    // 7
}, 3000);

setTimeout(function() {   // 3
  console.log('a');       // 6
}, 2000);

setTimeout(function() {   // 4
  console.log('time');    // 8
}, 4000);
```

3. In what sequence are the following functions invoked?

```js
setTimeout(function() {     
  setTimeout(function() {
    q();
  }, 15);

  d();

  setTimeout(function() {
    n();
  }, 5);

  z();
}, 10);

setTimeout(function() {
  s();
}, 20);

setTimeout(function() {
  f();
});

g();

// d, f, g, n, q, s
// g, f, d, z, n, s, q
```

4. Write function `afterSeconds` which takes a callback and a time duration in seconds. The function waits for the seconds and then executes the callback.

```js
function afterSeconds(callback, time) {
  setTimeout(callback, time * 1000);
}

let c = function() {
  console.log('it has been two seconds');
};

afterSeconds(c, 2);
```

## setInterval

`setInterval` is similar to `setTimeout` in that it registers code to run at a specified time; however, `setInterval` allows us to invoke a callback again and again at intervals until told to stop.

When `setInterval` is invoked, it returns a numeric, nonzero `id` which is used to `clearInterval(id)`, which means to make the interval stop executing. This is why you should assign the `id` to a variable that can be used to for an argument to `clearInterval`.

```js
function hi() {
  console.log('hi!');
}

let id = setInterval(hi, 3000);

// hi!
// hi!

clearInterval(id); // done!
```
This may be the method used by Google Docs to periodically save a user's work inside of a document. It definitely could be!

### Problems

1. Write a function named `startCounting` that logs a number to the console every second, starting with 1. Each number should be one greater than the previous.

```js
let a = 1; // bad, side effects

function add() {
  console.log(a);
  a += 1;
}

let id = setInterval(add, 1000);

// or

function startCounting() {
  let count = 1;
  return setInterval(function() {
    console.log(count);
    count += 1;
  }, 1000);
}

let stopCounting = startCounting();
```
## User Interfaces and Events

Not all user interfaces must respond to a timed delay. Some require a button click for an action to occur.

An **event** is an object that represents some occurrence. It contains information about what happened and where it happened. The browser can trigger events as the page loads, when the user interacts with the page, and when the browser performs an action required by the program.

User interfaces are event-driven. The user must interact with the interface in order for something to happen. The user's interaction is an event and the event triggers behavior for certain events.

Code that the browser runs in **response** to an event is called an **event listener**.

One example would be an input form. The input is a valid phone number. The button for submitting the form is greyed-out until a valid phone number is input. Then, the button becomes clickable. The event listener in that case was the button becoming clickable, since it was done in response to an event (inputting a valid phone number).

## A Simple Example

```html
<!doctype html>
<html lang="en-US">
  <head>
    <title>title</title>
    <meta charset="UTF-8">
    <script>
      document.addEventListener('DOMContentLoaded', function(event) {
        var addButton = document.getElementById('add');
        var output = document.getElementById('output');
        var count = 0;

        addButton.addEventListener('click', function(event) {
          count += 1;
          output.textContent = String(count);
        });
      });
    </script>
  </head>

  <body>
    <p>
      <span id="output">0</span>
      <button id="add">Add One</button>
    </p>
  </body>
</html>
```
The example above is a simple example of how **event listeners** work.

First, we assign an event listener to the entire document. When the entire DOM is loaded, the function callback is invoked.

This function forms a closure with retains a reference to `count`. That's important to remember.

We assign variables to point at the `span` and `button` tags, so we can manipulate them with the event listener.

`addButton` is assigned an event listener which invokes a function when `click`ed. The `count` is incremented and the `textContent` of the `span` tag is updated to point at the new `count` value.

## Page Lifecycle Events

When the page finishes loading is not an easy thing to identify. Different web pages have different resources, and thus, different loading times and requirements.

For an HTML-only web page, the process of displaying the web page is as follows:

1. HTML code received from server.
2. Page displayed on screen.

For most pages, however, there are more steps.

1. HTML code received from server.
2. HTML parsed and JavaScript evaluated.
3. DOM constructed from parsed HTML.
4. Page displayed on screen.
5. Embedded assets are loaded.

These steps are general enough to use as a mental model for how a web page is loaded.

The `DOMContentLoaded` type is necessary because the JS is evaluated **prior** to the DOM construction and HTML processing. By using `DOMContentLoaded` we tell JS to only execute the function once the DOM has been fully loaded.

> When the DOM is ready for interaction, this is called the **DOM Ready Event**. It's an imprecise term that has found a niche by jQuery's popularity.

Let's add more steps to show how the 'example' we used was loaded by the browser.

1. HTML code received from server.
2. HTML parsed and JS evaluated.
3. DOM constructed from parsed HTML.
4. DOMContentLoaded event fires on document.
5. Page displayed on screen.
6. Embedded assets are loaded.
7. load event fires on window.

## User Events

An interactive web application responds to user actions. Without user actions, the application wouldn't be useful at all. 

### Adding Event Listeners

Event listeners are also called **event handlers**. These are functions that the JS runtime calls when a particular event occurs. Follow 4 steps in setting up an event handler:

1. Identify the event that must be handled.
2. Identify the element that will receive the event.
3. Define a function to call when this event occurs.
4. Register the function as an event listener.

Let's add an event listener in the following code.

```html
<html>
  <head>
    <title>Test Page</title>
    <script>
      function displayAlert() {
        let msg = document.getElementById('message').value;
        alert(msg);
      }

      document.addEventListener('DOMContentLoaded', function(event) {
        let myButton = document.getElementById('alert');
        myButton.addEventListener('click', displayAlert);
      });
    </script>
  </head>
  <body>
    <textarea id="message"></textarea>
    <button id="alert">Alert</button>
  </body>
</html>
```
First, we define an event listener for the document once the DOM is loaded. Once the DOM is loaded, add an event listener to `myButton`, which is the only `button` tag on the page.

The `click` is the **listener** within the `DOMContentLoaded` event handler.

Another way to do this is:

```js
document.addEventListener('DOMContentLoaded', function() {
  let button = document.getElementById('alert');
  button.onclick = displayAlert;
});
```
`onclick` is a `GlobalEventHandler`, which is a mixin that allows developers to register functions as an event listener for an element in a different way. Instead of adding the `click` handler, we assign the listener to the `onclick` property of the `button` element.

### The Event Object

The argument passed to the event handler provides extra information about an event. It is an `Event` object that provides contextual information about the event.

1. `type`: the name of the event: `click`
2. `currentTarget`: the current object that the event object is on. This refers to the element that has the event listener attached to it.
3. `target`: the initial object to receive notification of the event; the element clicked by the user.