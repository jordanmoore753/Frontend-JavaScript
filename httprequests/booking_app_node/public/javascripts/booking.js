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

  let scheduleID = getScheduleID(availableSchedules, optionValues);
  let values = {
    student_email: email,
    id: scheduleID,
  };

  fetch('http://localhost:3000/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values)
  })
  .then(function(response) {
    if (response.status === 204) {
      alert('Successfully created booking.');
      addStudentForm();
      return;
    } else {
      return response.text();
    }
  })
  .then(function(resolved) {
    if (typeof resolved === 'string') {
      alert(resolved);
      let arr = resolved.split(' ');
      let sequence = Number(arr[arr.length - 1]);
      createStudentForm(sequence, email);     
    }

    return; 
  })
  .catch(err => console.log(err));
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

function createStudentForm(bookingSequence, email) {
  let firstSubmit = document.getElementById('bookingSubmit');
  let form = document.createElement('form');
  let secondDiv = document.getElementById('content-two');

  form.id = 'studentForm';
  firstSubmit.disabled = true;

  let emailInput = document.createElement('input');
  let bookingInput = document.createElement('input');
  let nameInput = document.createElement('input');
  let submitInput = document.createElement('input');

  [emailInput, bookingInput].forEach((element) => element.disabled = true);

  emailInput.type = 'text';
  bookingInput.type = 'number';
  submitInput.type = 'submit';

  emailInput.value = email;
  bookingInput.value = bookingSequence;
  submitInput.value = 'Create Student And Book Schedule';

  nameInput.type = 'text';
  nameInput.maxLength = '30';
  nameInput.required = true;

  nameInput.id = 'nameInput';
  emailInput.id = 'emailInput';
  bookingInput.id = 'bookingInput';
  submitInput.id = 'studentSubmit';
  
  [emailInput, nameInput, bookingInput, submitInput].forEach((element) => form.appendChild(element));
  secondDiv.appendChild(form);

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let firstSubmit = document.getElementById('bookingSubmit');
    let select = document.querySelector('select').value;
    let inputs = Array.from(form.querySelectorAll('input'));
    let secondDiv = document.getElementById('content-two');
    let data = {
      booking_sequence: inputs[2].value,
      email: inputs[0].value,
      name: inputs[1].value,
    };

    fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(function(response) {
      if (response.status === 201) {
        alert('Student successfully created.');
        return bookSchedule(data.email, select);
      } else {
        alert(response.text());
        return;
      }
    })
    .catch(err => console.log(err));

    firstSubmit.disabled = false;
    secondDiv.removeChild(form);
  });

  return;
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