<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Languages</title>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script>
      $(function() {

      });
    </script>
    <style>
      body {
        font-size: 1.2rem;
        background-color: #2CA58D;
        font-family: monospace;
      }
    </style>
  </head>
  <body>
    <main id="watch">
      <p>
        <span class="hours"></span>
        <span class="minutes"></span>
        <span class="seconds"></span>
        <span class="centiseconds"></span>
      </p>
      <footer>Created by Jordan Moore</footer>
    </main>

    <script id="todo_template" type="text/x-handlebars">
      {{#each todos}}

      {{/each}}
    </script>
  </body>
</html>


<!-- https://cdn.iconscout.com/icon/premium/png-256-thumb/trash-1739005-1477127.png -->