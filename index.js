(function() {
  const initTimer = function() {
    const canvas = document.getElementById('canvas');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resumeBtn = document.getElementById('resume-btn');
    const spanPercent = document.getElementById('percent');
    const titleEl = document.getElementById('int-title');
    const descEl = document.getElementById('int-desc');
    const ctx = canvas.getContext('2d');
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

    function retrieveInts() {
      workout = JSON.parse(localStorage.currentInterval);
      intervals = workout.intervals;
      totalTime = workout?.intervals?.reduce((prev, num)=>{
        return prev + num.time
      }, 0) || 0;
      totalTimeCount = totalTime * 5;
    }

    function newInterval(index=0) {
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
      arcMove(currInterval.time, index);
    };

    function arcMove(oneInterval, index){
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
        ctx.strokeStyle = '#b1b1b1';
        ctx.lineWidth = '10';
        ctx.stroke();
        //current progress bar
        ctx.beginPath();
        ctx.strokeStyle = '#3949AB';
        ctx.lineWidth = '10';
        ctx.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + degrees) );
        ctx.stroke();
        if( count > totalCount ){
          clearInterval(arcInterval);
          if (workout.intervals[index + 1]) {
            newInterval(index + 1)
          } else {
            spanPercent.innerHTML = 'COMPLETE'
          }

        };

        //background on overallProgress
        ctx.beginPath();
        ctx.arc( posX, posY, 120, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
        ctx.strokeStyle = '#b1b1b1';
        ctx.lineWidth = '20';
        ctx.stroke();
        //current overallProgress bar
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.lineWidth = '20';
        ctx.arc( posX, posY, 120, (Math.PI/180) * 270, (Math.PI/180) * (270 + overallDegrees) );
        ctx.stroke();

      }, fps);
      pauseBtn.addEventListener('click', () => pause(index));
    }

    function start() {
      retrieveInts()
      startBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
      newInterval(0)
    }

    function pause(index) {
      clearInterval(arcInterval)
      currIndex = index;
      pauseBtn.style.display = 'none';
      resumeBtn.style.display = 'block';
    }

    function resume() {
      let oneInterval = intervals[currIndex].time;
      resumeBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
      arcMove(oneInterval, currIndex);
    }

    startBtn.addEventListener('click', start)
    resumeBtn.addEventListener('click', resume)

  }

  document.addEventListener('DOMContentLoaded', initTimer);
})();

// window.onload = function() {
//   const canvas = document.getElementById('canvas');
//   const startBtn = document.getElementById('start-btn');
//   const pauseBtn = document.getElementById('pause-btn');
//   const resumeBtn = document.getElementById('resume-btn');
//   const spanPercent = document.getElementById('percent');
//   const ctx = canvas.getContext('2d');
//   const intervals = [10, 5, 15, 5];
//   const totalTime = intervals.reduce((prev, num)=>prev + num);
//   const totalTimeCount = totalTime * 5;
//   let currIndex;
//   let arcInterval;
//   let overallDegrees = 0;
//   let overallCount = 0;
//   let posX = canvas.width / 2;
//   let posY = canvas.height / 2;
//   let fps = 200;
//   let degrees = 0;
//   let percent = 0;
//   let onePercent = 360 / 100;
//   let result = onePercent * 64;
//   let count;
//   // ctx.lineCap = 'round';

//   function newInterval(index=0) {
//     let oneInterval = intervals[index];
//     degrees = 0;
//     count = 0;
//     posX = canvas.width / 2;
//     posY = canvas.height / 2;
//     percent = 0;
//     onePercent = 360 / 100;
//     result = onePercent * 100;
//     arcMove(oneInterval, index);
//   };

//   function arcMove(oneInterval, index){
//     const totalCount = oneInterval * 5;
//     arcInterval = setInterval (function() {
//       degrees = (count / totalCount) * 360;
//       overallDegrees = (overallCount / totalTimeCount) * 360;
//       count += 1;
//       overallCount += 1;
//       ctx.clearRect( 0, 0, canvas.width, canvas.height );
//       percent = degrees / onePercent;

//       spanPercent.innerHTML = `${percent.toFixed()}%`;

//       //background on currentProgress
//       ctx.beginPath();
//       ctx.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
//       ctx.strokeStyle = '#b1b1b1';
//       ctx.lineWidth = '10';
//       ctx.stroke();
//       //current progress bar
//       ctx.beginPath();
//       ctx.strokeStyle = '#3949AB';
//       ctx.lineWidth = '10';
//       ctx.arc( posX, posY, 70, (Math.PI/180) * 270, (Math.PI/180) * (270 + degrees) );
//       ctx.stroke();
//       if( count > totalCount ){
//         clearInterval(arcInterval);
//         if (intervals[index + 1]) {
//           newInterval(index + 1)
//         } else {
//           spanPercent.innerHTML = 'COMPLETE'
//         }

//       };

//       //background on overallProgress
//       ctx.beginPath();
//       ctx.arc( posX, posY, 120, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
//       ctx.strokeStyle = '#b1b1b1';
//       ctx.lineWidth = '20';
//       ctx.stroke();
//       //current overallProgress bar
//       ctx.beginPath();
//       ctx.strokeStyle = 'green';
//       ctx.lineWidth = '20';
//       ctx.arc( posX, posY, 120, (Math.PI/180) * 270, (Math.PI/180) * (270 + overallDegrees) );
//       ctx.stroke();

//     }, fps);
//     pauseBtn.addEventListener('click', () => pause(index));
//   }

//   function start() {
//     startBtn.style.display = 'none';
//     pauseBtn.style.display = 'block';
//     newInterval(0)
//   }

//   function pause(index) {
//     clearInterval(arcInterval)
//     currIndex = index;
//     pauseBtn.style.display = 'none';
//     resumeBtn.style.display = 'block';
//   }

//   function resume() {
//     let oneInterval = intervals[currIndex];
//     resumeBtn.style.display = 'none';
//     pauseBtn.style.display = 'block';
//     arcMove(oneInterval, currIndex);
//   }

//   startBtn.addEventListener('click', start)
//   resumeBtn.addEventListener('click', resume)

// }