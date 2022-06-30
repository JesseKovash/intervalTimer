window.onload = function() {
  const dropDown = document.getElementById('dropdown');
  const dropDownBtn = document.getElementById('dropdown-btn');

  function showOptions() {
    const currDisplay = dropDown.style.display;
    currDisplay === 'none' || currDisplay === '' ?
      dropDown.style.display = 'block' :
      dropDown.style.display = 'none'
  }

  dropDownBtn.addEventListener('click', showOptions);
};