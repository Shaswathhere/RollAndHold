// variables
var start = document.getElementById('start')
var rules = document.getElementById('rule-book')

// Start button sound
const startSound = new Audio('./assets/interface-124464.mp3'); 
startSound.autoplay = "true"
startSound.preload = 'auto';

// Error sound
const accessDenied = new Audio('./assets/error-126627.mp3')
accessDenied.preload = 'auto'

// Start button onclick
start.onclick = () => {
    
    // variables
    var input1 = document.getElementById('player-name-1').value
    var input2 = document.getElementById('player-name-2').value
    var input3 = document.getElementById('maxscore-input').value
    
    var max = parseInt(input3)

    // alert 
    if(input1 === ""){
        accessDenied.play()
        alert('Please enter player 1 name')
        
    }
    else if(input2 === ""){
        accessDenied.play()
        alert('Please enter player 2 name')
    }
    else if(max < 100 || isNaN(max)){
        accessDenied.play()
        alert('Please enter valid maximum number')
    }
    // Setting player name 1 , player name 2 , maximum number
    else{
        startSound.play()
        localStorage.setItem('input1',input1)
        localStorage.setItem('input2',input2)
        localStorage.setItem('input3',input3)
        
        location.href = './game.html'
        
    }
}


rules.onclick = () => {
console.log('Rules button clicked');

// Play startSound
startSound.play();

// Add a delay to sound
setTimeout(() => {

    location.href = './rules.html';
}, 500);
};