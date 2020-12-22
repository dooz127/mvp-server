var socket = io();
var itemNum = 1; // Starts at two because item 1 is already present

function updateDatabase() {
    var items = [];
    var name = document.getElementById('name').value;
    for (var i = 1; i <= itemNum; i++) {
        var item = document.getElementById('item' + i).value;
        items.push({ item: item });
    }

    var hunt = { id: 0, name: name, items: items };
    socket.emit('newHunt', hunt);
}

function addItem() {
    itemNum += 1;

    var itemsDiv = document.getElementById('allItems');

    var newItemDiv = document.createElement('div');

    var itemLabel = document.createElement('label');
    var itemField = document.createElement('input');

    itemLabel.innerHTML = 'Item ' + String(itemNum) + ': ';
    itemField.setAttribute('class', 'item');
    itemField.setAttribute('id', 'item' + String(itemNum));
    itemField.setAttribute('type', 'text');

    newItemDiv.setAttribute('id', 'item-field'); //Sets class of div

    newItemDiv.appendChild(itemLabel);
    newItemDiv.appendChild(itemField);

    itemsDiv.appendChild(document.createElement('br')); // Creates a break between each item
    itemsDiv.appendChild(newItemDiv); // Adds the item div to the screen

    newItemDiv.style.backgroundColor = randomColor();
}

// Called when user wants to exit hunt creator
function cancelHunt() {
    if (confirm('Are you sure you want to exit? All work will be DELETED!')) {
        window.location.href = '../';
    }
}

socket.on('startGameFromCreator', function (data) {
    window.location.href = '../../host/?id=' + data;
});

function randomColor() {
    var colors = ['#4CAF50', '#f94a1e', '#3399ff', '#ff9933'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}

function setBGColor() {
    var randColor = randomColor();
    document.getElementById('item-field').style.backgroundColor = randColor;
}
