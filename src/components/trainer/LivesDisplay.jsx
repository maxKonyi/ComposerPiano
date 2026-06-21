function LivesDisplay({ lives }) {
  return (
    <div className="lives-display">
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`life-icon ${i < lives ? 'life-active' : 'life-lost'}`}>
          ♥
        </div>
      ))}
    </div>
  );
}

export default LivesDisplay;
