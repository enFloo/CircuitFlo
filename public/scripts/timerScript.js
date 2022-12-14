
// Function that shows timer progress with a colored ring
function update_circle() {
    let currentAngle = (activeTimeRemaining / sessionActiveTime) * 360;
    
    
    // Active progress indicator
    if (currentAngle > 180) {
        semiCircleElements[0].style.transform = 'rotate(180deg)';
        semiCircleElements[1].style.transform = `rotate(${currentAngle}deg)`;
        semiCircleElements[2].style.display = 'none';
        timerDisplayElm.style.color = '#26A69A';
    } else {
        semiCircleElements[0].style.transform = `rotate(${currentAngle}deg)`;
        semiCircleElements[1].style.transform = `rotate(${currentAngle}deg)`;
        semiCircleElements[2].style.display = 'block';
    }

    // 5sec-condition
    if (activeTimeRemaining <= 5) {
        semiCircleElements[0].style.backgroundColor = 'red';
        semiCircleElements[1].style.background = 'red';
        timerDisplayElm.style.color = 'red';
    }   

    if (activeTimeRemaining <= 0) { // switch to break time
        clearInterval(activeInterval);
        endOfIntervalSound();
        incrementRoundsCompleted();
        semiCircleElements[0].style.backgroundColor = '#8B088B';
        semiCircleElements[1].style.backgroundColor = '#8B088B';
        breakTimeRemaining = sessionBreakTime;
        breakTimerDisplayElm.style.display = 'block'; // shows break time in circle
        breakTimerDisplayElm.innerText = format_timer(breakTimeRemaining); //Shows break time in circle 
        timer(); 
    }
}

function update_break_circle(){
    let breakCurrentAngle = (breakTimeRemaining / sessionBreakTime) * 360;
    
    // Break progress indicator
    if (breakCurrentAngle > 180) {
        semiCircleElements[0].style.transform = 'rotate(180deg)';
        semiCircleElements[1].style.transform = `rotate(${breakCurrentAngle}deg)`;
        semiCircleElements[2].style.display = 'none';
        breakTimerDisplayElm.style.color = '#8B088B';
    } else {
        semiCircleElements[0].style.transform = `rotate(${breakCurrentAngle}deg)`;
        semiCircleElements[1].style.transform = `rotate(${breakCurrentAngle}deg)`;
        semiCircleElements[2].style.display = 'block';
    }

    // 5sec-condition
    if (breakTimeRemaining <= 5) {
        semiCircleElements[0].style.backgroundColor = 'red';
        semiCircleElements[1].style.background = 'red';
        breakTimerDisplayElm.style.color = 'red';
    }

    if(breakTimeRemaining <= 0) { // switch to active time
        clearInterval(breakInterval);
        breakTimerDisplayElm.style.display = 'none' //hides active time in circle
        incrementRoundsCompleted();
        intervalsLeftElm.innerText = incrementIntervalsCompleted();
        if(intervalsLeft >= 1){
            endOfIntervalSound();
        }
        semiCircleElements[0].style.backgroundColor = '#26A69A';
        semiCircleElements[1].style.backgroundColor = '#26A69A';
        timerDisplayElm.style.display = 'block'; // shows break time in circle
        timerDisplayElm.style.color = '#26A69A';
        activeTimeRemaining = sessionActiveTime;
        timerDisplayElm.innerText = format_timer(activeTimeRemaining); //Shows break time in circle 
        update_circle();
        timer();      
    }

    if( breakTimeRemaining == 0 && intervalsLeft == 0){
        clearInterval(activeInterval);
        endOfWorkoutSound();
        timerDisplayElm.style.color = 'lightgray';
        timerDisplayElm.innerText = 'Workout Complete';
        semiCircleElements[0].style.backgroundColor = 'none';
        semiCircleElements[1].style.backgroundColor = 'none';
        
        
    }
}

function incrementIntervalsCompleted(){ // Two roundsCompeleted equals one Interval completed
    intervalsCompleted = intervalsCompleted + 1;
    intervalsLeft = totalIntervals - intervalsCompleted

    return `Rounds Left: ${intervalsLeft}`;
}

function incrementRoundsCompleted(){
    roundsCompleted = roundsCompleted + 1;
    
    
}


