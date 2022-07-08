(function() {

  if (!window.intervalTimerApp) {
    window.intervalTimerApp = {};
  }

  function savedIntervals() {
    const cancelWorkout = window.intervalTimerApp.cancelWorkout;
    const formEl = document.querySelector('form');
    const savedOptionsEl = document.getElementById('saved-options');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const spanPercent = document.getElementById('percent');
    const titleEl = document.getElementById('int-title');
    const descEl = document.getElementById('int-desc');
    const savedIntEl = document.getElementById('saved-options');
    const savedDropEl = document.getElementById('saved');
    const startBtnEl = document.getElementById('start-btn');
    const resumeBtnEl = document.getElementById('resume-btn');
    const cancelBtnEl = document.getElementById('cancel-btn');
    const dropDownEl = document.getElementById('dropdown');
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
      intOption.classList.add('saved-option');
      intContainer.classList.add(`index${index}`);
      deleteBtn.classList.add(`index${index}`);
      intOption.classList.add(`index${index}`);
      deleteBtn.textContent = 'DELETE';
      intOption.textContent = int.title;
      intContainer.append(intOption);
      intContainer.append(deleteBtn);
      intContainer.addEventListener('click', (e)=>setCurrentInterval(e));
      deleteBtn.addEventListener('click', (e)=>deleteCurrentInterval(e));
      return intContainer
    };

    function renderSaved(ints) {
      const closeEl = '<button type="button" class="close-btn" data-action="close-saved">\
                        <svg id="close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 close" fill="none" viewBox="0 0 24 24"\ stroke="currentColor" stroke-width="2">\
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />\
                        </svg>\
                      </button>';
      savedIntEl.innerHTML = '';
      savedIntEl.append(...ints)
      savedIntEl.insertAdjacentHTML('beforeend', closeEl);
      const closeElems = document.querySelectorAll('[data-action="close-saved"]');
      closeElems.forEach((elem) => {
        elem.addEventListener('click', closeCurrent);
      });
    };

    function showSavedOptions() {
      savedIntEl.style.display = 'block';
      dropDownEl.style.display = 'none';
    };

    function closeCurrent() {
      savedOptionsEl.style.display = 'none';
      formEl.style.display = 'none';
    }

    function setCurrentInterval(e) {
      console.log(e.target)
      const targetClassIndex = +e.target.classList[1].substring(5);
      localStorage.setItem('currentInterval', JSON.stringify(intervals[targetClassIndex]));
      savedIntEl.style.display = 'none';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spanPercent.textContent = '';
      titleEl.textContent = '';
      descEl.textContent = '';
      cancelBtnEl.style.display = 'block';
      startBtnEl.style.display = 'block';
      resumeBtnEl.style.display = 'none';
    };

    function deleteCurrentInterval(e) {
      console.log('delete: ', e.target)
    };

    savedDropEl.addEventListener('click', showSavedOptions);
    cancelBtnEl.addEventListener('click', cancelWorkout);
  };


  window.intervalTimerApp.savedIntervals = savedIntervals;
  document.addEventListener('DOMContentLoaded', savedIntervals);
})();
