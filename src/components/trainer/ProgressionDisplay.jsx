function ProgressionDisplay({ completedChords, currentProgression, progressionIndex, progressionKey }) {
  if (!currentProgression) {
    return null;
  }

  return (
    <div className="progression-display">
      <div className="progression-name">
        {progressionKey} - {currentProgression.name}
      </div>
      <div className="progression-chords">
        {currentProgression.chords.map((chord, index) => (
          <div
            key={index}
            className={`progression-chord ${index === progressionIndex ? 'current' : ''} ${completedChords.includes(index) ? 'completed' : ''}`}
          >
            {chord.displayName}
            <div
              className={`progression-indicator ${index === progressionIndex ? 'current' : ''} ${completedChords.includes(index) ? 'completed' : ''}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressionDisplay;
