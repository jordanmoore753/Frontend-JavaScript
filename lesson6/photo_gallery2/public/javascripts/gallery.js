async function getPhotosInfoComments() {
  let photoTemplate = Handlebars.compile($('#photos').html());
  let response = await fetch('http://localhost:3000/photos');
  let json = await response.json();
  let data = { photos: json };

  $('#slides').append(photoTemplate(data));
  getPhotoInformation(json[0]);
  getPhotoComments(json[0]['id']);
  
  return;
} 

async function getPhotoComments(id) {
  let commentsTemplate = Handlebars.compile($('#photo_comments').html());
  let commentTemplate = Handlebars.compile($('#photo_comment').html());
  let response = await fetch(`http://localhost:3000/comments?photo_id=${id}`);
  let json = await response.json();
  let data = { comments: json };
  Handlebars.registerPartial('comment', $('#photo_comment').html());

  $('#comment_list').append(commentsTemplate(data));

  return;
}

function getPhotoInformation(photoObject) {
  let photoInformation = Handlebars.compile($('#photo_information').html());
  $('section > header').append(photoInformation(photoObject));

  return;
}

function startPage() {
  getPhotosInfoComments();  
  return;
}

$(function() {
  startPage();
})