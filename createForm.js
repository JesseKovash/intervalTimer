(function() {

  if (!window.intervalTimerApp) {
    window.intervalTimerApp = {};
  }

  const formFunc = function() {
    const hideEl = window.intervalTimerApp.hideElement;
    const showEl = window.intervalTimerApp.showElement;
    const addIntBtn = document.getElementById('add-interval-btn');
    const saveBtn = document.getElementById('save-btn');
    const intContainer = document.getElementById('interval-container');
    const titleEl = document.getElementById('title');
    const formEl = document.getElementById('form');
    const formCreate = document.getElementById('create');
    const dropEl = document.getElementById('dropdown');
    const newIntTemplate = document.getElementById('one-int-template');

    function showForm() {
      showEl(formEl)
      hideEl(dropdown)
    }

    function addNewInterval(e) {
      e.preventDefault()
      const clone = newIntTemplate.content.cloneNode(true);
      intContainer.appendChild(clone)
    };

    function saveIntervals(e) {
      e.preventDefault()
      const allInts = document.querySelectorAll('.one-int') || [];
      const formattedInts = [...allInts].map((oneInt) => {
        return ({
          desc: oneInt.children[0].children[1]?.value,
          time: +oneInt.children[1].children[1]?.value * 60 + +oneInt.children[1].children[3].value
        })
      });
      const finalInts = {title: titleEl.value, intervals: formattedInts};
      hideEl(formEl)
      saveToLocal(finalInts)
    };

    function saveToLocal(newInt) {
      const clone = newIntTemplate.content.cloneNode(true);
      intContainer.innerHTML = '';
      intContainer.appendChild(clone)
      let getPrev = JSON.parse(localStorage.allIntervals);
      if (!getPrev || !Array.isArray(getPrev)) {
        localStorage.setItem('allIntervals', JSON.stringify([newInt]));
      } else {
        getPrev = JSON.stringify(getPrev.concat(newInt));
        localStorage.setItem('allIntervals', getPrev);
      }
      titleEl.value = '';
      window.intervalTimerApp.savedIntervals()
    }

    addIntBtn.addEventListener('click', (e)=>addNewInterval(e));
    saveBtn.addEventListener('click', (e)=>saveIntervals(e));
    formCreate.addEventListener('click', showForm);
  };

  document.addEventListener('DOMContentLoaded', formFunc);
  //reset local storage
  // localStorage.setItem('allIntervals', '[]')
})();
