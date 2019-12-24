let firstPost = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: '<li>Come on.</li>',
  tags: ['I', 'will', 'end', 'you.'],
};

let secondPost = {
  title: 'Second',
  published: 'April 11, 2015',
  body: 'What?',
};

let posts = [firstPost, secondPost];

$(function() {
  Handlebars.registerPartial('listPartial', $('#list_item').html());
  let postTemplate = Handlebars.compile($('#posts').html());

  $('body').append(postTemplate({ posts: posts}));
});
