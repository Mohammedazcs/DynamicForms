import React from "react";
import { FaTimes } from "react-icons/fa";

interface QuestionDetailsModalProps {
  questionData: {
    question: string;
    answer: string;
    details: {
      overview: string;
    };
  };
  onClose: () => void;
}

const QuestionDetailsModal: React.FC<QuestionDetailsModalProps> = ({
  questionData,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl relative">
        <button
          className="py-2 px-4 rounded  absolute top-0 right-0"
          onClick={onClose}
        >
          <FaTimes style={{ fontSize: "1.5rem" }} />
        </button>
        <h2 className="text-2xl font-bold mb-4">{questionData.question}</h2>
        <p className="mb-4 text-lg leading-loose">
          {questionData.details?.overview}
        </p>
      </div>
    </div>
  );
};

export default QuestionDetailsModal;
