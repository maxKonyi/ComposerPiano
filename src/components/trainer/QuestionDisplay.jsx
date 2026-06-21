function QuestionDisplay({ currentChord }) {
  return (
    <div className="question-display">
      {currentChord ? currentChord.displayName : '---'}
    </div>
  );
}

export default QuestionDisplay;
