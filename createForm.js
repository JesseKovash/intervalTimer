(function() {

  const formFunc = function() {
    const addIntBtn = document.getElementById('add-interval-btn');
    const saveBtn = document.getElementById('save-btn');
    const intContainer = document.getElementById('interval-container');
    const titleEl = document.getElementById('title');
    const newIntHTML =
     '<div class="one-int">\
        <label>Interval Description (optional)</label>\
        <input type="text" id="interval">\
       <label>Time in Minutes</label>\
       <input type="number" min="0" max="60" value="0">\
       <label>Time in Seconds</label>\
        <input type="number" min="0" max="59" value="0">\
      </div>';

    function addNewInterval(e) {
      e.preventDefault()
      intContainer.insertAdjacentHTML('beforeend', newIntHTML);
    };

    function saveIntervals(e) {
      e.preventDefault()
      const allInts = document.querySelectorAll('.one-int');
      const formattedInts = [...allInts].map((oneInt) => {
        return ({
          desc: oneInt.children[1].value,
          time: +oneInt.children[3].value * 60 + +oneInt.children[5].value
        })
      });
      const finalInts = {title: titleEl.value, Intervals: formattedInts};
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
    }

    addIntBtn.addEventListener('click', (e)=>addNewInterval(e));
    saveBtn.addEventListener('click', (e)=>saveIntervals(e));
  };

  document.addEventListener('DOMContentLoaded', formFunc);
  //reset local storage
  // localStorage.setItem('allIntervals', '[]')
})();
