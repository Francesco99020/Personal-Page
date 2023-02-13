document.getElementById('stop').disabled = true;
document.getElementById('reset').disabled = true;

async function runClock(){
    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
    document.getElementById('reset').disabled = true;

    //gets current clock state
    console.log('running');
    let meridiem = document.getElementById('meridiem').innerHTML;
    let secs = document.getElementById('seconds').innerHTML;
    secs = parseInt(secs);
    let mins = document.getElementById('minutes').innerHTML;
    mins = parseInt(mins);
    let hrs = document.getElementById('hours').innerHTML;
    hrs = parseInt(hrs);
    let hrHand = document.getElementById('analog-clock-hr-hand');
    let minHand = document.getElementById('analog-clock-min-hand');
    let secHand = document.getElementById('analog-clock-sec-hand');

    //sets boolean values for clock control actions
    let reset = false;
    document.getElementById('reset').addEventListener('click', () => {
        reset = true;
    });
    let stop = false;
    document.getElementById('stop').addEventListener('click', () => {
        stop = true;
    });
    let run = true;

    let changeTimeButton = document.getElementById('change');
    changeTimeButton.disabled = true;

    if(secs == 59){
        incrementMins(mins);
            mins = document.getElementById('minutes').innerHTML;
            mins = parseInt(mins);
    }
    if(secs == 59 && mins == 59){
        incrementHrs(hrs);
        hrs = document.getElementById('hours').innerHTML;
        hrs = parseInt(hrs, meridiem);
    }

    //loop runs the clock until inturupped
    while(run){
        await delay(1000);
        if(stop){
            run = false;
            console.log('stop was clicked');
            break;
        }
        incrementSecs(secs, secHand);
        secs = document.getElementById('seconds').innerHTML;
        secs = parseInt(secs);
        if(secs == 59){
            incrementMins(mins, minHand);
            mins = document.getElementById('minutes').innerHTML;
            mins = parseInt(mins);
        }
        if(secs == 59 && mins == 59){
            incrementHrs(hrs, hrHand);
            hrs = document.getElementById('hours').innerHTML;
            hrs = parseInt(hrs, meridiem);
        }
    }
    changeTimeButton.disabled = false;
    document.getElementById('stop').disabled = true;
    document.getElementById('reset').disabled = false;
    document.getElementById('start').disabled = false;
}

function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}

async function incrementSecs(secs, secHand){
    if(secs < 59){
        secs++;
        var formattedNum =('0' + secs).slice(-2);
        document.getElementById('seconds').innerHTML = formattedNum;
    }else{
        secs = 0;
        var formattedNum =('0' + secs).slice(-2);
        document.getElementById('seconds').innerHTML = formattedNum;
    }
    secHand.style.transform = 'rotate(' + 6*secs + 'deg)';
}

function decrementSecs(){
    let secs = document.getElementById('seconds').innerHTML;
    let secHand = document.getElementById('analog-clock-sec-hand');
    if(secs > 0){
        secs--;
        var formattedNum =('0' + secs).slice(-2);
        document.getElementById('seconds').innerHTML = formattedNum;
    }else{
        secs = 59;
        var formattedNum =('0' + secs).slice(-2);
        document.getElementById('seconds').innerHTML = formattedNum;
        decrementMins();
    }
    secHand.style.transform = 'rotate(' + 6*secs + 'deg)';
}

async function incrementMins(mins, minHand){
    await delay(1000);
    if(mins < 59){
        mins++;
        var formattedNum =('0' + mins).slice(-2);
        document.getElementById('minutes').innerHTML = formattedNum;
        }else{
            mins = 0;
            var formattedNum =('0' + mins).slice(-2);
            document.getElementById('minutes').innerHTML = formattedNum;
        }
        minHand.style.transform = 'rotate(' + 6*mins + 'deg)';
}

function decrementMins(){
    let mins = document.getElementById('minutes').innerHTML;
    let minHand = document.getElementById('analog-clock-min-hand');
    if(mins > 0){
        mins--;
        var formattedNum =('0' + mins).slice(-2);
        document.getElementById('minutes').innerHTML = formattedNum;
    }else{
        mins = 59;
        var formattedNum =('0' + mins).slice(-2);
        document.getElementById('minutes').innerHTML = formattedNum;
        decrementHrs();
    }
    minHand.style.transform = 'rotate(' + 6*mins + 'deg)';
}

async function incrementHrs(hrs, hrHand){
       await delay(1000);
    if(hrs < 12){
        hrs++;
        var formattedNum =('0' + hrs).slice(-2);
        document.getElementById('hours').innerHTML = formattedNum;
    }else{
        hrs = 1;
        var formattedNum =('0' + hrs).slice(-2);
        if(meridiem === 'am'){
            meridiem = 'pm';
            document.getElementById('meridiem').innerHTML = meridiem;
        }else{
            meridiem = 'am';
            document.getElementById('meridiem').innerHTML = meridiem;
        }
        document.getElementById('hours').innerHTML = formattedNum;
    }
    hrHand.style.transform = 'rotate(' + 30*hrs + 'deg)';
}

