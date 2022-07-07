(function() {

  if (!window.intervalTimerApp) {
    window.intervalTimerApp = {};
  }

  function savedIntervals() {
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spanPercent.textContent = '';
      titleEl.textContent = '';
      descEl.textContent = '';
      dropDownEl.style.display = 'none';
      cancelBtnEl.style.display = 'block';
      startBtnEl.style.display = 'block';
      resumeBtnEl.style.display = 'none';
    };

    function deleteCurrentInterval(e) {
      console.log('delete: ', e.target)
    };

    function cancelWorkout() {
      cancelBtnEl.style.display = 'none';
      startBtnEl.style.display = 'none';
      resumeBtnEl.style.display = 'none';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      spanPercent.textContent = '';
      titleEl.textContent = '';
      descEl.textContent = '';
    };

    savedDropEl.addEventListener('click', showSavedOptions);
    cancelBtnEl.addEventListener('click', cancelWorkout);
  };


  window.intervalTimerApp.savedIntervals = savedIntervals;
  document.addEventListener('DOMContentLoaded', savedIntervals);
})();
