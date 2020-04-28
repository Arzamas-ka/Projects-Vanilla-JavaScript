const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const listOfFoods = [
  'Rolls',
  'Pizza',
  'Pasta',
  'Fish',
  'Potatoes',
  'Cherry',
  'Lemon',
  'Milk',
  'Bread',
  'Strawberry',
];

// Store listitems
const listItems = [];

let dragStartIndex;

// Insert list items into DOM
const createList = () => {
  [...listOfFoods]
    .map((name) => ({ value: name, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((name) => name.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });
};
createList();

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  console.log(dragStartIndex);
}

function dragEnter() {
  this.classList.add('over');
}

function dragOver(event) {
  this.classList.add('over');
  event.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

function dragLeave() {
  this.classList.add('over');
}

// Swap list items that are drag and drop
const swapItems = (fromIndex, toIndex) => {
  // console.log(fromIndex);
  // console.log(toIndex);
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

// Check the order of list items on button click
const checkOrder = () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== listOfFoods[index]) {
      // console.log('personName ', personName);
      // console.log(listOfFoods[index]);
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
};

const addEventListeners = () => {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
};
addEventListeners();

check.addEventListener('click', checkOrder);