function decrementHrs(){
    let hrs = document.getElementById('hours').innerHTML;
    let hrHand = document.getElementById('analog-clock-hr-hand');
    if(hrs > 1){
        hrs--;
        var formattedNum =('0' + hrs).slice(-2);
        document.getElementById('hours').innerHTML = formattedNum;
    }else{
        hrs = 12;
        var formattedNum =('0' + hrs).slice(-2);
        document.getElementById('hours').innerHTML = formattedNum;
        let meridiem = document.getElementById('meridiem').innerHTML;
        if(meridiem == 'am'){
            meridiem = 'pm';
            document.getElementById('meridiem').innerHTML = meridiem;
        }else{
            meridiem = 'am';
            document.getElementById('meridiem').innerHTML = meridiem;
        }
    }
    hrHand.style.transform = 'rotate(' + 30*hrs + 'deg)';
}

//resets clock to 12:00:00pm
async function resetClock(){
    await delay(1000);
    document.getElementById('hours').innerHTML = 12;
    document.getElementById('minutes').innerHTML = '0' + 0;
    document.getElementById('seconds').innerHTML = '0' + 0;
    document.getElementById('meridiem').innerHTML = 'pm';
    document.getElementById('analog-clock-hr-hand').style.transform = "rotate(0deg)";
    document.getElementById('analog-clock-min-hand').style.transform = "rotate(0deg)";
    document.getElementById('analog-clock-sec-hand').style.transform = "rotate(0deg)";

    document.getElementById('reset').disabled = true;
}

async function changeTime(){
    const elements = document.querySelectorAll('.changeTime')
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.remove('changeTime');
    }
    let startClockBtn = document.getElementById('start');
    startClockBtn.disabled = true;

    let resetButton = document.getElementById('reset');
    resetButton.disabled = true;

    let stopButton = document.getElementById('stop');
    stopButton.disabled = true;

    let changeTimeButton = document.getElementById('change');
    changeTimeButton.disabled = true;

}
function confirmChanges(){
    const elements = document.querySelectorAll('.timeChange')
    for(let i = 0; i < elements.length; i++){
        elements[i].classList.add('changeTime');
    }
    let startClock = document.getElementById('start');
    startClock.disabled = false;

    let changeTimeButton = document.getElementById('change');
    changeTimeButton.disabled = false;

    let reset = document.getElementById('reset');
    reset.disabled = false;

    let hr = document.getElementById('hours').innerHTML;
    let min = document.getElementById('minutes').innerHTML;
    let sec = document.getElementById('seconds').innerHTML;
    let meridiem = document.getElementById('meridiem').innerHTML;
    if(hr == 12){
        if(min == 00){
            if(sec == 00){
                if(meridiem == 'pm'){
                    reset.disabled = true;
                }
            }
        }
    }
}
function changeHour(id){
    let arrow = document.getElementById(id).id;
    let hourNum = document.getElementById('hours').innerHTML;
    if(arrow == 'hour-up-arrow'){
       incHr();
    }else{
        decrementHrs();
    }
}
function changeMinute(id){
    let arrow = document.getElementById(id).id;
    let minNum = document.getElementById('minutes').innerHTML;
    if(arrow == 'minute-up-arrow'){
        incMin();
    }else{
        decrementMins();
    }
}
function changeSecond(id){
    let arrow = document.getElementById(id).id;
    let secNum = document.getElementById('seconds').innerHTML;
    if(arrow == 'second-up-arrow'){
        incSec();
    }else{
        decrementSecs();
    }
}

function incSec(){
    let sec = document.getElementById('seconds').innerHTML;
    let secHand = document.getElementById('analog-clock-sec-hand');
    if(sec < 59){
        sec++;
        var formattedNum =('0' + sec).slice(-2);
        document.getElementById('seconds').innerHTML = formattedNum;
    }else{
        sec = 00;
        var formattedNum =('0' + sec).slice(-2);
        document.getElementById('seconds').innerHTML = formattedNum;
        incMin();
    }
    secHand.style.transform = 'rotate(' + 6*sec + 'deg)';
}

function incMin(){
    let min = document.getElementById('minutes').innerHTML;
    let minHand = document.getElementById('analog-clock-min-hand');
    if(min < 59){
        min++;
        var formattedNum =('0' + min).slice(-2);
        document.getElementById('minutes').innerHTML = formattedNum;
    }else{
        min = 00;
        var formattedNum =('0' + min).slice(-2);
        document.getElementById('minutes').innerHTML = formattedNum;
        incHr();

    }
    minHand.style.transform = 'rotate(' + 6*min + 'deg)';
}

function incHr(){
    let hr = document.getElementById('hours').innerHTML;
    let hrHand = document.getElementById('analog-clock-hr-hand');
    if(hr < 12){
        hr++
        var formattedNum =('0' + hr).slice(-2);
        document.getElementById('hours').innerHTML = formattedNum;
    }else{
        hr = 1;
        var formattedNum =('0' + hr).slice(-2);
        document.getElementById('hours').innerHTML = formattedNum;
        let meridiem = document.getElementById('meridiem').innerHTML;
        if(meridiem == 'pm'){
            meridiem = 'am';
            document.getElementById('meridiem').innerHTML = meridiem;
        }else{
            meridiem = 'pm';
            document.getElementById('meridiem').innerHTML = meridiem;
        }
    }
    hrHand.style.transform = 'rotate(' + 30*hr + 'deg)';
}