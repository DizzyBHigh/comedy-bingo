$(document).ready(function () {
  $.fn.pulse = function (options) {
    var options = $.extend({
      times: 3,
      duration: 1000
    }, options);

    var period = function (callback) {
      $(this).animate({opacity: 0}, options.duration, function () {
        $(this).animate({opacity: 1}, options.duration, callback);
      });
    };
    return this.each(function () {
      var i = +options.times, self = this,
          repeat = function () {
            --i && period.call(self, repeat)
          };
      period.call(this, repeat);
    });
  };

  let comics = [
    {name: 'Deo Katunga',
      color: 'warning',
      words: [
          "Old people",
          "Body Odour",
          "Racism",
          "Sex",
          "Weird Shit",
          "Ghosts",
          "This Club",
          "Bingo",
          "Yo Momma",
          "Biking",
      ],
    },
    {
      name: 'Foster Yow',
      color: 'info',
      words: [
        "TV Shows",
        "Guns",
        "Blessing",
        "Evolution",
        "Single",
        "Getting Old",
        "Highlander",
        "Conversation",
        "Tired",
        "Emails",
      ],
    },
    {
      name: 'Saeed Green',
      color: 'success',
      words: [
        "Animals",
        "Ugly Feet",
        "U-Bahn",
        "Dating",
        "Berlin",
        "School",
        "Comedians",
        "Women",
        "The Gym",
        "Veganism"
      ],
    },
  ];
  let bingoCardURL = 'https://mfbc.us/m/cwr6um';
  let gameInfo = '<div class="cardlink">Ask for a Bingo card, or get a card on your phone from: <a class="cardlink" href="' + bingoCardURL + '" >' + bingoCardURL + '</a></div>';
  let slots = [];
  let balls = [];
  let calledBalls = [];
  let moveNext = [];
  let gameRound = [
    {
      'round': 'Waiting To Start',
      'btn': 'Begin',
      'text': 'Get your Bingo Card',
      'img': './assets/img/blank-card.jpg'
    },
    {
      'round': 'Round One',
      'btn': 'Round One',
      'text': 'One Line or all 4 Corners',
      'img': './assets/img/one-line.gif'
    },
    {
      'round': 'Round Two',
      'btn': 'Round Two',
      'text': 'Two Lines same direction',
      'img': './assets/img/two-lines.gif'
    },
    {
      'round': 'Round Three',
      'btn': 'Round Three',
      'text': 'Three Lines same direction',
      'img': './assets/img/three-lines.gif'
    },
    {
      'round': 'Final Round',
      'btn': 'Final Round',
      'text': 'Full House - all squares',
      'img': './assets/img/full-house.jpg'
    }
  ];
  let currentRound = 0;
  let setRound = function (round) {
    $('#round-name').html(round.round);
    $('#round-text').html(round.text);
    $('#cond-img').attr('src', round.img);
    $('#nextround').html(round.btn);
    currentRound++;
  };
  let nextRound = function () {
    if (currentRound <= gameRound.length) {
      setRound(gameRound[currentRound]);
      $('#roundPanel').show();
      return;
    }
    currentRound = 0;
    setRound(gameRound[0]);
  };


  let singleShuffle = function (slots) {
    let m = slots.length;
    // Pick a remaining element…
    let i = Math.floor(Math.random() * m--);
    let t = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    let x = slots[i].ball; //store the current element
    slots[i].ball = slots[t].ball;
    refreshBoardBall(slots[i]);
    slots[t].ball = x;
    refreshBoardBall(slots[t]);
    //add move stuff here....
  };
  // Get Divs for Current SLot
  let getBoardSlotDiv = function (slot) {
    return ('<div id="' + slot.div + '" class="ball badge badge-pill badge-secondary">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>');
  };
  let getBoardBallDiv = function (slot) {
    return ('<div id="' + slot.div + '" class="ball badge badge-pill badge-' + slot.ball.color + '">' + slot.ball.word + '</div>');
  };
  let getCurrentBallDiv = function (slot) {
    return ('<div id="current-ball" class="ball badge badge-pill badge-' + slot.ball.color + '">' + slot.ball.word + '</div>');
  };
  let getCalledBallDiv = function (slot) {
    return ('<div id="called-' + slot.id + '" class="pool-ball badge badge-pill badge-' + slot.ball.color + '">' + slot.ball.word + '</div>');
  };
  let getCalledZoneDiv = function (slot) {
    return ('<div id="calledHidden-' + slot.id + '" class="pool-ball badge badge-pill badge-' + slot.ball.color + '">' + slot.ball.word + '</div>');
  };
  // Array for handling how long the cycles last
  let cycleCount = function () {
    let num = slots.length;
    if (num > 40) {
      return 30;
    }
    if (num > 30 && num <= 40) {
      return 35;
    }
    if (num > 20 && num <= 30) {
      return 25;
    }
    if (num > 10 && num <= 20) {
      return 15;
    }
    if (num > 5 && num <= 10) {
      return 12;
    }
    if (num <= 5) {
      return 7;
    }
    return (10);
  };
  // Init The Bing Game
  let initBingo = function (comics) {
    slots = [];
    balls = [];
    calledBalls = [];
    $('#load').show();
    $('#info-panel').html(gameInfo);
    //$('#shuffle').hide();
    $('#call-panel').hide();
    let count = 0;
    comics.forEach(function (comic) {
      comic.words.forEach(function (word) {
        let ball = {
          'id': count,
          'boardGoneClass': 'ball badge badge-pill badge-secondary ',
          'boardActiveClass': 'ball badge badge-pill badge-' + comic.color + ' ',
          'callSpotClass': 'current-ball ball badge badge-pill badge-' + comic.color + ' ',
          'callPoolClass': 'pool-ball ball badge badge-pill badge-' + comic.color + ' ',
          'color': comic.color,
          'word': word
        };
        balls.push(ball);
        let slot = {
          'id': count,
          'jdiv': '#slot-' + count,
          'div': 'slot-' + count,
          'callledDiv': '#called-' + count,
          'color': 'secondary',
          'ball': ball
        };
        slots.push(slot);
        //$('#bingo-board').append(getBoardSlotDiv(slot));

        count++;
      });
    });
    $('#ball-count').html('Press Call to Start');
    $('#ball-left').html(' (' + (slots.length) + ' Balls Left )');
    $('#round-panel').hide();
    $('#nextround').html('Start');
  };
  // Refresh SIngle Ball on Board
  let refreshBoardBall = function (slot) {
    let myDiv = getBoardBallDiv(slot);

    $(slot.jdiv).fadeOut('fast', function () {
      $(this).replaceWith(myDiv);//need to animate
      sounds.play('toggle');
    });
    $(slot.jdiv).fadeIn('fast)').pulse(1, 300);
  };
  //Refresh All Balls on Board
  // let refreshBoardBalls = function(slots){
  //     slots.forEach(function(slot){
  //         refreshBoardBall(slot);
  //     });
  // };
  // flash ball
  let flashBall = function (slot) {
    $(slot.jdiv).pulse({times: 1, duration: 300})
  };
  // Set Slot as Current Ball
  let setCurrent = function (slot) {
    let div = getCurrentBallDiv(slot);
    $('#current-ball').replaceWith(div).pulse({times: 1, duration: 300})
  };
  // Cycle through Balls and Flash
  let cycleBalls = function () {
    let m = slots.length;
    let slot = slots[Math.floor(Math.random() * m)];
    flashBall(slot);
    setCurrent(slot);
  };
  //Move Selected Ball to Call Area
  let moveToCalled = function () {
    //$('#ball-count').html('');
    if (moveNext && moveNext.length) {
      //console.log(moveNext[0]);
      let slot = moveNext[moveNext.length - 1];
      let div = getCalledBallDiv(slot);
      let hiddencall = getCalledZoneDiv(slot);
      $('#call-zone').append(div);

      $('#hidden-call-zone').append(hiddencall);
      $('#called-' + slot.id).fadeIn('slow', 500).pulse(1, 300);
      if (moveNext.length >= 6) {
        $('#call-zone').find('div').first().remove().fadeOut();
      }
    }
  };

  // Pick Selected Ball
  let pickBall = function () {
    let m = slots.length;
    let i = Math.floor(Math.random() * m);
    let slot = slots[i];
    flashBall(slot);
    setCurrent(slot);
    let div = getBoardSlotDiv(slot);
    $(slot.jdiv).replaceWith(div);
    moveNext.push(slot);
    slots.splice(i, 1);
    console.log(slots);

    sounds.play('smsBeep');
    let currentBall = moveNext.length;
    $('#ball-count').html('Ball - ' + currentBall);
    $('#ball-left').html(' (' + (slots.length) + ' Balls Left )');
    moveToCalled();
  };
  // Ball Loader
  let loadTimer = function (slots) {
    $('#bingo-board').html('');
    slots.forEach(function (slot) {
      $('#bingo-board').append(getBoardSlotDiv(slot));
      setTimeout(function () {
        refreshBoardBall(slot);
      }, Math.random() * 1000);
    });
    $('#load').hide();
    nextRound();
    $('#call-panel').show();
    $('#round-panel').show();
  };
  // Ball Loopers
  let looper = function (arr, callback, time, factor) {
    let i = 0, total = arr.length * factor;
    $('#blips > .progress-bar').attr("style", "width: 0%");
    let loop = function () {
      // RUN CODE
      callback(arr);
      $('#blips > .progress-bar').attr("style", "width:" + (i / total * 100) + "%");
      if (i < total) {
        i++;
      } else { // LOOP END
        //$('#call-panel').show();
        $('#blips').hide();
        sounds.play('toggle');
        return;
      }
      setTimeout(loop, time);
    };
    loop();
  };
  let caller = function (callback, time, count, final) {
    //console.log('loop run');
    let i = 0;

    let loop = function () {
      // RUN CODE
      callback();
      sounds.play('toggle');
      //console.log(i);
      //console.log(slot[i], i);
      if (i < count) {
        i++;
      } else { // LOOP END
        final();
        return;
      }
      setTimeout(loop, time);
    };
    loop();
  };
  let newGame = function() {
    stopTimer();
    $('body').removeClass('blackout');
    //$('#call').text('Call').removeClass('disabled');
    //$('.timer-group').removeClass('d-none')

    timerStart = $('#timer-count').val();
    $('#input').html("Start");
  };

  initBingo(comics);
  $('#blips').hide();
  // BUTTONS
  $('#load, #newgame').click(function () {
    stopTimer();
    $('body').removeClass('blackout');
    //$('#call').text('Call').removeClass('disabled');
    //$('.timer-group').removeClass('d-none')
    timerStart = $('#timer-count').val();
    $('#input').html("Start");
    loadTimer(slots);
  });
  $('#shuffle').click(function () {
    $('#blips').show().fadeIn('slow');
    looper(slots, singleShuffle, 200, 3);
  });
  $('#call').click(function () {
    //moveToCalled();
    stopTimer();
    caller(cycleBalls, 250, cycleCount(), pickBall);
  });
  $('#showcalled').click(function () {
    $("#hidden-call-zone").toggleClass('d-none');
    $("#call-zone").toggleClass('d-none');
  });
  $('#nextround').click(function () {
    //$('#call').click();
    nextRound();
  });



  $(window).keydown(function(event){
    if(event.keyCode == 39 || event.keyCode == 13){
      event.preventDefault();
      stopTimer();
      $('#call').click();
      // $('body').css('cursor', 'none');
    }
  });
});
