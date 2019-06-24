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