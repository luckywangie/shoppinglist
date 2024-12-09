document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const shoppingList = document.getElementById('shopping-list');

    let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const renderList = () => {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.text;
            if (item.purchased) listItem.classList.add('purchased');

            listItem.addEventListener('click', () => {
                item.purchased = !item.purchased;
                saveToLocalStorage();
                renderList();
            });

            shoppingList.appendChild(listItem);
        });
    };

    const addItem = () => {
        const itemText = inputField.value.trim();
        if (itemText === '') return;

        items.push({ text: itemText, purchased: false });
        saveToLocalStorage();
        renderList();
        inputField.value = '';
    };

    const clearList = () => {
        items = [];
        saveToLocalStorage();
        renderList();
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    };

    addButton.addEventListener('click', addItem);
    clearButton.addEventListener('click', clearList);

    renderList();
});
