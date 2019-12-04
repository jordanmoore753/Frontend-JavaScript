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

### Problems

1. Add an event listener that moves the X to wherever the mouse clicks.

```js
document.addEventListener('click', function(event) {
  let d = document.querySelector('.x');
  d.style.left = String(event.clientX) + 'px';
  d.style.top = String(event.clientY) + 'px';
});
```

2. Update the answer so the 'x' moves when the mouse moves.

```js
document.addEventListener('mousemove', function(event) {
    let d = document.querySelector('.x')
    d.style.left = String(event.clientX) + 'px';
    d.style.top = String(event.clientY) + 'px';
    console.log(event.clientX)
});
```

3. Add events that do: change X to red when 'r' is pressed; x to blue when 'b' is pressed; X to green when 'g'.

```js
document.addEventListener('keypress', function(event) {
    let h = document.querySelector('.horizontal');
    let v = document.querySelector('.vertical');
    let newColor;
  
    if (event.key === 'r') {
      newColor = 'red';
    } else if (event.key === 'g') {
      newColor = 'green';
    } else if (event.key === 'b') {
      newColor = 'blue';
    }
  
    if (typeof newColor === 'string') {
      h.style.background = newColor;
      v.style.background = newColor;
    }
});
```

4. Write code that updates a counter while the user types into the textarea.

```js
document.addEventListener('DOMContentLoaded', function(event) {
  let textArea = document.querySelector('textarea');
  let count = document.querySelector('.counter');
  let counter = 0;
  
  textArea.addEventListener('keyup', function(event) {
    let k = event.key;
    let msg = `${140 - textArea.textLength}`;
    count.textContent = msg + ' characters remaining';
    
    if (textArea.textLength > 140) {
      textArea.setAttribute('class', 'invalid');
    } else {
      textArea.className = '';
    }
  });
});
```

That answer also includes backspacing for updating the character count.

## Capturing and Bubbling

Adding event listeners to elements is fine for small applications or pages where there isn't much else going on. There are downsides to the use of event listeners, though:

1. Can only add event listeners when the DOM is ready (DOMContentLoaded).
2. Must add event listeners manually after DOM is ready.
3. Adding event handlers to many elements can be slow and create difficult code.

**Event delegation** eliminates these problems. Before venturing into delegation, we must learn what **capturing** and **bubbling** are.

### Capturing and Bubbling

First, `currentTarget` of the event object refers to the object that the event handler was assigned to. The implicit context `this` of the event listener's function is `currentTarget`, which is the original object the event handler was assigned to.

One event can trigger more than one handler. 

**Capturing and bubbling** are phases that an event goes through after being fired. After an event is fired, the event is dispatched to the `window` object. Then, the event is sent to the `document` object, all the way down the hierarchy of nodes until we reach the `target`, which is the object that the event was fired upon initially. This process is called **capturing**, where we search from the `window` until finding the `target`. Next, we commence the **bubbling** phase, where the process reverses, and the event travels from the `target` all the way back to the `window`. As the event searches through the hierachy, the event is searching for event listeners on any of the DOM objects.

This is why nested elements can invoke an event listener on a parent element. Since the **bubbling** phase by default is when the event fires on the target, the event can travel up the hierarchy of nodes and find the parent object with the event listener for firing. Then, this object can fire with the context of `target` as the original object that was clicked or acted upon to initiate the capturing.

### Problems

1. Reverse the order of alerts.

```js
var elem1 = document.querySelector('#elem1');
var elem4 = document.querySelector('#elem4');

elem1.addEventListener('click', function(event) {
  alert(event.currentTarget.id);
}, true); // true means that event listeners can fire during capturing phase

elem4.addEventListener('click', function(event) {
  alert(event.currentTarget.id);
});
```

2. Predict the output.

`1, 2, 4, 3`. 3 fires on the bubbling phase since its argument for `capture` is `false`, meaning that firing only occurs for that element during the bubbling phase, not the capture.

3. How many alert boxes will be fired when yellow is clicked?

`1, 4`. This happens because `0` is not a parent element of `4`, so it can not be fired as `4` is not a child of it. `1` is fired first because its `capture` is assigned to `true`, and `4` fires on the bubbling phase next.

### More Practice

1. Predict the output.

`MAIN, DIV`. The event listener that fires first is the one which alerts the `tagName` of `target`, not `currentTarget`, since the event listener with the alert `target` is assigned first. Both of these events fire during the bubbling phase. A single element can have multiple of the same `type` event handlers, as shown by this example.

2. Predict the output pressing yellow.

`capturing, then bubbling`. The event listener for `capturing` is listening on the capture phase and fires once it reaches `#elem1`. Next, the event listener for `bubbling` is listening on the bubbling phase and fires once it reaches `#elem1`.

3. Explain the output.