function format_timer(totalSeconds) {
    var date = new Date(0);
    date.setSeconds(totalSeconds);
    var timeString = date.toISOString().substring(14, 19);
    return timeString;
}

function timer(){
    
    if(roundsCompleted % 2 == 0){
        
        activeInterval = setInterval(() =>{
            activeTimeRemaining-- //decrements total time
            timerDisplayElm.innerText = format_timer(activeTimeRemaining); //Shows time in circle
            update_circle();// timer bar animation
        },1000)
    }

    if(roundsCompleted % 2 !== 0){
        timerDisplayElm.style.display = 'none' //hides active time in circle
        breakTimerDisplayElm.style.color = '#8B088B';
        update_break_circle();
        
        breakInterval = setInterval(() =>{ 
            breakTimeRemaining-- //decrements total break time
            breakTimerDisplayElm.innerText = format_timer(breakTimeRemaining); //Shows break time in circle
            update_break_circle();
        },1000)
    }
}

function pause_timer() {
    if(!isPaused){
        if(activeInterval){
            clearInterval(activeInterval);
        }

        if(breakInterval){
            clearInterval(breakInterval)
        }
        isPaused = true;
    }
    console.log('pause_timer') 
    
    
}

function resume_timer() {
    if(isPaused){
        timer();
        isPaused = false; 
    }
    
    console.log("resume_timer") 
}

function restart_timer() {
    clearInterval(activeInterval);
    clearInterval(breakInterval);
    roundsCompleted = 0;
    intervalsCompleted = 0;
    totalIntervals = sessionNumberOfRounds;
    intervalsLeftElm.innerText = `Rounds Left: ${totalIntervals}`;
    
    
    if(timerDisplayElm.style.display = 'none'){
        timerDisplayElm.style.display = 'block';
    }
    breakTimerDisplayElm.style.display = 'none';
    timerDisplayElm.style.color = '#26A69A'; //changes timer font color
    semiCircleElements[0].style.backgroundColor = '#26A69A';
    semiCircleElements[1].style.backgroundColor = '#26A69A';
    activeTimeRemaining = sessionActiveTime;
    breakTimeRemaining = sessionBreakTime;
    timerDisplayElm.innerText = format_timer(activeTimeRemaining); //Shows time in circle
    update_circle();
    timer();
    isPaused = false;
    console.log('restarted time');
    
    
}
function endOfIntervalSound(){

    const endRoundAlarm = new Audio();
    endRoundAlarm.autoplay = true;

    endRoundAlarm.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

    endRoundAlarm.src = '/assets/audio/264346__soundslikewillem__beep.wav';
}

function endOfWorkoutSound(){

    const workoutCompleteAlarm = new Audio();
    workoutCompleteAlarm.autoplay = true;

    workoutCompleteAlarm.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";

    workoutCompleteAlarm.src = '/assets/audio/610561__brickdeveloper171__alien-signal-4.wav'
   
}

//
// Global state
//
let isPaused = true;
let activeTimeRemaining = null;
let breakTimeRemaining = null;
let totalIntervals = null;
let intervalsCompleted = 0;
let activeInterval = null;
let breakInterval = null;
let roundsCompleted = 0;
let intervalsLeft = sessionNumberOfRounds
const timerDisplayElm = document.getElementById('timerDisplay');
const breakTimerDisplayElm = document.getElementById('breakTimerDisplay');
const semiCircleElements = document.querySelectorAll('.semiCircle');
const intervalsLeftElm = document.getElementById('intervalsLeft');



window.addEventListener('load', app(), true);

function app() {
    activeTimeRemaining = sessionActiveTime;
    breakTimeRemaining = sessionBreakTime;
    totalIntervals = sessionNumberOfRounds;
    
    

    breakTimerDisplayElm.style.display = 'none'
    timerDisplayElm.style.color = '#26A69A'; //changes timer font color
    timerDisplayElm.innerText = format_timer(activeTimeRemaining); //Shows time in circle
    update_circle();// timer bar animation

    // Handle pause and resume buttons
    document.getElementById('startButton').onclick = resume_timer;
    document.getElementById('pauseButton').onclick = pause_timer;
    document.getElementById('restartButton').onclick = restart_timer;
    // Show number of intervals left in template
    
    intervalsLeftElm.innerText = `Rounds left: ${totalIntervals}`;
}




