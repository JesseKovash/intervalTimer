(function() {
  if (!localStorage.allIntervals) localStorage.allIntervals= "[]";
  const initTimer = function() {
    const body = document.querySelector('body');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const spanPercent = document.getElementById('percent');
    const titleEl = document.getElementById('int-title');
    const descEl = document.getElementById('int-desc');
    const help = document.getElementById('help');
    const formEl = document.querySelector('form');
    const helpEl = document.getElementById('help-container');
    const savedIntEl = document.getElementById('saved-options');
    const dropDownEl = document.getElementById('dropdown');
    const bannerEl = document.getElementById('banner');
    const startAudio = document.getElementById('start-audio');
    const nextAudio = document.getElementById('next-audio');
    const completeAudio = document.getElementById('complete-audio');
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('intervalAppTheme') ? localStorage.getItem('intervalAppTheme') : null;
    let intervals = [];
    let intervalIndex = 1;
    let workout;
    let totalTime = 0;
    let totalTimeCount = totalTime * 5;
    let overallDegrees = 0;
    let overallCount = 0;
    let posX = canvas.width / 2;
    let posY = canvas.height / 2;
    let fps = 200;
    let degrees = 0;
    let percent = 0;
    let onePercent = 360 / 100;
    let result = onePercent * 64;
    let currIndex;
    let arcInterval;
    let count;

    //set Theme
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
      if (currentTheme === 'light') {
          toggleSwitch.checked = true;
      }
    }

    function retrieveInts() {
      workout = JSON.parse(localStorage.currentInterval);
      intervals = workout.intervals;
      overallCount = 0;
      totalTime = workout?.intervals?.reduce((prev, num)=>{
        return prev + num.time
      }, 0) || 0;
      totalTimeCount = totalTime * 5;
    }

    function newInterval(index=0) {
      //necessary to align finish times. Overall count was exceeding totalCount.
      overallCount === 0 ? overallCount = 0 : overallCount--;
      let currInterval = workout.intervals[index];
      titleEl.textContent = workout.title;
      descEl.textContent = currInterval.desc;
      degrees = 0;
      count = 0;
      posX = canvas.width / 2;
      posY = canvas.height / 2;
      percent = 0;
      onePercent = 360 / 100;
      result = onePercent * 100;
      if (index === 0) {
        startAudio.play()
        setTimeout(()=> {
          arcMove(currInterval.time, index);
        }, 1900)
      } else {
        arcMove(currInterval.time, index);
      }
    };

    function arcMove(oneInterval, index){
      if (index > 0) nextAudio.play()
      const totalCount = oneInterval * 5;
      arcInterval = setInterval (function() {
        degrees = (count / totalCount) * 360;
        overallDegrees = (overallCount / totalTimeCount) * 360;
        count += 1;
        overallCount += 1;
        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        percent = degrees / onePercent;

        spanPercent.innerHTML = `${percent.toFixed()}%`;

        //background on currentProgress
        ctx.beginPath();
        ctx.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
        ctx.strokeStyle = '#D9D9D9';
        ctx.lineWidth = '10';
        ctx.stroke();
        //current progress bar
        ctx.beginPath();
        ctx.strokeStyle = '#3C6E71';
        ctx.lineWidth = '10';
        ctx.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + degrees) );
        ctx.stroke();

        //background on overallProgress
        ctx.beginPath();
        ctx.arc( posX, posY, 120, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
        ctx.strokeStyle = '#D9D9D9';
        ctx.lineWidth = '20';
        ctx.stroke();
        //current overallProgress bar
        ctx.beginPath();
        ctx.strokeStyle = '#284B63';
        ctx.lineWidth = '20';
        ctx.arc( posX, posY, 120, (Math.PI/180) * 270, (Math.PI/180) * (270 + overallDegrees) );
        ctx.stroke();

        if( count > totalCount ){
          clearInterval(arcInterval);
          if (workout.intervals[index + 1]) {
            newInterval(index + 1)
          } else {
            completeAudio.play()
            hideButtons(true, true, true, true)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            spanPercent.innerHTML = 'COMPLETE'
            setTimeout(()=>{
              cancelWorkout()
              showElement(bannerEl)
            }, 5000)
          }

        };
      }, fps);
      pauseBtn.addEventListener('click', () => pause(index));
    }

    function start() {
      retrieveInts()
      hideButtons(true)
      showButtons(false, true)
      newInterval(0)
    }

    function pause(index) {
      clearInterval(arcInterval)
      currIndex = index;
      hideButtons(false, true)
      showButtons(false, false, true)
    }

    function resume() {
      let oneInterval = intervals[currIndex].time;
      hideButtons(false, false, true)
      showButtons(false, true)
      arcMove(oneInterval, currIndex);
    }

    function cancelWorkout() {
      clearInterval(arcInterval)
      hideButtons(true, true, true, true)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      showElement(bannerEl)
      spanPercent.textContent = '';
      titleEl.textContent = '';
      descEl.textContent = '';
    };

    function hideButtons(start, pause, resume, cancel) {
      if (start) startBtn.style.display = 'none';
      if (pause) pauseBtn.style.display = 'none';
      if (resume) resumeBtn.style.display = 'none';
      if (cancel) cancelBtn.style.display = 'none';
    }

    function showButtons(start, pause, resume, cancel) {
      if (start) startBtn.style.display = 'block';
      if (pause) pauseBtn.style.display = 'block';
      if (resume) resumeBtn.style.display = 'block';
      if (cancel) cancelBtn.style.display = 'block';
    }

    function hideElement(element) {
      element.style.display = 'none';
    }

    function showElement(element) {
      element.style.display = 'block';
      hideElement(dropDownEl)
    }

    function showHelp() {
      hideElement(formEl)
      hideElement(savedIntEl)
      showElement(helpEl)
    }

    function switchTheme(e) {
      if (e.target.checked) {
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('intervalAppTheme', 'light');
      }
      else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('intervalAppTheme', 'dark');
      }
    };

    startBtn.addEventListener('click', start);
    resumeBtn.addEventListener('click', resume);
    help.addEventListener('click', ()=>showHelp());
    toggleSwitch.addEventListener('change', switchTheme, false);
    window.intervalTimerApp.cancelWorkout = cancelWorkout;
    window.intervalTimerApp.hideButtons = hideButtons;
    window.intervalTimerApp.showButtons = showButtons;
    window.intervalTimerApp.hideElement = hideElement;
    window.intervalTimerApp.showElement = showElement;
  };

  document.addEventListener('DOMContentLoaded', initTimer);
})();