`DIV, q, w, MAIN`. The event listener for `click` is fired first, since we click `elem1` first. This will alert `DIV` first since that's the tag name. The next event listener is `keypress` for `q`, and then `w` since we typed them in that order. The last event listener to fire is `MAIN` since that's the last thing clicked.

## Preventing Propogation and Default Behaviors

`stopPropogation` is a method which can be used to prevent the bubbling phase. If another event listener of the same type is fired first before the `target` with the use of `capture: true` in arguments, the `stopPropogation` will prevent the event handler from reaching the `target`; therefore, the `target` will not execute its function. This means that not only can `stopPropogation` stop the bubbling phase from happening, it can also stop the capturing phase early.

`preventDefault` is another method which can be used to change an event's default behavior. One example would be the link's default behavior of opening a new page. By using `preventDefault`, we can prevent that action from occurring.

```js
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault(); // this prevents link from opening
    alert('Following the link was prevented.');
  });
})
```
> Run `preventDefault` and `stopPropogation` immediately in a function. This can prevent difficult debugging due to unforeseen bugs, and also stresses the importance of either of these methods.

The browser will wait for the propogation phases (capturing and bubbling) to finish before executing any default behavior. Executing `preventDefault` anywhere during propogation will prevent that behavior from being executed.

## Event Delegation

There are drawbacks to the way we've been adding event listeners.

1. For a large application with thousands of event listeners, this strategy we've been employing simply won't work. It can fail easily by not attaching an event listener in the right spot, and is also costly from a performance standpoint. It'd be better to have all `button` tags delegate behavior up to a common object. 

2. Any elements added **after** the DOM is loaded, say by user interaction, have to manually be added event listeners. Our strategy is only useful for adding event listeners to DOM objects.

3. We've gotta wait for the DOM to be finished loading. This could produce timing problems if other code must wait also before it runs.

**Event delegation** uses bubbling to address all three of these problems. Instead of adding a single listener to every element, add a listener to all of those element's parent element. Then, those elements can delegate that behavior/inherit the listener.

This is similar to delegation in JS objects. One prototype object holds all of the behaviors common to its subtypes. The objects that spawn from this Object don't hold their own copies; rather, they delegate up the prototype chain to the prototype object and use its behavior. This is the same concept just with the DOM.

## Event Loop

These notes are from `What the heck is the event loop anyway?` by Philip Roberts.

There is an event loop inside of JavaScript.

WebAPIs are things that the browser provides. Methods like `setTimeout` are a part of this.

### The Call Stack

One thread == one call stack == one thing at a time!

The call stack is a data structure which records **where** in the program we are. I believe this has to do with execution contexts.

When we enter a function, we push something onto the stack, and when we return from the function, we pop from the stack. Here's an example:

```js
function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  let squared = square(n);
  console.log(squared);
}

printSquare(4);
```
The stack is pushed and popped from like so:

1. `printSquare` is invoked. We push that function onto the stack. 
Current stack: `[printSquare(4)]`.
2. `square(4)` is invoked on first line of the function.
Current stack: `[printSquare(4), square(4)]`.
3. `multiply(4, 4)` is invoked from `square`. 
Current stack: `[printSquare(4), square(4), multiply(4, 4)]`.
4. Now, the stack must pop until the stack is empty. First goes `multiply`, then `square`, and then `printSquare`. Each time the function returns the `pop` occurs.

### Blocking

Blocking refers to functions on the call stack that are **slow**, because they block further actions until the current action is completed. The browser can only do one thing at a time. Asynchronous callbacks are the solution to this.

### The Event Loop

Things can be accomplished concurrently, which means more than one thing at a time. The methods provided to JS by WebAPIs can be run concurrently. 

```js
console.log('hi');

setTimeout(function cb() {
   console.log('there');
}, 5000);

console.log('js!');
```
The call stack in this exmaple is as follows: `[console.log(hi)]`, then `[setTimeout]`, then `[ console.log(js)]`; however, the `setTimeout` function is popped once the `timer` is handed over to the WebAPI. The webapi is running concurrently while `console.log(js)` is popped from the stack. When the `timer` is done, it pushes the `cb()` function onto the **task queue**.  This is a list of functions to push onto the stack when the stack is empty. 

After 5 seconds, the `cb()` is pushed from webapi into the task queue. Since the stack is empty at that point, `cb()` is pushed onto the call stack to be invoked.

The event loop's role in this is: look at the stack, look at the task queue. If the stack is empty, push the first element of the task queue onto the stack. Then, the function is invoked and the call stack and task queue are empty.

If you used a `setTimeout` with `0` seconds, the execution would still be the same. The function gets deferred to the webapi and then to the task queue. Once the call stack is empty and has no functions left to invoke in the program, the task queue is addressed.

The two examples above illustrate what happens when an async call happens. The call is handled partly by the webapi, when then defers its return function to the task queue, which then is executed once the call stack is empty and out of potential calls.
