function addForm() {
  let form = document.createElement('form');
  let div = document.getElementById('content');
  let btn = document.getElementById('btn');

  form.action = 'http://localhost:3000/api/schedules';
  form.method = 'post';

  let nameSelect = document.createElement('select');
  let dateInput = createDate();
  let timeInput = createTime();

  let nameLabel = document.createElement('label');
  let timeLabel = document.createElement('label');
  let dateLabel = document.createElement('label');

  nameSelect.name = 'name';
  nameLabel.textContent = 'Name';
  timeLabel.textContent = 'Time';
  dateLabel.textContent = 'Date';

  fetch('http://localhost:3000/api/staff_members')
  .then(request => request.json())
  .then(function(members) {
    members.forEach(function(memberObj) {
      let option = document.createElement('option');
      option.textContent = memberObj.name;
      nameSelect.appendChild(option);
    });

    form.appendChild(nameLabel);
    form.appendChild(nameSelect);
    form.appendChild(dateLabel);
    form.appendChild(dateInput);
    form.appendChild(timeLabel);
    form.appendChild(timeInput);
    btn.insertAdjacentElement('beforebegin', form);
    return;
  });
  
  return;
}

function createDate() {
  let dateInput = document.createElement('input'); 

  dateInput.name = 'date';
  dateInput.required = true;
  dateInput.type = 'text'
  dateInput.pattern = '[0-9][0-9][-][0-9][0-9][-][0-9][0-9]';
  dateInput.placeholder = '00-00-00';

  return dateInput;
}

function createTime() {
  let timeInput = document.createElement('input');

  timeInput.name = 'time';
  timeInput.required = true;
  timeInput.placeholder = '00:00';
  timeInput.type = 'text';
  timeInput.pattern = '[0-2][0-9][:][0-5][0-9]';

  return timeInput;
}

document.addEventListener('DOMContentLoaded', function(e) {
  let adder = document.getElementById('add');
  let submit = document.getElementById('btn');
  let content = document.getElementById('content');

  adder.addEventListener('click', function(e) {
    e.preventDefault();
    addForm();
  });

  submit.addEventListener('click', function(e) {
    e.preventDefault();

    let allForms = content.querySelectorAll('form');
    allForms = Array.from(allForms);
    allForms = allForms.map(function(element) {
      return {
        name: element[0].value,
        date: element[1].value,
        time: element[2].value,
      };
    });

    fetch('http://localhost:3000/api/staff_members')
    .then(request => request.json())
    .then(function(staffMembers) {
      let json = [];

      allForms.forEach(function(object) {
        let currentMember = staffMembers.filter((obj) => obj.name === object.name)[0];

        json.push({
          staff_id: currentMember.id,
          date: object.date,
          time: object.time,
        });
      }); 

      return { schedules: json };    
    })
    .then(function(object) {
      return fetch('http://localhost:3000/api/schedules', {
        method: 'POST',
        body: JSON.stringify(object),
      });
    })
    .then(request => console.log(request))
    .catch(err => console.log(err));
  });

  addForm();
});