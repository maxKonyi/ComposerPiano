import GameLogic from '../../game-logic.js';

function SessionControls({ difficulty, isRunning, onEnd, onSkip, onStart }) {
  return (
    <div className="controls" style={{ marginTop: '1rem' }}>
      {!isRunning ? (
        <button onClick={onStart}>Start Training</button>
      ) : (
        <>
          {GameLogic.isPracticeMode(difficulty) && (
            <button onClick={onSkip} className="skip-button">Skip</button>
          )}
          <button onClick={onEnd} className="end-button">End Game</button>
        </>
      )}
    </div>
  );
}

export default SessionControls;
