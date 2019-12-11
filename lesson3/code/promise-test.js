<!doctype html>
<html lang="en-US">
  <head>
    <meta charset="utf-8">
    <title>Bold Element + Custom</title>
    <style>
    </style>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        function addP(msg) {
          let parent = document.getElementById('store');
          let newP = document.createElement('p');
          newP.textContent = msg;

          parent.appendChild(newP);
        }

        function success(result) {
          console.log(`Operation a success: ${result}.`);
        }

        function failure(result) {
          console.log(`Operation a failure: ${result}.`);
        }

        const promise = addP('This is my new message.').then(success, failure);
      });
    </script>
  </head>
  <body>
    <h1>Existing Page</h1>
    <div id="store"></div>
    <button id="sub">Click To Submit</button>
  </body>
</html>
