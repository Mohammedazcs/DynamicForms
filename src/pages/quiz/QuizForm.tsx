import { useState } from "react";
import { quizData } from "./data";
import QuizResults from "./QuizResults";

const QuizForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Change to selectedOption
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(quizData.length).fill(null)
  );
  const scorePerQuestion = 100 / quizData.length;

  const handleAnswerOptionClick = (option) => {
    setSelectedOption(option); // Use single selectedOption
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    const currentQuestionData = quizData[currentQuestion];
    const correctAnswer = currentQuestionData.answer;

    const isAnswerCorrect = correctAnswer === selectedOption;

    if (isAnswerCorrect) {
      setScore(score + 1);
    }

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestion] = selectedOption;
    setSelectedAnswers(updatedSelectedAnswers);

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null); // Reset selectedOption for the next question
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null); // Reset selectedOption when restarting quiz
    setSelectedAnswers(Array(quizData.length).fill(null));
  };

  let totalScore = 0; // Initialize to 0
  if (showScore) {
    totalScore = selectedAnswers.reduce((acc, answer, index) => {
      const questionData = quizData[index];
      return acc + (answer === questionData.answer ? scorePerQuestion : 0);
    }, 0);
  }

  return (
    <div className="bg-white px-32">
   {showScore ? (
        <QuizResults
          totalScore={totalScore}
          selectedAnswers={selectedAnswers}
          scorePerQuestion={scorePerQuestion}
          quizData={quizData}
          handleRestartQuiz={handleRestartQuiz}
        />
      ) : (
        /*   <div className="bg-white p-6 rounded-lg shadow-md"> */

        <div className="flex flex-col gap-8 bg">
          <span className="text-lg font-bold">
            Question {currentQuestion + 1}/{quizData.length}
          </span>
          <p>{quizData[currentQuestion].question}</p>
          {quizData[currentQuestion].options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio" // Change input type to radio
                className="form-radio h-5 w-5 text-blue-600"
                checked={selectedOption === option} // Check against selectedOption
                onChange={() => handleAnswerOptionClick(option)}
              />
              <span>{option}</span>
            </label>
          ))}

          <div className="mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleNextQuestion}
              disabled={selectedOption === null} // Disable if no option selected
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizForm;
