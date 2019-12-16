async function cancelBooking(bookingID) {
  let response = await fetch(`http://localhost:3000/api/bookings/${bookingID}`, {
    method: 'PUT',
  });

  let result = await response.text();

  return result.length === 0 ? alert('Booking cancelled.') : alert(result);
}

async function cancelSchedule(scheduleID) {
  let response = await fetch(`http://localhost:3000/api/schedules/${scheduleID}`, {
    method: 'DELETE',
  });

  let result = await response.text();

  return result.length === 0 ? alert('Schedule cancelled.') : alert(result);
}

document.addEventListener('DOMContentLoaded', function() {
  let s = document.querySelector('input');
  let f = document.querySelector('button');

  s.addEventListener('click', function(e) {
    e.preventDefault();
    cancelBooking(3);
  });

  f.addEventListener('click', function(e) {
    e.preventDefault();
    cancelSchedule(2);
  });
});