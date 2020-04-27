const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search songs
const searchSongs = async (term) => {
  const response = await fetch(`${apiURL}/suggest/${term}`);
  const data = await response.json();

  showData(data);
};

// Show song and artists in DOM
const showData = (data) => {
  result.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          (song) =>
            `<li>
            <span><strong>${song.artist.name}</strong> - </span>${song.title}
            <button class="btn" data-artist="${song.artist.name}" data-song="${song.title}">Get Lyrics</button>
          </li>`
        )
        .join('')}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
          ${
            data.prev
              ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
              : ''
          }
          ${
            data.next
              ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
              : ''
          }
        `;
  } else {
    more.innerHTML = '';
  }
};

// Get prev and next results
const getMoreSongs = async (url) => {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await response.json();

  showData(data);
};

// Get lyrics for song
const getLyrics = async (artist, songTitle) => {
  console.log(`${apiURL}/v1/${artist}/${songTitle}`);

  const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await response.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

  result.innerHTML = `
    <h2>
      <strong>${artist}</strong> 
      - ${songTitle}
    </h2>
    <span>${lyrics}</span>
  `;

  more.innerHTML = '';
};

// Event listeners
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
  }
  searchSongs(searchTerm);
});

// Get lyrics button click
result.addEventListener('click', (event) => {
  const clickedEl = event.target;

  if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-song');

    getLyrics(artist, songTitle);
  }
});
