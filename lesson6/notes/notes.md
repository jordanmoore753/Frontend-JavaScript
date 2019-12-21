# Advanced jQuery and Dynamic Content Creation

## namespacing

**namespacing** is the use of naming one's events with namespaces. Using **namespaces** to bind events to is useful because it allows one to be selective in which events they unbind.

One can use `off` to unbind an event from an element.

```js
$('p').on('click.first', function(e) { // first is the namespace
  alert('Yes!');
});

$('p').on('click.second', function(e) {
  alert('No!');
  $(this).off('click.second'); // unbinds the second namespace from event
});

$('p').trigger('click.second'); // this triggers the namespaced event
```
The first time we click the `p` element, both alerts will display. The second time, however, the `second` namespace will not be alerted on the console, since it has been unbinded from the `click` event.

> In place of `click.second`, one could use `e`, which represents the event Object.

## Event Delegation with jQuery

Take a look at this code snippet:

```html
<div id="content">
  <p>Click me!</p>
  <p>No, click moi.</p>
</div>
```

```js
$('#content').on('click', 'p', function(e) {
  // code
});
```

The `p` selector in the `on` method invocation allows us to **delegate** events to specific selectors. Instead of binding the event to every `p` element, we can store the binding on its parent element, `div`, and delegate the behavior to the target from there. This is akin to JS prototypal inheritance, except it's top-down instead of bottom-up. The parent delegates to the children.

## Attaching Many Event Handlers with one Call

```js
$('#content').on({
  click: function(e) {
    console.log('yes!');
  },
  mouseenter: function(e) {
    alert('No!');
  },
});
```