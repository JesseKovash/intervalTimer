(function() {

  if (!window.intervalTimerApp) {
    window.intervalTimerApp = {};
  }

  function savedIntervals() {
    const savedIntEl = document.getElementById('saved-options');
    const savedDropEl = document.getElementById('saved');
    const startBtnEl = document.getElementById('start-btn');
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
      intContainer.classList.add(`index${index}`);
      deleteBtn.classList.add(`index${index}`);
      intOption.classList.add(`index${index}`);
      intOption.classList.add('saved-option');
      deleteBtn.textContent = 'DELETE';
      intOption.textContent = int.title;
      intContainer.append(intOption);
      intContainer.append(deleteBtn);
      intContainer.addEventListener('click', (e)=>setCurrentInterval(e));
      deleteBtn.addEventListener('click', (e)=>deleteCurrentInterval(e));
      return intContainer
    };

    function renderSaved(ints) {
      savedIntEl.innerHTML = '';
      savedIntEl.append(...ints)
    };

    function showSavedOptions() {
      savedIntEl.style.display = 'block';
    };

    function setCurrentInterval(e) {
      const targetClassIndex = +e.target.classList[1].substring(5);
      localStorage.setItem('currentInterval', JSON.stringify(intervals[targetClassIndex]));
      savedIntEl.style.display = 'none';
      startBtnEl.style.display = 'block';
    };

    function deleteCurrentInterval(e) {
      console.log('delete: ', e.target)
    };

    savedDropEl.addEventListener('click', showSavedOptions);
  };


  window.intervalTimerApp.savedIntervals = savedIntervals;
  document.addEventListener('DOMContentLoaded', savedIntervals);
})();
