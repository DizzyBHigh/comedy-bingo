let sounds = {
    //console.log(slots);
    'applause': new Howl({
        src: ['assets/sounds/Audience_Applause-Matthiew11-1206899159.mp3'],
        volume: 1.0,
    }),
    'toggle': new Howl({
        src: ['assets/sounds/Toggle-SoundBible.com-231290292.mp3'],
        volume: 1.0,
    }),
    'crumbling': new Howl({
        src: ['assets/sounds/Crumbling-Mike_Koenig-1123041125.mp3'],
        volume: 1.0,
    }),
    'fireBow': new Howl({
        src: ['assets/sounds/fire_bow_sound-mike-koenig.mp3'],
        volume: 1.0,
    }),
    'marbles': new Howl({
        src: ['assets/sounds/marbles-daniel_simon.mp3'],
        volume: 1.0,
    }),
    'pokerChips': new Howl({
        src: ['assets/sounds/poker-chips-daniel_simon.mp3'],
        volume: 1.0,
    }),
    'smsBeep': new Howl({
        src: ['assets/sounds/sms-alert-5-daniel_simon.mp3'],
        volume: 1.0,
    }),
    'tick': new Howl({
        src: ['assets/sounds/Tick-DeepFrozenApps-397275646.mp3'],
        volume: 1.0,
    }),
    'bible': new Howl({
        src: ['assets/sounds/Toggle-SoundBible.com-231290292.mp3'],
        volume: 1.0,
    }),
    'blop': new Howl({
        src: ['assets/sounds/Blop-Mark_DiAngelo-79054334.mp3'],
        volume: 1.0,
    }),
    'bell': new Howl({
        src: ['assets/sounds/old-fashioned-door-bell-daniel_simon.mp3'],
        volume: 1.0,
        sprite: {
            bell: [0, 4000]
        }
    }),
    'buzzer': new Howl({
        src: ['assets/sounds/Door Buzzer-SoundBible.com-1567875395.mp3'],
        volume: 1.0,
    }),
    'play': function(sound = 'smsBeep'){
        console.log("Playing: "+sound);
        sounds[sound].play();
    },
    'playSprite': function(sound = 'bell', sprite = 'bell'){
        console.log("Playing Sprite: "+sound+' - '+sprite);
        sounds[sound].play(sprite);
    }
};


