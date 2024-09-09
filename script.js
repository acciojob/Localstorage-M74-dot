document.addEventListener('DOMContentLoaded', () => {
  const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = JSON.parse(localStorage.getItem('items')) || [];

  // Function to add item to the list
  function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
      text,
      done: false
    };
    items.push(item);
    this.reset();
    updateList();
  }

  // Function to update the list and store it in localStorage
  function updateList() {
    itemsList.innerHTML = items
      .map((item, i) => {
        return `
          <li>
            <input type="checkbox" data-index="${i}" id="item${i}" ${item.done ? 'checked' : ''} />
            <label for="item${i}">${item.text}</label>
          </li>
        `;
      })
      .join('');
    localStorage.setItem('items', JSON.stringify(items));
  }

  // Function to toggle item status
  function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    updateList();
  }

  // Event Listeners
  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);

  // Initial load
  updateList();
});
