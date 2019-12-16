async function getBookingDates() {
  let response = await fetch('http://localhost:3000/api/bookings');
  let json = await response.json();

  createListOfBookings(json);
}

async function getBookingDetails(date, parentTag) {
  let response = await fetch(`http://localhost:3000/api/bookings/${date}`);
  let json = await response.json();

  json = json.map((booking) => `${booking[0]} | ${booking[1]} | ${booking[2]}`);
  createDetailsForBooking(json, parentTag);
}

function createListOfBookings(bookings) {
  let content = document.getElementById('content');
  let list = document.createElement('ul');

  list.id = 'booking-list';

  bookings.forEach(function(listItem) {
    let item = document.createElement('li');

    item.textContent = listItem;
    item.addEventListener('click', function(e) {
      e.stopPropagation();

      if (e.target.children.length > 0) {
        removeDetailsForBooking(e.target);
      } else {
        getBookingDetails(e.target.textContent, e.target);
      }

      return;
    });

    list.appendChild(item);
  });

  content.appendChild(list);
  return;
}

function createDetailsForBooking(bookingArray, parentElement) {
  let detailList = document.createElement('ol');
  detailList.classList.add('detail-list');

  bookingArray.forEach(function(booking) {
    let item = document.createElement('li');
    item.classList.add('detail');
    item.textContent = booking;
    detailList.appendChild(item);
  });

  parentElement.appendChild(detailList);
  return;
}

function removeDetailsForBooking(parentTag) {
  let value = parentTag.textContent;
  let ol = parentTag.querySelector('ol');

  let child = ol.firstChild;

  while (child) {
    ol.removeChild(child);
    child = ol.firstChild;
  }

  parentTag.removeChild(ol);
  return;
}

document.addEventListener('DOMContentLoaded', function() {
  getBookingDates();
});