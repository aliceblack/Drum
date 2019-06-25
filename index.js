function beat() {
    console.log("beat");

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    var oscillator = audioContext.createOscillator();
    var audioContextGain = audioContext.createGain();

    oscillator.type = "triangle";

    audioContextGain.gain.setValueAtTime(1, audioContext.currentTime);
    audioContextGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    oscillator.connect(audioContextGain);
    audioContextGain.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function playSteps(steps) {
    let element = document.getElementById("stepsSequence");

    let i = 0;                     
    function loop () {       
       setTimeout(function () { 
            if (i < steps.length) {
                element.innerHTML += ' '+steps[i];
                if(steps[i]){beat();}   
                loop();
            }  
            i++;                  
       }, 1000)
    }
    loop();
}

function getTrackFromDrumBot() {
    var init = { method: 'GET',
               mode: 'cors',
               cache: 'default' };
    fetch("https://api.noopschallenge.com/drumbot/patterns/nipnop",init)
    .then(response => {
      response.json().then(body=>{
        console.log(body.tracks[0].steps);
        playSteps(body.tracks[0].steps);
      });
    })
    .catch(error => console.log(error))
}

function sequence(){
    getTrackFromDrumBot();
}