function createShape(shape, x, y, eX, eY) {
  let element = document.createElement('div');
  let canvas = document.getElementById('canvas');
  let id = canvas.children.length + 1;

  shape = shape.toLowerCase();
  element.classList.add(`${shape}`);
  element.style.left = String(x) + 'px';
  element.style.top = String(y) + 'px';

  element.setAttribute('data-id', id);
  animations[id] = {
    left: eX,
    top: eY,
  };

  canvas.appendChild(element);
}

let animations = {};

$(function() {
  $('form').on('submit', function(e) {
    e.preventDefault();

    let shape = $(this).find('input[type~=radio]').filter(function() {
      return $(this)[0].checked === true;
    })[0].value;

    let coordinates = $(this).find('input[type~=number]');

    let startingX = coordinates[0].value;
    let startingY = coordinates[1].value;
    let endingX = coordinates[2].value;
    let endingY = coordinates[3].value;

    createShape(shape, startingX, startingY, endingX, endingY);
  });

  $('#starter').on('click', function(e) {
    e.preventDefault();

    let animationKeys = Object.keys(animations);
    let allShapes = $('#canvas div');

    allShapes.each(function(index) {
      let currentIndex = index + 1;
      let formerLeft = $(this).css('left');
      let formerTop = $(this).css('top');
      let newLeft = String(animations[currentIndex].left) + 'px';
      let newTop = String(animations[currentIndex].top) + 'px';

      $(this).animate({
        left: newLeft,
        top: newTop,
      }, 2000, 'linear');
    });

    return;
  });

  $('#stopper').on('click', function(e) {
    e.preventDefault();

    $('#canvas div').stop(true, false);

    return;
  });
});