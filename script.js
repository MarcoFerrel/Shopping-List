const itemFrom = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
};

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  //Create Item DOM element
  addItemToDom(newItem);

  //Add item to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = '';
};

const addItemToDom = (item) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add Item
  itemList.appendChild(li);
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
};

const removeItem = (item) => {
  if (confirm('Are you sure?')) {
    //   Remove Item From DOM
    item.remove();
    // Remove Item From Storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  //Filter Out Item To Be Removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //Re-set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const addItemToStorage = (item) => {
  const itemsFromStorage = getItemsFromStorage();

  //Add new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = (e) => {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
};

const clearItems = (e) => {
  if (confirm('are you sure?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);

      checkUI();
    }
    localStorage.removeItem('items');
  }
};

const createButton = (classes) => {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll('li');

  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

const checkUI = () => {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearButton.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

// Initialize app
const init = () => {
  // Event Listeners
  itemFrom.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearButton.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
};

init();
