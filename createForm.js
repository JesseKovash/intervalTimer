window.onload = function() {
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
    console.log(finalInts)
  };

  function saveToLocal(newInt) {
    const getPrev = localStorage.getItem('allIntervals');
    if (!getPrev) {
      localStorage.setItem('allIntervals', JSON.stringify(newInt));
    } else {
      const allInts = JSON.parse(getPrev).push(newInt);
    }
  }

  addIntBtn.addEventListener('click', (e)=>addNewInterval(e));
  saveBtn.addEventListener('click', (e)=>saveIntervals(e));
};