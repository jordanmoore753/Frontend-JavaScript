# jQuery

**jQuery** has as its main goal the elimination of bugs and inconsistencies between different browser's implementations of HTML and the DOM. 

jQuery is a JavaScript library. It is still the most popular. There are new ones but these do not have the universal acceptance that jQuery has.

jQuery at its core is a function that wraps a collection of DOM elements and some convenience methods into an object. You can call the function to select the elements one needs to process, and then manipulate the object or its elements with methods built into the object.

jQuery mostly acts on DOM elements. This means that we must wait for the page to be fully loaded before executing our code, since the elements referenced won't exist when jQuery is first executed. 

The **DOM ready callback** is used like `DOMContentLoaded`.

```js
$(document).ready(function() {
  // DOM loaded and ready for action, images on img tags are not
});
```
The callback function we pass to `ready` executes after the document and its dependencies have finished loading. Some elements, like images, are loaded after the `document` is ready. For these, one must wait for the `window` to be ready.

```js
$(window).ready(function() {
  // images ready and everything else too
});
```
## Adding Event Listeners with jQuery

One of the most common ways to respond to user actions on a webpage is to bind events with jQuery. The event listener is the function which gets executed when a particular event occurs. Binding events uses the same syntax the event type one wants to process.

```js
$(function() {
  $('a').on('click', function(event) {
    event.preventDefault();
    alert('I clicked!');
  });
});
```
In this example, `click` is the event that triggers/fires the `function` which follows it. JavaScript calls the **event handler** once the user clicks a link `a`. 

Now, we added a `p` element to the HTML. Select the `p` element, and when clicking the `a` element, modify the `textContent` of the `p` element to match the `a` textContent.

```js
$(function() {
  let $p = $('p');
  
  $('a').on('click', function(event) {
    event.preventDefault();  
    let $anchor = $(this);    // this is context of `a`
    $p.text($anchor.text());  // setter method `text`
  });
});
```
Add an event listener and handler for a `form` element which submits a fruit to become `textContent` or `val()`.

```js
$('form').on('submit', function(event) {
  event.preventDefault();
  let $input = $(this).find('input[type=text');
  $p.text('Your favorite fruit is ' + $input.val() + '.')
});
```
An important thing to consider is that whenever you 'grab' an element, like so:

```js
$('a');
```
You are grabbing **every element of that tag** on the page. You can specify different selectors in order to avoid or include more elements, but by default you are returning a **collection of jQuery objects**. These jQuery objects in the jQuery collection can use `jQuery` methods, including getter and setters, and iterators like `each`.

Likewise, grabbing an element by its `id` will return a collection of **one** jQuery element.

```js
let $pa = $('#token'); // #token is an id for an element
```
One can also iterate through a collection of `jQuery` objects.

```js
$('a').each(function() {
  console.log($(this).text()); // each 'a' element 
});
```
### DOM Traversal with jQuery

HTML element access is possible using jQuery to pass a CSS-like selector to the jQuery function.

`find` can be used to traverse to an element's child elements.

```js
let $l = $('ul');   // get HTML element ul
$l.find('li:even'); // returns jQuery collection of two li elements, 0 and 2 indexed
$l.find('li');      // returns jQuery collection of all three li
```
To look outward from an element, (`find` looks inward) one can use `parent` to find an element's parent element.

```js
$l.parent(); // body, jQuery object
```
You can also select the parent elements which have a certain class or other selector.

```js
$l.parent('.highlight'); // only parent elements which have class
$l.parent('#high');      // only parent elements with id 
$l.parent('p');          // all children p elements of parent
```
`closest` is a method for finding the first matching element starting from a given jQuery object.

```html
<ul class="wont">
  <ul>
    <li></li>
  </ul>
</ul>
```

```js
$l = $('li');
$l.closest('ul').addClass('categories');
// this will add class to the immediate parent of li, ul, since that's the first and closest ul to li
```
Keep in mind, `closest` will check the element against itself.

```js
$l.closest('li') === $l; // same element
$('article li').filter(function(index) {
  return index === 2;
});
$('li'.textContent === 'ac ante');
$('li li').filter(":contains('ac ante')");
$('td')[-1];
$('body').filter(function() {
  return $(this).className(":contains('block')");
});
$('body').find("[class*=block]");
```