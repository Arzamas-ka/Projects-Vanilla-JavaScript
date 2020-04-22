const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['summer', 'happy', 'love', 'dream'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
const displayWord = () => {
  wordEl.innerHTML = `
    ${[...selectedWord]
      .map(
        (letter) => `
      <span class='letter'>
        ${correctLetters.includes(letter) ? letter : ''}
      </span>
    `
      )
      .join('')}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😉';
    popup.style.display = 'flex';
  }
};

// Update the wrong letters
const updateWrongLettersEl = () => {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerHTML = 'Unfortunately you lost! 🤨';
    popup.style.display = 'flex';
  }
};

// Show notification
const showNotification = () => {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }),
    200;
};

// Keydown letter press
window.addEventListener('keydown', (event) => {
  // console.log(event.keyCode);
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letter = event.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game and  play again
playAgainBtn.addEventListener('click', (event) => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();
