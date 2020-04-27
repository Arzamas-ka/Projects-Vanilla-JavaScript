const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breathTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breathAnimation = () => {
  text.innerText = 'Breath In!';

  setTimeout(() => {
    text.innerText = 'Hold!';
    container.className = 'container grow';

    setTimeout(() => {
      text.innerText = 'Breath Out!';
      container.className = 'container shrink';
    }, holdTime);
  }, breathTime);
};

setInterval(breathAnimation, totalTime);

