
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

// Chord definitions - maps chord names to note arrays
const chordNotes: { [key: string]: string[] } = {
  'C': ['C', 'E', 'G'],
  'Cm': ['C', 'Eb', 'G'],
  'C7': ['C', 'E', 'G', 'Bb'],
  'Cmaj7': ['C', 'E', 'G', 'B'],
  'G': ['G', 'B', 'D'],
  'Gm': ['G', 'Bb', 'D'],
  'G7': ['G', 'B', 'D', 'F'],
  'Am': ['A', 'C', 'E'],
  'A': ['A', 'C#', 'E'],
  'A7': ['A', 'C#', 'E', 'G'],
  'F': ['F', 'A', 'C'],
  'Fm': ['F', 'Ab', 'C'],
  'F7': ['F', 'A', 'C', 'Eb'],
  'Em': ['E', 'G', 'B'],
  'E': ['E', 'G#', 'B'],
  'E7': ['E', 'G#', 'B', 'D'],
  'Dm': ['D', 'F', 'A'],
  'D': ['D', 'F#', 'A'],
  'D7': ['D', 'F#', 'A', 'C']
};

class ChordAudioPlayer {
  private audioContext: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private parseChordName(chordName: string): string {
    // Extract the base chord name (e.g., "Em" from "Em", "C7" from "C7", etc.)
    const match = chordName.match(/^([A-G][#b]?(?:m|maj7|7|dim|aug)?)/);
    return match ? match[1] : chordName;
  }

  async playChord(chordName: string): Promise<void> {
    const ctx = this.getAudioContext();
    
    // Resume audio context if needed (browser autoplay policy)
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    const baseChord = this.parseChordName(chordName);
    const notes = chordNotes[baseChord];
    
    if (!notes) {
      console.warn(`No notes found for chord: ${chordName}`);
      return;
    }

    const duration = 2; // seconds
    const now = ctx.currentTime;

    // Create oscillators for each note in the chord
    notes.forEach((note, index) => {
      const frequency = noteFrequencies[note];
      if (!frequency) return;

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.type = 'sine';

      // Set volume envelope (attack, sustain, release)
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1); // attack
      gainNode.gain.setValueAtTime(0.1, now + duration - 0.3); // sustain
      gainNode.gain.linearRampToValueAtTime(0, now + duration); // release

      oscillator.start(now);
      oscillator.stop(now + duration);
    });
  }
}

export const chordAudioPlayer = new ChordAudioPlayer();
