import React, { useState } from "react";
import QuestionDetailsModal from "./QuestionDetailsModal";
import ImagesModal from "./ImagesModal ";

interface QuizResultsProps {
  totalScore: number;
  selectedAnswers: string[];
  scorePerQuestion: number;
  quizData: { question: string; answer: string, images:[] }[];

  quizData1: { images:[] };

  handleRestartQuiz: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  totalScore,
  selectedAnswers,
  scorePerQuestion,
  quizData,
  handleRestartQuiz,
}) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);



  const [selectedImageIndex, setSelectedImageIndex] = useState<
    number | null
  >(null);


  const handleViewDetails = (questionIndex: number) => {
    setSelectedQuestionIndex(questionIndex);
  };


  const handleShowImages = (questionIndex: number) => {
    setSelectedImageIndex(questionIndex);
  };

  const handleCloseDetails = () => {
    setSelectedQuestionIndex(null);
  };


  const handleCloseImages = () => {
    setSelectedImageIndex(null);
  };

  return (
    <div className="bg-white px-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
        <p className="mb-4">
          Your total score is: {totalScore.toFixed(2)} out of 100
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleRestartQuiz}
        >
          Restart Quiz
        </button>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Answer Comparison</h3>
          <table className="border-collapse border w-full">
            <thead>
              <tr className="border bg-gray-100">
                <th className="border p-2 text-center">SN</th>
                <th className="border p-2 text-left">Question</th>
                <th className="border p-2 text-left">Selected Answer</th>
                <th className="border p-2 text-left">Correct Answer</th>
                <th className="border p-2 text-center">Result</th>
                <th className="border p-2 text-center">Score</th>
                <th className="border p-2 text-center">Detail</th>
              </tr>
            </thead>
            <tbody>
              {quizData.map((questionData, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{questionData.question}</td>
                  <td className="border p-2">{selectedAnswers[index]}</td>
                  <td className="border p-2">{questionData.answer}</td>
                  <td className="border p-2 text-center">
                    {selectedAnswers[index] === questionData.answer ? (
                      <span className="text-green-500">&#10004;</span>
                    ) : (
                      <span className="text-red-500">&#10060;</span>
                    )}
                  </td>
                  <td className="border p-2">
                    {selectedAnswers[index] === questionData.answer
                      ? scorePerQuestion.toFixed(2)
                      : "0.00"}{" "}
                    / 100
                  </td>

                  <td className="border p-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onClick={() => handleViewDetails(index)}
                    >
                      Deatil
                    </button>
                  </td>


                  <td className="border p-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onClick={() => handleShowImages(index)}
                    >
                     Images
                    </button>
                  </td>




                </tr>
              ))}
              <tr className="border">
                <td className="border p-2 text-center" colSpan={4}>
                  <strong>Total Score</strong>
                </td>
                <td className="border p-2">{totalScore.toFixed(2)} / 100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {selectedQuestionIndex !== null && (
        <QuestionDetailsModal
          questionData={quizData[selectedQuestionIndex]}
          onClose={handleCloseDetails}
        />
      )}


{selectedImageIndex !== null && (
  <ImagesModal
    images={quizData[selectedImageIndex]?.images || []}
    onClose={handleCloseImages}
  />
)}



    </div>
  );
};

export default QuizResults;
