'use strict';

const btnSubmit = document.getElementById('submit-btn');
const petId = document.getElementById('input-id');
const petName = document.getElementById('input-name');
const petAge = document.getElementById('input-age');
const petType = document.getElementById('input-type');
const petWeight = document.getElementById('input-weight');
const petLength = document.getElementById('input-length');
const petColor = document.getElementById('input-color-1');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const tableBodyEl = document.querySelector('#tbody');
const displayForm = document.querySelector('#container-form');

let validate;

// Hàm hiện form đã nhập sẵn dữ liệu cũ của thú cưng muốn edit
const editPet = function (id) {
  const pet = petArr.find(el => el.id === id);
  petId.value = id;
  petName.value = pet.pet_name;
  petAge.value = pet.age;
  petWeight.value = pet.weight;
  petLength.value = pet['length'];
  petColor.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  displayForm.classList.remove('hide');

  renderBreed(breedArr);
  petType.value = pet.type;
  displayType();
  petBreed.value = pet.breed;
};

// Hàm hiển thị dữ liệu hiện có
const renderEditTableData = function (petArr) {
  tableBodyEl.innerHTML = '';
  petArr.forEach(pet => {
    const row = document.createElement('tr');
    row.innerHTML = `
                <th scope='row'>${pet.id}</th>
                <td>${pet.pet_name}</td>
                <td>${pet.age}</td>
                <td>${pet.type}</td>
                <td>${pet.weight} kg</td>
                <td>${pet['length']} cm</td>
                <td>${pet.breed}</td>
                <td>
                  <i class='bi bi-square-fill' style='color: ${pet.color}'></i>
                </td>
                <td><i class='bi ${
                  pet.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
                }'></i></td>
                <td><i class='bi ${
                  pet.dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
                }'></i></td>
                <td><i class='bi ${
                  pet.sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
                }'></i></td>
                <td>${displayTime(pet.date).slice(8, 10)}/${displayTime(
      pet.date
    ).slice(5, 7)}/${displayTime(pet.date).slice(0, 4)}
                </td>
                <td>
                  <button type='button' class='btn btn-warning' onclick="editPet('${
                    pet.id
                  }')">Edit</button>
                </td>`;
    tableBodyEl.appendChild(row);
  });
};
renderEditTableData(petArr);

// Hiển thị Breed theo Type đã chọn
petType.addEventListener('click', function () {
  displayType();
});

// Cập nhật lại dữ liệu mới sau khi nhấn nút Submit
btnSubmit.addEventListener('click', function () {
  validate = true;
  const petData = {
    id: petId.value,
    pet_name: petName.value,
    age: petAge.value,
    type: petType.value,
    weight: petWeight.value,
    length: petLength.value,
    color: petColor.value,
    breed: petBreed.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    BMI: '?',
  };
  // Bắt buộc nhập đầy đủ các trường dữ liệu
  if (petData.pet_name.trim() === '') {
    alert('Please input for Pet Name');
    validate = false;
  }
  if (!petData.age) {
    alert('Please input for Age');
    validate = false;
  } else {
    if (petData.age < 1 || petData.age > 15) {
      alert('Age must be between 1 and 15!');
      validate = false;
    }
  }
  if (!petData.weight) {
    alert('Please input for Weight');
    validate = false;
  } else {
    if (petData.weight < 1 || petData.weight > 15) {
      alert('Weight must be between 1 and 15!');
      validate = false;
    }
  }
  if (!petData['length']) {
    alert('Please input for Length');
    validate = false;
  } else {
    if (petData['length'] < 1 || petData['length'] > 100) {
      alert('Length must be between 1 and 100!');
      validate = false;
    }
  }

  // Bắt buộc chọn Type
  if (petData.type === 'Select Type') {
    alert('Please select Type!');
    validate = false;
  }

  // Bắt buộc chọn Breed
  if (petData.breed === 'Select Breed') {
    alert('Please select Breed!');
    validate = false;
  }

  // Nếu dữ liệu hợp lệ
  if (validate) {
    // Cập nhật lại dữ liệu cho thú cưng đó
    const index = petArr.findIndex(pet => pet.id === petData.id);
    petData.date = petArr[index].date;
    petArr[index] = petData;
    // Lưu lại dữ liệu
    saveToStorage('petArr', petArr);
    // Ẩn form
    displayForm.classList.add('hide');
    // Hiển thị dữ liệu
    renderEditTableData(petArr);
  }
});
