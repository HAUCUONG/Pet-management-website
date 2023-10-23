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
const tableBodyEl = document.getElementById('tbody');
const btnCheck = document.getElementById('healthy-btn');
const btnCalcBMI = document.getElementById('calcBMI-btn');

let validate;
let healthyCheck = false;
let healthyPetArr;

// Hàm hiển thị dữ liệu thú cưng
const renderTableData = function (petArr) {
  tableBodyEl.innerHTML = '';
  petArr.forEach(function (pet) {
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
                <td>${pet.BMI}</td>
                <td>${displayTime(pet.date).slice(8, 10)}/${displayTime(
      pet.date
    ).slice(5, 7)}/${displayTime(pet.date).slice(0, 4)}
                </td>
                <td>
                  <button type='button' class='btn btn-danger' onclick="deletePet('${
                    pet.id
                  }')">Delete</button>
                </td>`;
    tableBodyEl.appendChild(row);
  });
};
renderTableData(petArr);

// Hàm xóa dữ liệu trên form sau khi nhấn nút submit
const clearInput = () => {
  petId.value = '';
  petName.value = '';
  petAge.value = '';
  petType.value = 'Select Type';
  petWeight.value = '';
  petLength.value = '';
  petColor.value = '#000000';
  petBreed.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Hàm xóa thú cưng
const deletePet = function (petId) {
  const isDelete = confirm('Are you sure?');
  if (isDelete) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage('petArr', petArr);
        renderTableData(petArr);
      }
    }
  }
};

// Hàm kiểm tra thú cưng có khỏe mạnh hay không
const isHealthy = function (petArr) {
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
      healthyPetArr.push(petArr[i]);
    }
  }
};

// Hiển thị Breed theo Type đã chọn
petType.addEventListener('click', function () {
  displayType();
});

// Validate dữ liệu hợp lệ
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
  if (petData.id.trim() === '') {
    alert('Please input for Pet ID');
    validate = false;
  }
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

  // ID không được trùng
  for (let i = 0; i < petArr.length; i++) {
    if (petData.id === petArr[i].id) {
      alert('ID must be unique!');
      validate = false;
      break;
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
    // Thêm thú cưng vào mảng petArr
    petArr.push(petData);
    // Lưu vào localstorage
    saveToStorage('petArr', petArr);
    // Xóa dữ liệu trên form
    clearInput();
    // Hiển thị thông tin thú cưng
    renderTableData(petArr);
  }
});

// Hiển thị thú cưng khỏe mạnh
btnCheck.addEventListener('click', function () {
  healthyCheck = healthyCheck === false ? true : false;
  if (healthyCheck) {
    btnCheck.textContent = 'Show All Pet';
    healthyPetArr = [];
    isHealthy(petArr);
    renderTableData(healthyPetArr);
  } else {
    btnCheck.textContent = 'Show Healthy Pet';
    renderTableData(petArr);
  }
});

// Tính toán chỉ số BMI
btnCalcBMI.addEventListener('click', function () {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].BMI =
      petArr[i].type === 'Dog'
        ? ((petArr[i].weight * 703) / petArr[i]['length'] ** 2).toFixed(2)
        : ((petArr[i].weight * 886) / petArr[i]['length'] ** 2).toFixed(2);
  }
  renderTableData(petArr);
});
