
// Joyful sound utilities using Web Audio API
export const playHoverSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Pleasant bell-like sound for hover
  oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5 note
  oscillator.frequency.exponentialRampToValueAtTime(659, audioContext.currentTime + 0.1); // E5 note
  
  gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
  
  oscillator.type = 'sine';
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
};

export const playClickSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Create a pleasant chord-like click sound
  const frequencies = [523, 659, 784]; // C5, E5, G5 - C major chord
  
  frequencies.forEach((freq, index) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.03, audioContext.currentTime + index * 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime + index * 0.01);
    oscillator.stop(audioContext.currentTime + 0.3);
  });
};
