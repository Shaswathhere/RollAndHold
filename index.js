var start = document.getElementById('start')
var rules = document.getElementById('rule-book')

const startSound = new Audio('./assets/interface-124464.mp3'); // Replace 'roll-sound.mp3' with the path to your audio file

// Optionally, set attributes such as autoplay and preload
startSound.autoplay = "true" // Set to true if you want it to automatically play
startSound.preload = 'auto'; // Preload the audio for smoother playback

const accessDenied = new Audio('./assets/error-126627.mp3')
accessDenied.preload = 'auto'
start.onclick = () => {
    
    var input1 = document.getElementById('player-name-1').value
    var input2 = document.getElementById('player-name-2').value
    var input3 = document.getElementById('maxscore-input').value
    
    var max = parseInt(input3)


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
    else{
        console.log(startSound.autoplay)
        startSound.play()
        console.log("2", startSound.autoplay)

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

// Add a delay of, for example, 500 milliseconds (adjust as needed)
setTimeout(() => {

    location.href = './rules.html';
}, 500);
};