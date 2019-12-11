async function getSchedules() {
  let schedules = await fetch('http://localhost:3000/api/schedules')
  .then(request => request.json())
  .then(json => getAvailableSchedules(json))
  .then(schedules => convertStaffAndCount(schedules))
  .then(schedules => appendParagraphs(schedules))
  .catch(err => console.error(err));

  return;
}

function getAvailableSchedules(allSchedules) {
  return allSchedules.filter((schedule) => schedule.student_email === null);
}

function convertStaffAndCount(allSchedules) {
  let staffCounts = {};

  allSchedules.forEach(function(schedule) {
    if (!staffCounts[schedule.staff_id]) {
      staffCounts[schedule.staff_id] = 0;
    }

    staffCounts[schedule.staff_id] += 1;
  });

  return staffCounts;
}

function appendParagraphs(schedules) {
  staffIDS = Object.keys(schedules);

  staffIDS.forEach(function(id) {
    let idParagraph = document.createElement('p');
    idParagraph.textContent = `The Staff member with ID #${id} has ${schedules[id]} spots available.`;
    document.getElementById('content').appendChild(idParagraph);
  });

  return;
}

document.addEventListener('DOMContentLoaded', function(e) {
  getSchedules();
});