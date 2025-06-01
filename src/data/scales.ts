export interface ScaleData {
  name: string;
  notes: string[];
  positions: number[]; // For string instruments: fret positions
  fingers: number[]; // Finger numbers for string instruments
  baseFret: number;
  instrument: 'guitar' | 'bass' | 'ukulele' | 'piano';
  keys?: string[]; // For piano scales
  pattern?: number[]; // Interval pattern (semitones)
}

export type ScaleType = 'major' | 'minor' | 'pentatonic-major' | 'pentatonic-minor' | 'blues' | 'dorian' | 'mixolydian';

export const instrumentStrings: Record<string, string[]> = {
  guitar: ['E', 'A', 'D', 'G', 'B', 'E'],
  bass: ['G', 'D', 'A', 'E'],
  ukulele: ['G', 'C', 'E', 'A'],
  piano: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] // Octave keys
};

// Scale interval patterns (in semitones)
export const scalePatterns: Record<ScaleType, number[]> = {
  'major': [2, 2, 1, 2, 2, 2, 1],
  'minor': [2, 1, 2, 2, 1, 2, 2],
  'pentatonic-major': [2, 2, 3, 2, 3],
  'pentatonic-minor': [3, 2, 2, 3, 2],
  'blues': [3, 2, 1, 1, 3, 2],
  'dorian': [2, 1, 2, 2, 2, 1, 2],
  'mixolydian': [2, 2, 1, 2, 2, 1, 2]
};

// Generate notes for a scale given root note and pattern
export const generateScaleNotes = (rootNote: string, pattern: number[]): string[] => {
  const noteOrder = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const startIndex = noteOrder.indexOf(rootNote);
  const notes = [rootNote];
  
  let currentIndex = startIndex;
  for (const interval of pattern) {
    currentIndex = (currentIndex + interval) % 12;
    notes.push(noteOrder[currentIndex]);
  }
  
  return notes;
};

