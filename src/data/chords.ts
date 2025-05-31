
export interface ChordData {
  name: string;
  positions: number[]; // Fret positions for each string (0 = open, -1 = muted)
  fingers: number[]; // Finger numbers (0 = open/muted, 1-4 = fingers)
  baseFret: number; // Starting fret for display
}

export const chordDatabase: Record<string, ChordData> = {
  // Major Chords
  "C": { name: "C Major", positions: [0, 1, 0, 2, 3, 0], fingers: [0, 1, 0, 2, 3, 0], baseFret: 1 },
  "D": { name: "D Major", positions: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], baseFret: 1 },
  "E": { name: "E Major", positions: [0, 2, 2, 1, 0, 0], fingers: [0, 3, 2, 1, 0, 0], baseFret: 1 },
  "F": { name: "F Major", positions: [1, 1, 3, 3, 2, 1], fingers: [1, 1, 4, 3, 2, 1], baseFret: 1 },
  "G": { name: "G Major", positions: [3, 2, 0, 0, 3, 3], fingers: [3, 2, 0, 0, 4, 4], baseFret: 1 },
  "A": { name: "A Major", positions: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], baseFret: 1 },
  "B": { name: "B Major", positions: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1 },

  // Minor Chords
  "Am": { name: "A Minor", positions: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], baseFret: 1 },
  "Bm": { name: "B Minor", positions: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1 },
  "Cm": { name: "C Minor", positions: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], baseFret: 1 },
  "Dm": { name: "D Minor", positions: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1], baseFret: 1 },
  "Em": { name: "E Minor", positions: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], baseFret: 1 },
  "Fm": { name: "F Minor", positions: [1, 1, 3, 3, 2, 1], fingers: [1, 1, 4, 3, 2, 1], baseFret: 1 },
  "Gm": { name: "G Minor", positions: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], baseFret: 1 },

  // Seventh Chords
  "C7": { name: "C Dominant 7", positions: [0, 1, 0, 2, 1, 0], fingers: [0, 1, 0, 3, 2, 0], baseFret: 1 },
  "D7": { name: "D Dominant 7", positions: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 3, 1, 2], baseFret: 1 },
  "E7": { name: "E Dominant 7", positions: [0, 2, 0, 1, 0, 0], fingers: [0, 2, 0, 1, 0, 0], baseFret: 1 },
  "G7": { name: "G Dominant 7", positions: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], baseFret: 1 },
  "A7": { name: "A Dominant 7", positions: [-1, 0, 2, 0, 2, 0], fingers: [0, 0, 2, 0, 3, 0], baseFret: 1 },

  // Sus Chords
  "Dsus4": { name: "D Suspended 4", positions: [-1, -1, 0, 2, 3, 3], fingers: [0, 0, 0, 1, 3, 4], baseFret: 1 },
  "Esus4": { name: "E Suspended 4", positions: [0, 2, 2, 2, 0, 0], fingers: [0, 2, 3, 4, 0, 0], baseFret: 1 },
  "Asus4": { name: "A Suspended 4", positions: [-1, 0, 2, 2, 3, 0], fingers: [0, 0, 1, 2, 4, 0], baseFret: 1 },
};

export const searchChords = (query: string): ChordData[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return Object.values(chordDatabase);
  
  return Object.entries(chordDatabase)
    .filter(([key, chord]) => 
      key.toLowerCase().includes(normalizedQuery) ||
      chord.name.toLowerCase().includes(normalizedQuery)
    )
    .map(([_, chord]) => chord);
};
