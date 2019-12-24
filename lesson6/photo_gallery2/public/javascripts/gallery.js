async function getPhotosInfoComments() {
  let json = await getPhotos();

  let photoTemplate = Handlebars.compile($('#photos').html());
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

  $('#comment_list').empty();
  $('#comment_list').append(commentsTemplate(data));

  return;
}

async function getPhotos() {
  let response = await fetch('http://localhost:3000/photos');
  let json = await response.json();
  return json;
}

function getPhotoInformation(photoObject) {
  let photoInformation = Handlebars.compile($('#photo_information').html());
  $('section > header').empty();
  $('section > header').append(photoInformation(photoObject));

  return;
}

function startPage() {
  getPhotosInfoComments();  
  return;
}

$(function() {
  let slideShow = {
    $show: $('#slideshow'),

    init: async function() {
      this.collection = await getPhotos();
      this.bind();
    },

    prevSlide: async function() {
      let $currentPhoto = this.$show.find('#slides figure:visible');
      let currentID = Number($currentPhoto.attr('data-id'));
      let nextID;
      let $nextPhoto;

      if (currentID === 1) {
        nextID = this.collection.length;
        $nextPhoto = this.$show.find(`#slides figure[data-id*=${this.collection.length}]`);
      } else {
        nextID = currentID - 1;
        $nextPhoto = $currentPhoto.prev();
      }

      collectionIndex = nextID - 1;

      $currentPhoto.fadeOut(300);
      $nextPhoto.fadeIn(300);

      await getPhotoInformation(this.collection[collectionIndex]);
      await getPhotoComments(this.collection[collectionIndex]['id']);
    },

    nextSlide: async function() {
      let $currentPhoto = this.$show.find('#slides figure:visible');
      let currentID = Number($currentPhoto.attr('data-id'));
      let nextID;
      let $nextPhoto;

      if (currentID === this.collection.length) {
        nextID = 1;
        $nextPhoto = this.$show.find('#slides figure[data-id*=1]');
      } else {
        nextID = currentID + 1;
        $nextPhoto = $currentPhoto.next();
      }

      collectionIndex = nextID - 1;

      $currentPhoto.fadeOut(300);
      $nextPhoto.fadeIn(300);

      await getPhotoInformation(this.collection[collectionIndex]);
      await getPhotoComments(this.collection[collectionIndex]['id']);
    },

    bind: function() {
      this.$show.find('a.prev').on('click', $.proxy(this.prevSlide, this));
      this.$show.find('a.next').on('click', $.proxy(this.nextSlide, this));
    },
  };

  startPage();
  slideShow.init();
})