import { useEffect } from 'react';
import GameLogic from '../../game-logic.js';

function GameSummary({ questionCount, settings, score, accuracy, highestStreak, wrongNotesCount, totalAttempts, difficulty, failedChordName, onRestart }) {
  const isPractice = GameLogic.isPracticeMode(difficulty || settings.difficulty);

  const previousBest = parseInt(localStorage.getItem('bestStreak') || '0');
  const isNewRecord = !isPractice && highestStreak > previousBest;

  let gemCount = 0;
  if (!isPractice) {
    if (accuracy === 100 && wrongNotesCount === 0) {
      gemCount = 5;
    } else if (accuracy >= 80) {
      gemCount = 4;
    } else if (accuracy >= 60) {
      gemCount = 3;
    } else if (accuracy >= 40) {
      gemCount = 2;
    } else if (accuracy >= 20) {
      gemCount = 1;
    } else {
      gemCount = 0;
    }
  }

  useEffect(() => {
    if (isNewRecord && highestStreak > 0) {
      localStorage.setItem('bestStreak', highestStreak.toString());
    }

    const gameResults = {
      score,
      gemCount,
      accuracy,
      highestStreak,
      wrongNotesCount,
      date: new Date().toISOString()
    };

    const existingResults = JSON.parse(localStorage.getItem('gameResults') || '[]');
    existingResults.push(gameResults);

    localStorage.setItem('gameResults',
      JSON.stringify(existingResults.slice(-10)));
  }, [isNewRecord, highestStreak, score, gemCount, accuracy, wrongNotesCount]);

  return (
    <div className="game-summary">
      <h3>Game Summary</h3>

      {!isPractice && failedChordName && (
        <div className="failed-chord-display">
          <div className="failed-chord-value">{failedChordName}</div>
          <div className="failed-chord-label">Failed Chord</div>
        </div>
      )}

      <div className="summary-row">
        <div className="summary-item">
          <div className="summary-value">
            {isPractice ? questionCount : settings.questionCount}
          </div>
          <div className="summary-label">Questions</div>
        </div>

        <div className="summary-divider">|</div>

        <div className="summary-item">
          <div className="summary-value">
            {(difficulty || settings.difficulty).charAt(0).toUpperCase() + (difficulty || settings.difficulty).slice(1)}
          </div>
          <div className="summary-label">Difficulty</div>
        </div>
      </div>

      <div className="summary-row">
        <div className="summary-item">
          <div className="summary-value">{accuracy}%</div>
          <div className="summary-label">Accuracy</div>
        </div>

        {!isPractice && (
          <>
            <div className="summary-divider">|</div>
            <div className="summary-item">
              <div className="summary-value">{score}</div>
              <div className="summary-label">Final Score</div>
            </div>
          </>
        )}

        {!isPractice && (
          <>
            <div className="summary-divider">|</div>
            <div className="summary-item">
              <div className={`summary-value ${isNewRecord ? 'new-record' : ''}`}>
                {highestStreak} {isNewRecord && '🏆'}
              </div>
              <div className="summary-label">
                Highest Streak
                {isNewRecord && previousBest > 0 && (
                  <div className="previous-best">Previous: {previousBest}</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {!isPractice && (
        <div className="gem-row">
          <div className="gem-container">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`gem ${i < gemCount ? 'filled' : ''}`}
              >
                ♦
              </div>
            ))}
          </div>
          <div className="gem-label"></div>
        </div>
      )}

      <button className="restart-button" onClick={onRestart}>Play Again</button>
    </div>
  );
}

export default GameSummary;
