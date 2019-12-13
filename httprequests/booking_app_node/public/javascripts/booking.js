async function addStudentForm() {
  let scheduleResponse = await fetch('http://localhost:3000/api/schedules');
  let scheduleJson = await scheduleResponse.json();
  let staffResponse = await(fetch('http://localhost:3000/api/staff_members'));
  let staffJson = await staffResponse.json();

  let availableSchedules = scheduleJson.filter((schedule) => schedule.student_email === null);
  let formattedSchedules = availableSchedules.map(function(schedule) {
    let currentStaff = staffJson.filter((obj) => obj.id === schedule.staff_id)[0];
    return {
      name: currentStaff.name,
      date: schedule.date,
      time: schedule.time,
    };
  });

  // console.log(formattedSchedules);
  // console.log(availableSchedules);

  createSelectElement(formattedSchedules);
  return;
}

async function bookSchedule(email, select) {
  let scheduleResponse = await fetch('http://localhost:3000/api/schedules');
  let scheduleJson = await scheduleResponse.json();
  let staffResponse = await fetch('http://localhost:3000/api/staff_members');
  let staffJson = await staffResponse.json();
  let availableSchedules = scheduleJson.filter((schedule) => schedule.student_email === null);
  let staffName = select.split('|')[0].trim();
  let staffID = staffJson.filter((member) => member.name === staffName)[0].id;

  let optionValues = {
    staff_id: staffID,
    date: select.split('|')[1].trim(),
    time: select.split('|')[2].trim(),
  };

  return studentEmailExists(email)
  .then(function(boolean) {
    if (boolean) {
      let scheduleID = getScheduleID(availableSchedules, optionValues);
      let values = {
        'object': [ { id: scheduleID, 
          email: email
        }],
      };

      console.log(email);
      fetch('http://localhost:3000/api/schedules', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      })
      .then(response => console.log(response.text()))
      .catch(err => console.log(err));
      // put
    } else {
      // create new form
    }
  })
  .catch(err => console.error(err));
}

async function studentEmailExists(email) {
  return fetch('http://localhost:3000/api/students')
        .then(response => response.json())
        .then(json => json.some((student) => student.email === email))
        .catch(err => console.error(err));
}

function createSelectElement(formattedSchedules) {
  let firstSelect = document.querySelector('select');
  let form = document.getElementById('scheduleForm');
  let select = document.createElement('select');
  select.name = 'schedule';

  formattedSchedules.forEach(function(schedule) {
    let option = document.createElement('option');
    option.textContent = `${schedule.name} | ${schedule.date} | ${schedule.time}`;
    select.appendChild(option);
  });

  form.replaceChild(select, firstSelect);
}

function getScheduleID(available, optionValues) {
  let remainingSchedules = available.filter((schedule) => schedule.date === optionValues.date && schedule.time === optionValues.time);
  return remainingSchedules.filter((schedule) => schedule.staff_id === optionValues.staff_id)[0].id;
} 

document.addEventListener('DOMContentLoaded', function() {
  addStudentForm();
  let submitForm = document.getElementById('scheduleForm');

  submitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = document.getElementById('email_input').value;
    let select = document.querySelector('select').value;
    bookSchedule(email, select);
  });
});