# Promises

A `promise` is an object which represents the eventual completion or failure of an asynchronous operation. More specifically, a promise is a returned object to which you **attach callbacks**, instead of passing **callbacks to a function**.

**Scenario**: `createTextFileAsync()` asynchronously generates a text file given a configuration record and two callback functions, one of the callback functions is for if the file creation was successful, and one callback function for if the file creation wasn't successful.

```js
function successCall(result) {
  //
}

function failureCall(result) {
  //
}

createTextFileAsync(configFile, successCall, failureCall);
```
This is how `promises` work, except the success and failure callbacks must be attached to the promise.

```js
createTextFileAsync(configFile).then(successCall, failureCall);

// that's the shorthand, this is longer form

const promise = createTextFileAsync(configFile);
promise.then(successCall, failureCall);
```
`promise.then` is called an **asynchronous function call**. 

Here's my example:

```js
async function addP(msg) {
  let parent = document.getElementById('store');
  let newP = document.createElement('p');
  newP.textContent = msg;

  parent.appendChild(newP);
  return newP;
}

function success(result) {
  console.log(`Operation a success: ${result}.`);
}

function failure(result) {
  console.log(`Operation a failure: ${result}.`);
}

const promise = addP('This is my new message.').then(success, failure);
```
## Guarantees

`Promise` comes with certain guarantees:

1. Callbacks will not be called before the completion of the current run of the event loop.
2. Callbacks added with `then` even **after** the success or failure of the asynchronous operation will be called.
3. Multiple callbacks may be added by calling `then()` several times. Each callback is executed in the order in which they were inserted.

## Chaining

**Chaining** is the act of executing two or more asynchronous operations back to back. Each subsequent operation starts when the previous operation succeeds, with the result from the previous step. This is implemented with a **promise chain**.

The `then()` function returns a **new promise**, different from the original.

```js
const promise = doSomething();
const promise2 = promise.then(successCall, failureCall);
```
`then()` in this example has returned a new promise. This new promise represents the completion of `doSomething()`, and `successCall` or `failureCall`.

Here's an example:

```js
addP('This is a new message.')
.then(function(result) {
  return addP(result);
})
.then(function() {
  return addP('One more message.');
})
.then(function(finalResult) {
  console.log(finalResult + ' ' + 'Finished!');
})
.catch(failure);
```