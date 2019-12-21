let inventory;

(function() {
  inventory = {
    collection: [],
    lastId: 0,

    setDate: function() {
      let $date = $('#order_date');
      let currentDate = new Date();
      $date.text(currentDate.toUTCString());
      return;
    },

    cacheTemplate: function() {
      let $i_tmpl = $('#inventory_item').remove();
      this.template = $i_tmpl.html();
    },

    init: function() {
      this.setDate();
      this.cacheTemplate();
    },

    addItem: function() {
      let newItemHTML = this.template;
      let defaultObj = {
        id: this.lastId,
        name: undefined,
        stockNumber: undefined,
        quantity: 1,
      };

      newItemHTML = newItemHTML.replace(/ID/g, this.lastId);
      $('#inventory').append(newItemHTML);

      this.collection.push(defaultObj);
      this.lastId += 1;
    },

    deleteItem: function(id, row) {
      let idString = `item_id_${id}`;
      let idToDelete = this.getItemIndex(id);

      row.remove();
      this.collection.splice(idToDelete, 1);
    },

    updateItem: function(data) {
      currentItem = this.getItem(data.id);

      currentItem[data.property] = data['value'];
    },

    getItem: function(id) {
      let currentItem;
      let that = this;

      for (let i = 0; i < this.collection.length; i += 1) {
        if (that.collection[i].id === id) {
          currentItem = that.collection[i];
          break;
        }
      }

      return currentItem;
    },

    getItemIndex: function(id) {
      let index;
      let that = this;

      for (let i = 0; i < this.collection.length; i += 1) {
        if (that.collection[i].id === id) {
          index = i;
          break;
        }
      }

      return index;      
    }
  };
})();

function getDataFromName(input) {
  let propertyAndID = input.name.split('_').slice(1);
  let newValue = input.value;

  if (propertyAndID.length > 2) {
    propertyAndID[0] = propertyAndID[0] + propertyAndID[1][0].toUpperCase() + propertyAndID[1].slice(1);
    propertyAndID.splice(1, 1);
  } 

  return {
    property: propertyAndID[0],
    id: Number(propertyAndID[1]),
    value: newValue, 
  };
}

$(inventory.init.bind(inventory));

$(function() {
  $('#inventory').on('blur', 'input', function(e) {
    let itemData = getDataFromName(e.target);
    inventory.updateItem(itemData);
  });

  $('#inventory').on('click', 'a', function(e) {
    let $row = $(e.target).parent().parent();
    let id = Number($row.children()[0].children[0].name.split('_')[2]);
    inventory.deleteItem(id, $row);
  });
});