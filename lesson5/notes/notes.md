# jQuery Animations

Animating CSS properties of elements is easy with jQuery. jQuery provides a well organized and succinct way of doing so. The jQuery effects library holds the methods for animating CSS properties.

These methods are known as **convenience methods**. Instead of having to manually write recursive functions for methods like `.fadeIn` and `slideToggle`, we can simply invoke those methods and pass them appropriate arguments.

Some convenience methods can even take a **callback** for once the animation is done being animated.

```js
$p.fadeOut(300, function() {
  $(this).addClass('invisible'); // this happens after fading
});
```
The context of these callbacks is the DOM element that was animated and did the calling of the method. In this case, it's `$p`, which is most likely all of the `p` elements returned from `$('p')`.

> You still need to use the `$` jQuery symbol to access `this`.

For any animations that aren't covered by `slide`, or `fade`, one can use `animate` to manually create an animation.

```js
$p.animate({
  left: 500,                 // amount to animate
  top: 250,                  // amount to animate
}, 400, function() {
  $(this).text('All done!'); // textContent of p changed
});
```
This can also be refactored to only being passed two objects.

```js
$p.animate({
  left: 500, // property to animate
  top: 250,  // property to animate
}, {
  duration: 1000, // how long the animation takes
  complete: function() { // standard name for property, calls function
    $(this).text('All done!');
  },
});
```
## Chaining jQuery Methods

jQuery animation methods can be chained, due to the fact that there is a **jQuery Effects Queue** that invokes the animation methods in a sequential order.

```js
$p.fadeIn().slideToggle(); // first fadeIn, then slideToggle
$p.slideUp(250).delay(400).slideDown(200);
// slides p up, then waits .4 seconds, then slides down
```
Sometimes, it's desirable to `stop` an animation before starting another one. Think of a user who wants to mess with the navbar on your site. If he hovers over it very quickly, the animations will continue to queue up.

By invoking `stop` before the `mouseleave` event, we can prevent this wacky `fade` behavior from occurring.

```js
$p.stop().fadeToggle(`100`);
```
> The `stop` method, when passed a boolean `true`, will stop **all** current and future animations in the queue. Use it carefully.

## HTML Data Attributes

Data attributes can be used to associate custom attributes with data. These data can be used for anything, but one great option is to use them to associate a list item with a particular block on the page, so that no matter what order the list items are arranged in, the correct list item corresponds to the correct data.

```html
<ul>
  <li><a href="#" data-block="gold">Gold Sponsors</a></li>
  <li><a href="#" data-block="silver">Silver Sponsors</a></li>
  <li><a href="#" data-block="bronze">Bronze Sponsors</a></li>
</ul>

<article data-block="gold">
  <h1>Gold Sponsors</h1>
</article>

<article data-block="silver">
  <h1>Silver Sponsors</h1>
</article>

<article data-block="bronze">
  <h1>Bronze Sponsors</h1>
</article>
```
The `data-block` is the data attribute. The `data-` is mandatory, but whatever follows the hyphen can be whatever you desire.

To access the `data-block` in JS, one can use:

```js
$link.data('block'); // remember, only after hyphen matters
```
Do not use the setter method of `data` to re-assign a `data-` value. Use `attr` instead.

```js
$link.attr('block', 'silver');
```