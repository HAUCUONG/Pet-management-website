'use strict';

const btnExport = document.querySelector('#export-btn');
const btnImport = document.querySelector('#import-btn');
const fileInput = document.querySelector('#input-file');

// Hàm lưu dữ liệu về máy
const saveDynamicDataToFile = function () {
  const blob = new Blob([JSON.stringify(petArr)], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(blob, 'PETDATA.json');
};

// Bắt sự kiện vào nút Export
btnExport.addEventListener('click', function () {
  const isExport = confirm('Are you sure?');
  if (isExport) saveDynamicDataToFile();
});

// Bắt sự kiện vòa nút Import
btnImport.addEventListener('click', function () {
  if (!fileInput.value) alert('Please select file!');
  else {
    const isImport = confirm('Are you sure?');
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      // Tải dữ liệu từ file lên
      reader.addEventListener(
        'load',
        function () {
          const fileContent = JSON.parse(reader.result);

          fileContent.forEach(obj => {
            const duplicated = petArr.findIndex(pet => pet.id === obj.id);
            if (duplicated !== -1) petArr.splice(duplicated, 1, obj);
            else petArr.push(obj);
            saveToStorage('petArr', petArr);

            // Nếu file import có loại Breed mà breedArr chưa có thì thêm Breed đó vào breedArr
            if (breedArr.every(breed => breed.name !== obj.breed)) {
              const addBreed = {
                name: obj.breed,
                type: obj.type,
              };
              breedArr.push(addBreed);
              saveToStorage('breedArr', breedArr);
            }
          });
          alert('Import thành công!');
        },
        false
      );

      // Đọc dữ liệu
      if (file) reader.readAsText(file);

      // Reset lại fileInput
      fileInput.value = '';
    }
  }
});
