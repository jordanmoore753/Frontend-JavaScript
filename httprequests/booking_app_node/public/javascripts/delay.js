// function delay(func, delay) {
//   let timeout;

//   return function(...args) {
//     if (timeout) {
//       alert('Try again. Your request timed out.');
//       clearTimeout(timeout);
//     }

//     timeout = setTimeout(function() {
//       func.apply(null, args);
//     }, delay);
//   };
// }