'use strict';

const findId = document.querySelector('#input-id');
const findName = document.querySelector('#input-name');
const findType = document.querySelector('#input-type');
const findBreed = document.querySelector('#input-breed');
const findVaccinated = document.querySelector('#input-vaccinated');
const findDewormed = document.querySelector('#input-dewormed');
const findSterilized = document.querySelector('#input-sterilized');
const btnFind = document.querySelector('#find-btn');
const tableBodyEl = document.querySelector('#tbody');

renderBreed(breedArr);

// Hàm hiển thị thú cưng muốn tìm kiếm
const renderSearchTableData = function (petArr) {
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
                </td>`;
    tableBodyEl.appendChild(row);
  });
};
renderSearchTableData(petArr);

// Tìm thú cưng thỏa các yêu cầu tìm kiếm sau khi nhấn nút Find
btnFind.addEventListener('click', function () {
  const findPetData = {
    id: findId.value,
    name: findName.value,
    type: findType.value,
    breed: findBreed.value,
    vaccinated: findVaccinated.checked,
    dewormed: findDewormed.checked,
    sterilized: findSterilized.checked,
  };
  let petArrSearch = petArr;
  if (findPetData.id)
    petArrSearch = petArrSearch.filter(pet => pet.id.includes(findPetData.id));
  if (findPetData.name)
    petArrSearch = petArrSearch.filter(pet =>
      pet.pet_name.includes(findPetData.name)
    );
  if (findPetData.type !== 'Select Type')
    petArrSearch = petArrSearch.filter(pet => pet.type === findPetData.type);
  if (findPetData.breed !== 'Select Breed')
    petArrSearch = petArrSearch.filter(pet => pet.breed === findPetData.breed);
  if (findPetData.vaccinated === true)
    petArrSearch = petArrSearch.filter(pet => pet.vaccinated === true);
  if (findPetData.dewormed === true)
    petArrSearch = petArrSearch.filter(pet => pet.dewormed === true);
  if (findPetData.sterilized === true)
    petArrSearch = petArrSearch.filter(pet => pet.sterilized === true);

  renderSearchTableData(petArrSearch);
});
