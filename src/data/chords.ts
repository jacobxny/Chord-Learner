
export interface ChordData {
  name: string;
  positions: number[]; // Fret positions for each string (0 = open, -1 = muted) OR piano keys
  fingers: number[]; // Finger numbers (0 = open/muted, 1-4 = fingers)
  baseFret: number; // Starting fret for display
  instrument: 'guitar' | 'bass' | 'ukulele' | 'piano';
  keys?: string[]; // Piano keys for piano chords
}

export type Instrument = 'guitar' | 'bass' | 'ukulele' | 'piano';

export const instrumentStrings: Record<Instrument, string[]> = {
  guitar: ['E', 'A', 'D', 'G', 'B', 'E'],
  bass: ['G', 'D', 'A', 'E'],
  ukulele: ['G', 'C', 'E', 'A'],
  piano: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] // Octave keys
};

export const chordDatabase: Record<string, ChordData[]> = {
  // Major Chords
  "C": [
    { name: "C Major", positions: [0, 1, 0, 2, 3, 0], fingers: [0, 1, 0, 2, 3, 0], baseFret: 1, instrument: 'guitar' },
    { name: "C Major", positions: [-1, 3, 5, 5], fingers: [0, 1, 3, 4], baseFret: 1, instrument: 'bass' },
    { name: "C Major", positions: [0, 0, 0, 3], fingers: [0, 0, 0, 3], baseFret: 1, instrument: 'ukulele' },
    { name: "C Major", positions: [1, 3, 5], fingers: [1, 3, 5], baseFret: 1, instrument: 'piano', keys: ['C', 'E', 'G'] }
  ],
  "D": [
    { name: "D Major", positions: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1, instrument: 'guitar' },
    { name: "D Major", positions: [-1, 5, 7, 7], fingers: [0, 1, 3, 4], baseFret: 1, instrument: 'bass' },
    { name: "D Major", positions: [2, 2, 2, 0], fingers: [2, 2, 2, 0], baseFret: 1, instrument: 'ukulele' },
    { name: "D Major", positions: [1, 3, 5], fingers: [1, 3, 5], baseFret: 1, instrument: 'piano', keys: ['D', 'F#', 'A'] }
  ],
  "E": [
    { name: "E Major", positions: [0, 2, 2, 1, 0, 0], fingers: [0, 3, 2, 1, 0, 0], baseFret: 1, instrument: 'guitar' },
    { name: "E Major", positions: [0, 2, 2, 1], fingers: [0, 3, 2, 1], baseFret: 1, instrument: 'bass' },
    { name: "E Major", positions: [4, 4, 4, 2], fingers: [3, 3, 3, 1], baseFret: 1, instrument: 'ukulele' },
    { name: "E Major", positions: [1, 3, 5], fingers: [1, 3, 5], baseFret: 1, instrument: 'piano', keys: ['E', 'G#', 'B'] }
  ],
  "F": [
    { name: "F Major", positions: [1, 1, 3, 3, 2, 1], fingers: [1, 1, 4, 3, 2, 1], baseFret: 1, instrument: 'guitar' },
    { name: "F Major", positions: [1, 3, 3, 2], fingers: [1, 3, 4, 2], baseFret: 1, instrument: 'bass' },
    { name: "F Major", positions: [2, 0, 1, 0], fingers: [2, 0, 1, 0], baseFret: 1, instrument: 'ukulele' },
    { name: "F Major", positions: [1, 3, 5], fingers: [1, 3, 5], baseFret: 1, instrument: 'piano', keys: ['F', 'A', 'C'] }
  ],
  "G": [
    { name: "G Major", positions: [3, 2, 0, 0, 3, 3], fingers: [3, 2, 0, 0, 4, 4], baseFret: 1, instrument: 'guitar' },
    { name: "G Major", positions: [3, 5, 5, 4], fingers: [1, 3, 4, 2], baseFret: 1, instrument: 'bass' },
    { name: "G Major", positions: [0, 2, 3, 2], fingers: [0, 1, 3, 2], baseFret: 1, instrument: 'ukulele' },
    { name: "G Major", positions: [1, 3, 5], fingers: [1, 3, 5], baseFret: 1, instrument: 'piano', keys: ['G', 'B', 'D'] }
  ],
  "A": [
    { name: "A Major", positions: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1, instrument: 'guitar' },
    { name: "A Major", positions: [-1, 0, 2, 2], fingers: [0, 0, 1, 2], baseFret: 1, instrument: 'bass' },
    { name: "A Major", positions: [2, 1, 0, 0], fingers: [2, 1, 0, 0], baseFret: 1, instrument: 'ukulele' },
    { name: "A Major", positions: [1, 3, 5], fingers: [1, 3, 5], baseFret: 1, instrument: 'piano', keys: ['A', 'C#', 'E'] }
  ],
  "B": [
    { name: "B Major", positions: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1, instrument: 'guitar' },
    { name: "B Major", positions: [-1, 2, 4, 4], fingers: [0, 1, 3, 4], baseFret: 1, instrument: 'bass' },
    { name: "B Major", positions: [4, 3, 2, 2], fingers: [4, 3, 1, 2], baseFret: 1, instrument: 'ukulele' },
    { name: "B Major", positions: [1, 3, 5], fingers: [1, 3, 5], baseFret: 1, instrument: 'piano', keys: ['B', 'D#', 'F#'] }
  ],

  // Minor Chords
  "Am": [
    { name: "A Minor", positions: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1, instrument: 'guitar' },
    { name: "A Minor", positions: [-1, 0, 2, 1], fingers: [0, 0, 2, 1], baseFret: 1, instrument: 'bass' },
    { name: "A Minor", positions: [2, 0, 0, 0], fingers: [1, 0, 0, 0], baseFret: 1, instrument: 'ukulele' },
    { name: "A Minor", positions: [1, 2, 5], fingers: [1, 2, 5], baseFret: 1, instrument: 'piano', keys: ['A', 'C', 'E'] }
  ],
  "Bm": [
    { name: "B Minor", positions: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1, instrument: 'guitar' },
    { name: "B Minor", positions: [-1, 2, 4, 3], fingers: [0, 1, 4, 2], baseFret: 1, instrument: 'bass' },
    { name: "B Minor", positions: [4, 2, 2, 2], fingers: [4, 1, 1, 1], baseFret: 1, instrument: 'ukulele' },
    { name: "B Minor", positions: [1, 2, 5], fingers: [1, 2, 5], baseFret: 1, instrument: 'piano', keys: ['B', 'D', 'F#'] }
  ],
  "Cm": [
    { name: "C Minor", positions: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1, instrument: 'guitar' },
    { name: "C Minor", positions: [-1, 3, 5, 4], fingers: [0, 1, 4, 2], baseFret: 1, instrument: 'bass' },
    { name: "C Minor", positions: [0, 3, 3, 3], fingers: [0, 1, 1, 1], baseFret: 1, instrument: 'ukulele' },
    { name: "C Minor", positions: [1, 2, 5], fingers: [1, 2, 5], baseFret: 1, instrument: 'piano', keys: ['C', 'Eb', 'G'] }
  ],
  "Dm": [
    { name: "D Minor", positions: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], baseFret: 1, instrument: 'guitar' },
    { name: "D Minor", positions: [-1, 5, 7, 6], fingers: [0, 1, 4, 2], baseFret: 1, instrument: 'bass' },
    { name: "D Minor", positions: [2, 2, 1, 0], fingers: [3, 2, 1, 0], baseFret: 1, instrument: 'ukulele' },
    { name: "D Minor", positions: [1, 2, 5], fingers: [1, 2, 5], baseFret: 1, instrument: 'piano', keys: ['D', 'F', 'A'] }
  ],
  "Em": [
    { name: "E Minor", positions: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1, instrument: 'guitar' },
    { name: "E Minor", positions: [0, 2, 2, 0], fingers: [0, 2, 3, 0], baseFret: 1, instrument: 'bass' },
    { name: "E Minor", positions: [0, 4, 3, 2], fingers: [0, 4, 3, 2], baseFret: 1, instrument: 'ukulele' },
    { name: "E Minor", positions: [1, 2, 5], fingers: [1, 2, 5], baseFret: 1, instrument: 'piano', keys: ['E', 'G', 'B'] }
  ],
  "Fm": [
    { name: "F Minor", positions: [1, 1, 3, 3, 2, 1], fingers: [1, 1, 4, 3, 2, 1], baseFret: 1, instrument: 'guitar' },
    { name: "F Minor", positions: [1, 3, 3, 1], fingers: [1, 3, 4, 1], baseFret: 1, instrument: 'bass' },
    { name: "F Minor", positions: [1, 0, 1, 3], fingers: [1, 0, 2, 4], baseFret: 1, instrument: 'ukulele' },
    { name: "F Minor", positions: [1, 2, 5], fingers: [1, 2, 5], baseFret: 1, instrument: 'piano', keys: ['F', 'Ab', 'C'] }
  ],
  "Gm": [
    { name: "G Minor", positions: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], baseFret: 1, instrument: 'guitar' },
    { name: "G Minor", positions: [3, 5, 5, 3], fingers: [1, 3, 4, 1], baseFret: 1, instrument: 'bass' },
    { name: "G Minor", positions: [0, 2, 3, 1], fingers: [0, 2, 3, 1], baseFret: 1, instrument: 'ukulele' },
    { name: "G Minor", positions: [1, 2, 5], fingers: [1, 2, 5], baseFret: 1, instrument: 'piano', keys: ['G', 'Bb', 'D'] }
  ],

  // Seventh Chords
  "C7": [
    { name: "C Dominant 7", positions: [0, 1, 0, 2, 1, 0], fingers: [0, 1, 0, 3, 2, 0], baseFret: 1, instrument: 'guitar' },
    { name: "C Dominant 7", positions: [-1, 3, 5, 3], fingers: [0, 2, 4, 1], baseFret: 1, instrument: 'bass' },
    { name: "C Dominant 7", positions: [0, 0, 0, 1], fingers: [0, 0, 0, 1], baseFret: 1, instrument: 'ukulele' },
    { name: "C Dominant 7", positions: [1, 3, 5, 7], fingers: [1, 3, 5, 7], baseFret: 1, instrument: 'piano', keys: ['C', 'E', 'G', 'Bb'] }
  ],
  "D7": [
    { name: "D Dominant 7", positions: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 3, 1, 2], baseFret: 1, instrument: 'guitar' },
    { name: "D Dominant 7", positions: [-1, 5, 7, 5], fingers: [0, 2, 4, 1], baseFret: 1, instrument: 'bass' },
    { name: "D Dominant 7", positions: [2, 2, 2, 3], fingers: [1, 1, 1, 2], baseFret: 1, instrument: 'ukulele' },
    { name: "D Dominant 7", positions: [1, 3, 5, 7], fingers: [1, 3, 5, 7], baseFret: 1, instrument: 'piano', keys: ['D', 'F#', 'A', 'C'] }
  ],
  "E7": [
    { name: "E Dominant 7", positions: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], baseFret: 1, instrument: 'guitar' },
    { name: "E Dominant 7", positions: [0, 2, 0, 1], fingers: [0, 3, 0, 1], baseFret: 1, instrument: 'bass' },
    { name: "E Dominant 7", positions: [1, 2, 0, 2], fingers: [1, 2, 0, 3], baseFret: 1, instrument: 'ukulele' },
    { name: "E Dominant 7", positions: [1, 3, 5, 7], fingers: [1, 3, 5, 7], baseFret: 1, instrument: 'piano', keys: ['E', 'G#', 'B', 'D'] }
  ],
  "G7": [
    { name: "G Dominant 7", positions: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1, instrument: 'guitar' },
    { name: "G Dominant 7", positions: [3, 5, 3, 4], fingers: [1, 4, 2, 3], baseFret: 1, instrument: 'bass' },
    { name: "G Dominant 7", positions: [0, 2, 1, 2], fingers: [0, 3, 1, 4], baseFret: 1, instrument: 'ukulele' },
    { name: "G Dominant 7", positions: [1, 3, 5, 7], fingers: [1, 3, 5, 7], baseFret: 1, instrument: 'piano', keys: ['G', 'B', 'D', 'F'] }
  ],
  "A7": [
    { name: "A Dominant 7", positions: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], baseFret: 1, instrument: 'guitar' },
    { name: "A Dominant 7", positions: [-1, 0, 2, 0], fingers: [0, 0, 2, 0], baseFret: 1, instrument: 'bass' },
    { name: "A Dominant 7", positions: [0, 1, 0, 0], fingers: [0, 1, 0, 0], baseFret: 1, instrument: 'ukulele' },
    { name: "A Dominant 7", positions: [1, 3, 5, 7], fingers: [1, 3, 5, 7], baseFret: 1, instrument: 'piano', keys: ['A', 'C#', 'E', 'G'] }
  ]
};

export const searchChords = (query: string, instrument?: Instrument): ChordData[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return Object.values(chordDatabase)
      .flat()
      .filter(chord => !instrument || chord.instrument === instrument);
  }
  
  return Object.entries(chordDatabase)
    .filter(([key, chords]) => 
      key.toLowerCase().includes(normalizedQuery) ||
      chords.some(chord => chord.name.toLowerCase().includes(normalizedQuery))
    )
    .flatMap(([_, chords]) => chords)
    .filter(chord => !instrument || chord.instrument === instrument);
};
