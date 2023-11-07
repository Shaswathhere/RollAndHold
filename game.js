var player1Name = localStorage.getItem('input1')
var player2Name = localStorage.getItem('input2')
var maximumNumber = localStorage.getItem('input3')

var name1 = document.getElementById('name1')
var name2 = document.getElementById('name2')

// name1.textContent = player1Name
// name2.textContent = player2Name
name1.innerHTML = `<div id="name1"><b>${player1Name}</b></div>`
name2.innerHTML = `<div id="name2"><b>${player2Name}</b></div>`


