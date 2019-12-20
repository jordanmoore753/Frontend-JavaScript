const json = [{
  "title": "The Legend of Zelda: Majora's Mask 3D",
  "id": 1,
  "category": "Nintendo 3DS"
}, {
  "title": "Super Smash Bros.",
  "id": 2,
  "category": "Nintendo 3DS"
}, {
  "title": "Super Smash Bros.",
  "id": 3,
  "category": "Nintendo WiiU"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 4,
  "category": "Nintendo WiiU"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 5,
  "category": "Xbox One"
}, {
  "title": "LEGO Batman 3: Beyond Gotham",
  "id": 6,
  "category": "PlayStation 4"
}, {
  "title": "Far Cry 4",
  "id": 7,
  "category": "PlayStation 4"
}, {
  "title": "Far Cry 4",
  "id": 8,
  "category": "Xbox One"
}, {
  "title": "Call of Duty: Advanced Warfare",
  "id": 9,
  "category": "PlayStation 4"
}, {
  "title": "Call of Duty: Advanced Warfare",
  "id": 10,
  "category": "Xbox One"
}];

let selectedConsoles = {
  'Nintendo 3DS': false,
  'Nintendo WiiU': false,
  'PlayStation 4': false,
  'Xbox One': false,
};

function updateList() {
  let listItems = $('#games li');

  listItems.each(function() {
    let $item = $(this);
    let gameInfo = json.filter((object) => String(object['id']) === $item.attr('data-info'))[0];
    
    return selectedConsoles[gameInfo['category']] ? $item.toggle(true) : $item.toggle(false);
  });
}

$(function() {
  let $checkboxes = $('#checkboxes input');

  $checkboxes.on('change', function(e) {
    if (e.target.checked) {
      selectedConsoles[e.target.value] = true;
    } else {
      selectedConsoles[e.target.value] = false;
    }

    updateList();
  });

  updateList();
});