export const scaleDatabase: Record<string, ScaleData[]> = {
  // C Major Scale
  "C-major": [
    { 
      name: "C Major Scale", 
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], 
      positions: [3, 5, 2, 4, 5, 2, 4], 
      fingers: [2, 4, 1, 2, 4, 1, 3], 
      baseFret: 1, 
      instrument: 'guitar',
      pattern: scalePatterns.major
    },
    { 
      name: "C Major Scale", 
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], 
      positions: [3, 5, 2, 4], 
      fingers: [2, 4, 1, 3], 
      baseFret: 1, 
      instrument: 'bass',
      pattern: scalePatterns.major
    },
    { 
      name: "C Major Scale", 
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], 
      positions: [0, 2, 4, 5], 
      fingers: [0, 1, 3, 4], 
      baseFret: 1, 
      instrument: 'ukulele',
      pattern: scalePatterns.major
    },
    { 
      name: "C Major Scale", 
      notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], 
      positions: [], 
      fingers: [], 
      baseFret: 1, 
      instrument: 'piano',
      keys: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
      pattern: scalePatterns.major
    }
  ],
  
  // A Minor Scale
  "A-minor": [
    { 
      name: "A Minor Scale", 
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
      positions: [0, 2, 3, 0, 2, 3, 1], 
      fingers: [0, 1, 3, 0, 1, 3, 1], 
      baseFret: 1, 
      instrument: 'guitar',
      pattern: scalePatterns.minor
    },
    { 
      name: "A Minor Scale", 
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
      positions: [0, 2, 3, 0], 
      fingers: [0, 1, 3, 0], 
      baseFret: 1, 
      instrument: 'bass',
      pattern: scalePatterns.minor
    },
    { 
      name: "A Minor Scale", 
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
      positions: [2, 0, 0, 1], 
      fingers: [2, 0, 0, 1], 
      baseFret: 1, 
      instrument: 'ukulele',
      pattern: scalePatterns.minor
    },
    { 
      name: "A Minor Scale", 
      notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
      positions: [], 
      fingers: [], 
      baseFret: 1, 
      instrument: 'piano',
      keys: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      pattern: scalePatterns.minor
    }
  ],

  // G Major Pentatonic
  "G-pentatonic-major": [
    { 
      name: "G Major Pentatonic", 
      notes: ['G', 'A', 'B', 'D', 'E'], 
      positions: [3, 0, 2, 0, 3], 
      fingers: [3, 0, 2, 0, 3], 
      baseFret: 1, 
      instrument: 'guitar',
      pattern: scalePatterns['pentatonic-major']
    },
    { 
      name: "G Major Pentatonic", 
      notes: ['G', 'A', 'B', 'D', 'E'], 
      positions: [3, 0, 2, 0], 
      fingers: [3, 0, 2, 0], 
      baseFret: 1, 
      instrument: 'bass',
      pattern: scalePatterns['pentatonic-major']
    },
    { 
      name: "G Major Pentatonic", 
      notes: ['G', 'A', 'B', 'D', 'E'], 
      positions: [0, 2, 4, 2], 
      fingers: [0, 1, 3, 2], 
      baseFret: 1, 
      instrument: 'ukulele',
      pattern: scalePatterns['pentatonic-major']
    },
    { 
      name: "G Major Pentatonic", 
      notes: ['G', 'A', 'B', 'D', 'E'], 
      positions: [], 
      fingers: [], 
      baseFret: 1, 
      instrument: 'piano',
      keys: ['G', 'A', 'B', 'D', 'E'],
      pattern: scalePatterns['pentatonic-major']
    }
  ],

  // A Minor Pentatonic
  "A-pentatonic-minor": [
    { 
      name: "A Minor Pentatonic", 
      notes: ['A', 'C', 'D', 'E', 'G'], 
      positions: [0, 3, 0, 2, 3], 
      fingers: [0, 3, 0, 1, 4], 
      baseFret: 1, 
      instrument: 'guitar',
      pattern: scalePatterns['pentatonic-minor']
    },
    { 
      name: "A Minor Pentatonic", 
      notes: ['A', 'C', 'D', 'E', 'G'], 
      positions: [0, 3, 0, 2], 
      fingers: [0, 3, 0, 2], 
      baseFret: 1, 
      instrument: 'bass',
      pattern: scalePatterns['pentatonic-minor']
    },
    { 
      name: "A Minor Pentatonic", 
      notes: ['A', 'C', 'D', 'E', 'G'], 
      positions: [2, 0, 2, 0], 
      fingers: [2, 0, 2, 0], 
      baseFret: 1, 
      instrument: 'ukulele',
      pattern: scalePatterns['pentatonic-minor']
    },
    { 
      name: "A Minor Pentatonic", 
      notes: ['A', 'C', 'D', 'E', 'G'], 
      positions: [], 
      fingers: [], 
      baseFret: 1, 
      instrument: 'piano',
      keys: ['A', 'C', 'D', 'E', 'G'],
      pattern: scalePatterns['pentatonic-minor']
    }
  ],

  // A Blues Scale
  "A-blues": [
    { 
      name: "A Blues Scale", 
      notes: ['A', 'C', 'D', 'D#', 'E', 'G'], 
      positions: [0, 3, 0, 1, 2, 3], 
      fingers: [0, 3, 0, 1, 2, 4], 
      baseFret: 1, 
      instrument: 'guitar',
      pattern: scalePatterns.blues
    },
    { 
      name: "A Blues Scale", 
      notes: ['A', 'C', 'D', 'D#', 'E', 'G'], 
      positions: [0, 3, 0, 1], 
      fingers: [0, 3, 0, 1], 
      baseFret: 1, 
      instrument: 'bass',
      pattern: scalePatterns.blues
    },
    { 
      name: "A Blues Scale", 
      notes: ['A', 'C', 'D', 'D#', 'E', 'G'], 
      positions: [2, 0, 2, 1], 
      fingers: [3, 0, 2, 1], 
      baseFret: 1, 
      instrument: 'ukulele',
      pattern: scalePatterns.blues
    },
    { 
      name: "A Blues Scale", 
      notes: ['A', 'C', 'D', 'D#', 'E', 'G'], 
      positions: [], 
      fingers: [], 
      baseFret: 1, 
      instrument: 'piano',
      keys: ['A', 'C', 'D', 'D#', 'E', 'G'],
      pattern: scalePatterns.blues
    }
  ]
};

export const searchScales = (query: string, instrument?: string): ScaleData[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return Object.values(scaleDatabase)
      .flat()
      .filter(scale => !instrument || scale.instrument === instrument);
  }
  
  return Object.entries(scaleDatabase)
    .filter(([key, scales]) => 
      key.toLowerCase().includes(normalizedQuery) ||
      scales.some(scale => scale.name.toLowerCase().includes(normalizedQuery))
    )
    .flatMap(([_, scales]) => scales)
    .filter(scale => !instrument || scale.instrument === instrument);
};
