'use strict';

const tableBodyEl = document.querySelector('#tbody');
const btnSubmit = document.querySelector('#submit-btn');
const inputBreed = document.querySelector('#input-breed');
const inputType = document.querySelector('#input-type');

let validate;

// Hàm hiển thị các loại Breed
const renderBreedData = function (breedArr) {
  tableBodyEl.innerHTML = '';
  breedArr.forEach(function (pet, i) {
    const row = document.createElement('tr');
    row.innerHTML = `
                <td scope='row'>${i + 1}</td>
                <td>${pet.name}</td>
                <td>${pet.type}</td>
                <td>
                  <button type='button' class='btn btn-danger' onclick="deleteBreed('${
                    pet.name
                  }')">Delete</button>
                </td>`;
    tableBodyEl.appendChild(row);
  });
};
renderBreedData(breedArr);

// Hàm xóa dữ liệu trên form sau khi nhập
const clearInput = () => {
  inputBreed.value = '';
  inputType.value = 'Select Type';
};

// Hàm xóa Breed
const deleteBreed = function (breed) {
  const isDelete = confirm('Are you sure?');
  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].name) {
        breedArr.splice(i, 1);
        saveToStorage('breedArr', breedArr);
        renderBreedData(breedArr);
      }
    }
  }
};

// Hiển thị loại Breed mới sau khi nhấn nút Submit
btnSubmit.addEventListener('click', function () {
  validate = true;
  const breedData = {
    name: inputBreed.value,
    type: inputType.value,
  };
  // Bắt buộc nhập đầy đủ các trường dữ liệu
  if (breedData.name.trim() === '') {
    alert('Please input for Breed');
    validate = false;
  }
  if (breedData.type.trim() === 'Select Type') {
    alert('Please input for Type');
    validate = false;
  }

  // Nếu dữ liệu hợp lệ
  if (validate) {
    // Thêm loại Breed vào mảng breeedArr
    breedArr.push(breedData);
    // Lưu dữ liệu vào localstorage
    saveToStorage('breedArr', breedArr);
    // Xóa dữ liệu trên form
    clearInput();
    // Hiển thị loại Breed vừa thêm
    renderBreedData(breedArr);
  }
});
