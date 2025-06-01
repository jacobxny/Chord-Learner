
// Musical note frequencies in Hz
const noteFrequencies: { [key: string]: number } = {
  'C': 261.63,
  'C#': 277.18, 'Db': 277.18,
  'D': 293.66,
  'D#': 311.13, 'Eb': 311.13,
  'E': 329.63,
  'F': 349.23,
  'F#': 369.99, 'Gb': 369.99,
  'G': 392.00,
  'G#': 415.30, 'Ab': 415.30,
  'A': 440.00,
  'A#': 466.16, 'Bb': 466.16,
  'B': 493.88
};

class ScaleAudioPlayer {
  private audioContext: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  async playScale(notes: string[]): Promise<void> {
    const ctx = this.getAudioContext();
    
    // Resume audio context if needed (browser autoplay policy)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const noteDuration = 0.4; // seconds per note
    const now = ctx.currentTime;

    // Play each note in sequence
    notes.forEach((note, index) => {
      const frequency = noteFrequencies[note];
      if (!frequency) return;

      const startTime = now + (index * noteDuration);
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine';

      // Set volume envelope for each note
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05); // attack
      gainNode.gain.setValueAtTime(0.15, startTime + noteDuration - 0.1); // sustain
      gainNode.gain.linearRampToValueAtTime(0, startTime + noteDuration); // release

      oscillator.start(startTime);
      oscillator.stop(startTime + noteDuration);
    });
  }
}

export const scaleAudioPlayer = new ScaleAudioPlayer();
