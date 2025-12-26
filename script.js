// 定義音符對應的頻率 (Hz)
const NOTE_FREQUENCIES = {
    "C": 261.63, "Cs": 277.18, "D": 293.66, "Ds": 311.13,
    "E": 329.63, "F": 349.23, "Fs": 369.99, "G": 392.00,
    "Gs": 415.30, "A": 440.00, "As": 466.16, "B": 493.88
};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency) {
    if (!frequency) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'triangle'; // 鋼琴般的柔和波形
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 1);
}

const keys = document.querySelectorAll('.key');

function handleKeyAction(keyElement) {
    const note = keyElement.dataset.note;
    playNote(NOTE_FREQUENCIES[note]);
    keyElement.classList.add('active');
    setTimeout(() => keyElement.classList.remove('active'), 150);
}

// 滑鼠點擊事件
keys.forEach(key => {
    key.addEventListener('mousedown', () => handleKeyAction(key));
});

// 鍵盤按下事件
window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const pressedKey = e.key.toUpperCase();
    const keyElement = document.querySelector(`.key[data-key="${pressedKey}"]`);
    if (keyElement) handleKeyAction(keyElement);
});