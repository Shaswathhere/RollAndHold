var rules = document.getElementById('rules');
var rulesPage = document.getElementById('rules-page');
//When mouse enters
rules.addEventListener('mouseenter', function() {
    rulesPage.style.visibility = 'visible';
    player1Div.style.opacity = '0';
    player2Div.style.opacity = '0';
    Die1.style.opacity = '0'
    Die2.style.opacity = '0'
});

//When mouse leaves
rules.addEventListener('mouseleave', function() {
    rulesPage.style.visibility = 'hidden';
    player1Div.style.opacity = '1';
    player2Div.style.opacity = '1';
    Die1.style.opacity = '1'
    Die2.style.opacity = '1'
});



// variables
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

// Dice hidden
Die1.style.visibility = 'hidden';
Die2.style.visibility = 'hidden';

// Getting names from local storage and showing in div
name1.innerHTML = `<div id="name1"><b>${player1Name}</b></div>`;
name2.innerHTML = `<div id="name2"><b>${player2Name}</b></div>`;


// Sound for roll button
const rollSound = new Audio('./assets/071950_dice-rolling-88974.mp3');
rollSound.autoplay = false; 
rollSound.preload = 'auto'; 

// Sound for hold button
const holdSound = new Audio('./assets/button-124476.mp3');
holdSound.autoplay = false; 
holdSound.preload = 'auto'; 

// Sound for winner
const winningSound = new Audio('./assets/SCNB3LA-winning (mp3cut.net).mp3');
winningSound.autoplay = false; 
winningSound.preload = 'auto'; 




// RollDice function
const rollDice = () => {
    // Random numbers
    var randomNum1 = Math.floor(Math.random() * 6) + 1;
    var randomNum2 = Math.floor(Math.random() * 6) + 1;
    console.log(randomNum1)
    console.log(randomNum2)
    var randomNum = randomNum1 + randomNum2;
    Die1.style.visibility = 'visible';
    Die2.style.visibility = 'visible';
    // Updating the dice image according to random number
    Die1.src = `./assets/dice${randomNum1}.jpg`;
    Die2.src = `./assets/dice${randomNum2}.jpg`;
    // Playing sound for roll button
    rollSound.play()
    return randomNum;
};

// Switching between 2 players using active
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
    
};

// Roll button onclick
Roll.addEventListener('click', () => {
    if (isGamePlaying) {
        var randomNum = rollDice();
        // Checking condition and updating the current-score
        if (randomNum % 2 === 0) {
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

// variables
var scores = [0, 0];
var globalScore1 = document.getElementById('total-score1');
var globalScore2 = document.getElementById('total-score2');
globalScore1.textContent = 0
globalScore2.textContent = 0
var input3 = parseInt(maximumNumber);
var playAgain = document.getElementById('play-again')

// Hold button onclick
Hold.addEventListener('click', () => {
    holdSound.play()
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
    // Updating currentScore Sum to scores[activePlayer] and displaying it in globalScore + (activePlayer + 1)
    if (isGamePlaying) {
        scores[activePlayer] += currentScoreSum;
        if (activePlayer === 1) {
            globalScore2.textContent = scores[activePlayer];
        } else {
            globalScore1.textContent = scores[activePlayer];
        }
        currentScoreSum = 0;

        // Checking the global score and maximum number (localStorage) and declaring the winner
        if (scores[activePlayer] >= input3) {
            const winnerName = activePlayer === 0 ? player1Name : player2Name;
            document.querySelector('.player' + (activePlayer + 1)).classList.add('winner');
            const winnerElement = document.querySelector('#name' + (activePlayer + 1));
            winnerElement.textContent = winnerName + ' Won the Challenge!';
            // Winning Sound is played
            winningSound.play()
            winnerElement.style.fontWeight = 'bold';
            winnerElement.style.fontSize = '26px'
            player1Div.style.height = '372px'
            player2Div.style.height = '372px'
            // Play again button is enabled and Dice images are disabled
            document.querySelector('.player' + (activePlayer + 1)).classList.remove('active');
            Die1.style.visibility = 'hidden';
            Die2.style.visibility = 'hidden';
            playAgain.style.visibility = 'visible'
            // Sound for playAgain button
            playAgain.addEventListener('click',() => {
                holdSound.play()
                location.href = './index.html'
            })
            isGamePlaying = false;
        }
        // If none of them is winner Change the role
        else {
            changeRoles();
        }
    }
});



