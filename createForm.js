(function() {

  const formFunc = function() {
    // import savedIntervals from "./savedIntervals.js";
    const addIntBtn = document.getElementById('add-interval-btn');
    const saveBtn = document.getElementById('save-btn');
    const intContainer = document.getElementById('interval-container');
    const titleEl = document.getElementById('title');
    const formEl = document.getElementById('form');
    const formCreate = document.getElementById('create');
    const dropEl = document.getElementById('dropdown');
    const newIntHTML =
       '<div class="one-int">\
          <div class="desc-container">\
            <label>Interval Description <label>\
            <input type="text" id="interval" maxlength="25" value="">\
          </div>\
          <div class="time-container">\
            <label>Time in Minutes</label>\
            <input type="number" min="0" max="60" value="0">\
            <label>Time in Seconds</label>\
            <input type="number" min="0" max="59" value="0">\
          </div>\
        </div>';

    function showForm() {
      formEl.style.display = 'block';
      dropdown.style.display = 'none';
    }

    function addNewInterval(e) {
      e.preventDefault()
      intContainer.insertAdjacentHTML('beforeend', newIntHTML);
    };

    function saveIntervals(e) {
      e.preventDefault()
      const allInts = document.querySelectorAll('.one-int');
      const formattedInts = [...allInts].map((oneInt) => {
        console.log(oneInt.children[0].children[1])
        return ({
          desc: oneInt.children[0].children[1].value,
          time: +oneInt.children[1].children[1].value * 60 + +oneInt.children[1].children[3].value
        })
      });
      const finalInts = {title: titleEl.value, intervals: formattedInts};
      formEl.style.display = 'none';
      saveToLocal(finalInts)
    };

    function saveToLocal(newInt) {
      let getPrev = JSON.parse(localStorage.allIntervals);
      if (!getPrev || !Array.isArray(getPrev)) {
        localStorage.setItem('allIntervals', JSON.stringify([newInt]));
      } else {
        getPrev = JSON.stringify(getPrev.concat(newInt));
        localStorage.setItem('allIntervals', getPrev);
      }
      intContainer.innerHTML = newIntHTML;
      titleEl.value = '';
      savedIntervals()
    }

    addIntBtn.addEventListener('click', (e)=>addNewInterval(e));
    saveBtn.addEventListener('click', (e)=>saveIntervals(e));
    formCreate.addEventListener('click', showForm);
  };

  document.addEventListener('DOMContentLoaded', formFunc);
  //reset local storage
  // localStorage.setItem('allIntervals', '[]')
})();
