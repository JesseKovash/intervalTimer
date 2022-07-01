(function() {

  // export function savedIntervals() {
  function savedIntervals() {
    const savedIntEl = document.getElementById('saved-options');
    const savedDropEl = document.getElementById('saved');
    const intervals = JSON.parse(localStorage.allIntervals);
    const intervalHTML = intervals.map((oneInt, index)=> {
      return formatInterval(oneInt, index);
    });
    renderSaved(intervalHTML)

    function formatInterval(int, index) {
      let intContainer = document.createElement('div');
      let intOption = document.createElement('p');
      let deleteBtn = document.createElement('button');
      intContainer.classList.add('saved-int-container');
      deleteBtn.classList.add('delete-saved');
      intOption.classList.add(`${index}`);
      intOption.classList.add('saved-option');
      deleteBtn.textContent = 'DELETE';
      intOption.textContent = int.title;
      intContainer.append(intOption);
      intContainer.append(deleteBtn);
      return intContainer
    };

    function renderSaved(ints) {
      savedIntEl.innerHTML = '';
      savedIntEl.append(...ints)
    };

    function showSavedOptions() {
      savedIntEl.style.display = 'block';
    };

    savedDropEl.addEventListener('click', showSavedOptions);
  };


  document.addEventListener('DOMContentLoaded', savedIntervals);

})();
