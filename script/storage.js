'use strict';

const petBreed = document.querySelector('#input-breed');

// Hàm lưu dữ liệu
const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// Hàm lấy dữ liệu
const getFromStorage = function (key, def) {
  return JSON.parse(localStorage.getItem(key)) ?? def;
};

const petArr = getFromStorage('petArr', []);
const breedArr = getFromStorage('breedArr', []);
// localStorage.removeItem('petArr');
// localStorage.removeItem('breedArr');

// Hàm hiển thị thời gian
const displayTime = function (date) {
  if (typeof date === 'string') return date;
  else if (typeof date === 'object') return JSON.parse(JSON.stringify(date));
};

// Hmà hiển thị Breed theo từng Type
const displayType = function () {
  if (petType.value === 'Dog')
    renderBreed(breedArr.filter(breed => breed.type === 'Dog'));
  if (petType.value === 'Cat')
    renderBreed(breedArr.filter(breed => breed.type === 'Cat'));
};

// Hmà hiển thị Breed
const renderBreed = function (breedArr) {
  petBreed.innerHTML = '<option>Select Breed</option>';
  breedArr.forEach(breed => {
    const options = document.createElement('option');
    options.innerHTML = `${breed.name}`;
    petBreed.appendChild(options);
  });
};

// Thêm animation vào sidebar
const sideBar = document.querySelector('#sidebar');

sideBar.addEventListener('click', function () {
  this.classList.toggle('active');
});
