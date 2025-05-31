
import React from 'react';
import { Guitar, Music } from 'lucide-react';
import { Instrument } from '../data/chords';

interface InstrumentSelectorProps {
  selectedInstrument: Instrument;
  onInstrumentChange: (instrument: Instrument) => void;
}

const InstrumentSelector: React.FC<InstrumentSelectorProps> = ({
  selectedInstrument,
  onInstrumentChange
}) => {
  const instruments: { value: Instrument; label: string; icon: React.ReactNode }[] = [
    { value: 'guitar', label: 'Guitar', icon: <Guitar className="h-5 w-5" /> },
    { value: 'bass', label: 'Bass', icon: <Music className="h-5 w-5" /> },
    { value: 'ukulele', label: 'Ukulele', icon: <Music className="h-5 w-5" /> }
  ];

  return (
    <div className="flex justify-center gap-2 mb-6">
      {instruments.map((instrument) => (
        <button
          key={instrument.value}
          onClick={() => onInstrumentChange(instrument.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedInstrument === instrument.value
              ? 'bg-amber-600 text-white'
              : 'bg-white text-amber-700 border-2 border-amber-300 hover:bg-amber-50'
          }`}
        >
          {instrument.icon}
          {instrument.label}
        </button>
      ))}
    </div>
  );
};

export default InstrumentSelector;
