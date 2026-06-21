import { Timer } from '../../App.jsx';

function TimerBar({ difficulty, elapsedTime, isRunning, maxSeconds }) {
  return (
    <Timer
      isRunning={isRunning}
      elapsedTime={elapsedTime}
      maxSeconds={maxSeconds}
      difficulty={difficulty}
    />
  );
}

export default TimerBar;
