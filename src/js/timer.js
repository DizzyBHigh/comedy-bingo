let mylet;
let Default = 90;
let startTime = Default;
let time;
let freq = 1000;
let timerInProcess = false;
let remainingTime = 0;
function advanceTimer() {
    mylet = setTimeout(function () {
        $('#timer').html(time);
        time--;
        if (time === startTime - 1) {

        }
        if (time <=  9 ) {
            sounds.play('tick');
        }
        if (time === -1) {
            stopTimer();
            sounds.play('buzzer');
            return;
        }
        if (!time && time !== 0) {
            return;
        }
        advanceTimer();
    }, freq);
}

function stopTimer() {
    $('#timerControl').addClass('timerRunning').html('<i class="far fa-clock"></i> Start Timer');
    $('#timer').text('90');
    clearTimeout(mylet);
}

$('#timerControl').click(function () {
    if ($(this).hasClass('timerRunning')) {
        // button says Start the timer
        startTime = parseInt(Math.abs($('#setTime').val()));
        if (!startTime) {
            $('#setTime').val(Default);
            startTime = Default;
        }
        time = startTime - 1;
        //sounds.playSprite();
        $('#timer').html(startTime);


        $('#feedback').html('');
        $(this).html('STOP').removeClass('timerRunning');
        advanceTimer();

    } else {
        // button says Stop the timer
        stopTimer();
    }
});
