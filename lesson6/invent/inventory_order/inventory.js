let inventory;

(function() {
  let lastId = 0;

  inventory = {
    collection: [],

    setDate: function() {
      let $date = $('#order_date');
      let currentDate = new Date();
      $date.text(currentDate.toUTCString());
      return;
    },

    cacheTemplate: function() {
      this.inventoryTemplate = Handlebars.compile($('#inventory_item').html());
      this.inventoryTemplate.bind(this);
    },

    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },

    addItem: function() {
      let defaultObj = {
        id: lastId,
        name: undefined,
        stockNumber: undefined,
        quantity: 1,
      };

      $('#inventory').append(this.inventoryTemplate(defaultObj));

      this.collection.push(defaultObj);
      lastId += 1;
    },

    deleteItem: function(e) {
      e.preventDefault();
      let $row = $(e.target).parent().parent();
      let id = Number($row.children()[0].children[0].name.split('_')[2]);

      let idString = `item_id_${id}`;
      let idToDelete = this.getItemIndex(id);

      $row.remove();
      this.collection.splice(idToDelete, 1);
    },

    updateItem: function(e) {
      let itemData = e.target;
      itemData = getDataFromName(itemData);

      let currentItem = this.getItem(itemData.id);
      currentItem[itemData.property] = itemData['value'];
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
    },

    bindEvents: function() {
      $('#add_item').on('click', $.proxy(this.addItem, this));
      $('#inventory').on('blur', 'input', $.proxy(this.updateItem, this));
      $('#inventory').on('click', 'a.delete', $.proxy(this.deleteItem, this));
    },
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
