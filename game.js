



var player1Name = localStorage.getItem('input1');
var player2Name = localStorage.getItem('input2');
var maximumNumber = localStorage.getItem('input3');

var name1 = document.getElementById('name1');
var name2 = document.getElementById('name2');

var Die1 = document.getElementById('die1');
var Die2 = document.getElementById('die2');

var Roll = document.getElementById('roll');
var Hold = document.getElementById('hold');

var player1Div = document.querySelector('.player1');
var player2Div = document.querySelector('.player2');

var currentScore1 = document.getElementById('current-score1');
var currentScore2 = document.getElementById('current-score2');
var currentScoreSum = 0;

var currentDiv1 = document.getElementById('currentdiv1')
var currentDiv2 = document.getElementById('currentdiv2')

currentScore1.textContent = 0;
currentScore2.textContent = 0;

var activePlayer = 0;
var isGamePlaying = true;

Die1.style.visibility = 'hidden';
Die2.style.visibility = 'hidden';

name1.innerHTML = `<div id="name1"><b>${player1Name}</b></div>`;
name2.innerHTML = `<div id="name2"><b>${player2Name}</b></div>`;

const rollDice = () => {
    var randomNum1 = Math.floor(Math.random() * 6) + 1;
    var randomNum2 = Math.floor(Math.random() * 6) + 1;
    console.log(randomNum1)
    console.log(randomNum2)
    var randomNum = randomNum1 + randomNum2;
    Die1.style.visibility = 'visible';
    Die2.style.visibility = 'visible';
    Die1.src = `./dice${randomNum1}.jpg`;
    Die2.src = `./dice${randomNum2}.jpg`;
    return randomNum;
};

const changeRoles = () => {
    if (activePlayer === 0) {
        activePlayer = 1;
        player1Div.classList.add('active');
        player2Div.classList.remove('active');
        currentScore2.textContent = 0;
    } else {
        activePlayer = 0;
        player2Div.classList.add('active');
        player1Div.classList.remove('active');
        currentScore1.textContent = 0;
    }
    // Die1.style.visibility = 'hidden';
    // Die2.style.visibility = 'hidden';
};

Roll.addEventListener('click', () => {
    if (isGamePlaying) {
        var randomNum = rollDice();
        if (randomNum === 12) {
            currentScore1.textContent = 0
            currentScore2.textContent = 0
            currentScoreSum = 0
            changeRoles();
        } else {
            currentScoreSum += randomNum;
            if (activePlayer === 1) {
                currentScore2.textContent = currentScoreSum;
            } else {
                currentScore1.textContent = currentScoreSum;
            }
        }
    }
});

var scores = [0, 0];
var globalScore1 = document.getElementById('total-score1');
var globalScore2 = document.getElementById('total-score2');
globalScore1.textContent = 0
globalScore2.textContent = 0
var input3 = parseInt(maximumNumber);
var playAgain = document.getElementById('play-again')

Hold.addEventListener('click', () => {
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    if (isGamePlaying) {
        scores[activePlayer] += currentScoreSum;
        if (activePlayer === 1) {
            globalScore2.textContent = scores[activePlayer];
        } else {
            globalScore1.textContent = scores[activePlayer];
        }
        currentScoreSum = 0;

        if (scores[activePlayer] >= input3) {
            const winnerName = activePlayer === 0 ? player1Name : player2Name;
            document.querySelector('.player' + (activePlayer + 1)).classList.add('winner');

            const winnerElement = document.querySelector('#name' + (activePlayer + 1));
            
            winnerElement.textContent = winnerName + ' Won the Challenge !';
            winnerElement.style.fontWeight = 'bold';
            winnerElement.style.fontSize = '26px'
            player1Div.style.height = '372px'
            player2Div.style.height = '372px'
            
            document.querySelector('.player' + (activePlayer + 1)).classList.remove('active');
            Die1.style.visibility = 'hidden';
            Die2.style.visibility = 'hidden';
            playAgain.style.visibility = 'visible'
            playAgain.addEventListener('click',() => {
                // location.href = './index.html'
                window.location.reload()
            })
            isGamePlaying = false;
        } else {
            changeRoles();
        }
    }
});



