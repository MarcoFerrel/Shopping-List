const itemFrom = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearButton = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');

const addItem = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create List Item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add Item
  itemList.appendChild(li);
  checkUI();
  itemInput.value = '';
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
        checkUI();
    }
  }
};

const clearItems = (e) => {
  if (confirm('are you sure?')) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
        checkUI();
    }
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

// Event Listeners
itemFrom.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems);

checkUI();
