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

## Handlebars

**Handlebars** is a templating engine. One can insert new HTML into HTML based on server-side changes.

Handlebars use a fast and complex method of string replacement to write the names of properties of objects within **Handlbars** and have them replaced with the property values. The **Handlebars** are the following symbols: `{{name}}`. 

> `name` is the name of the property.

`compile` is the main method that is used in Handlebars. It compiles a template so it can be executed immediately. Templates can be created within one's HTML or by hand in JavaScript.

```html
<script id="post" type="text/x-handlebars">
<article>
  <h1>{{title}}</h1>
  <p><time>Posted on {{published}}</time></p>
  {{body}}
</article>
</script>
```
`{{title}}`, `{{published}}`, and `{{body}}` are the properties that will be passed as data in the `compile` function's invocation.

```html
<script id="listItem" type="text/x-handlebars">
  <li data-index={{index}}>{{item}}</li>
</script>

<ul>

</ul>
```
The template is contained in the `script` tag with `id` of `listItem`. 

```js
let items = ['No!', 'Come on.', 'Okay?'];
let listTemplate = Handlebars.compile($('#listItem').html());

items.forEach(function(item, index) {
  let data = {
    index: index,
    item: item,
  };

  $('ul').append(listTemplate(data));
});
```
`listTemplate` contains the function returned from `compile` being invoked with the template with `id` of `listItem`. This function will produce HTML of `<li data-index={{index}}>{{item}}</li>` when invoked.

For each of the elements in `items`, the `listTemplate` function is invoked and passed the necessary for filling in the template referenced by `#listItem`. Then, the new `li` is appended onto the `ul` element.

At it's core, the `compile` method does the following:

1. Is passed a `script` element that is rendered into HTML.
2. Returns a template function.
3. Template function can be passed an object.
4. Template function returns an HTML string with all of the properties filled in.

There are also `if` statements in Handlebars, but these can only take single values (unless we use a helper function).

```html
<script id="checker" type="text/x-handlebars">
  {{#if apple}}
    <li>Yes.</li>
  {{else}}
    <li>No.</li>
  {{/if}}
</script>
```
> `if` must be preceeded with a `#` and must close with a `/if`. This is true for all **helpers** in Handlebars.

```js
let newTemp = Handlebars.compile($('#checker').html());
$('body').append(newTemp({ apple: true }));
// appends li with `Yes`
$('body').append(newTemp({ apple: false }));
// appends li with 'No'
```
Add a helper method to `Handlebars` by using the `registerHelper` method.

```js
Handlebars.registerHelper('if_equal', function(a, b) {
  if (a === b) {
    return true;
  } else {
    return false;
  }
});
```
This helper method can now be used in the `#if` helper function.

```html
<script id="checker" type="text/x-handlebars">
  {{#if_equal apple true}}
    <li>Yes.</li>
  {{else}}
    <li>No.</li>
  {{/if}}
</script>
```
Two arguments are passed to the `if_equal` helper method.

```js
let newTemp = Handlebars.compile($('#checker').html());
$('body').append(newTemp({ apple: true }));
```
For values in a property that are `html`, you can prevent them being escaped by using 3 `{{{}}}` to enclose the property name.

```html
<script id="post" type="text/x-handlebars">
  <article>
    <h1>{{title}}</h1>
    <p><time>Posted on {{published}}</time></p>
    {{{body}}}
  </article>
</script>
```
## Ajax

Ajax is the technology known as Asynchronous JavaScript and XML. Using Ajax, data could be passed between the browser and the server, using the XML API, without reloading the web page. 

Ajax requests are triggered by JS code. The code sends a request to a URL. When it receives a response, a callback function can be triggered to handle the response. Since the request is asynchronous, all of your other code continues to execute while the request is being processed, and that's why a callback must be allotted to handle the response.

## Photo Gallery Assignment

1. Create an AJAX request to the server to get the JSON data for all the photos on page load.

- Render `photos` template and write it to `#slides`.
- Render `photo_information` template using the **first photo's** data, write it to `section > header` element.

Use `/photos` endpoint with GET and return JSON data.

2. Create the slide to next picture feature (forwards and backwards).

- Get the `figure` which has `display` value of `block`. 
- Check its `data-id` property and subtract `1` from it.
- NEXT: Find the next sibling. If the `id` + 1 is `===` to `length` of `children` of `figure`'s parent, the sibling is `figure` with `data-id` of `1`. 
- PREVIOUS: If `id` - `1` is `0`, the sibling to change to is `figure` with `data-id` of `children` of `figure` parent.
- Otherwise, get the `next` sibling of `currentFigure`. 

Render the photo details (pass `data-id` - 1 to `getPhotoInformation`).
Render the photo comments (pass `data-id` with `json` file to right method).

3. Implement `like` and `favorite` buttons.

- Get `id` of visible figure when clicked like or favorite and assign it to `photo_id`.
- Send the request to `photos/like`, as `POST`, and with data (body) of `photo_id`. Return a `application/json` object.