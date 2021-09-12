import React, { useState, useEffect } from "react";
import { newQuiz } from "country-quiz";

function Cards() {
  const [questionNo, setQuestionNo] = useState(0);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [isQuizFinish, seIsQuizFinish] = useState(false);
  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = () => {
    setQuizData(newQuiz());
  };

  const handleAnswerCheck = (selectedOption, ans, index) => {
    setSelected(index);
    if (selectedOption === ans) {
      setIsCorrect(true);
      setCorrectCount((prev) => prev + 1);
    } else {
      setIsCorrect(false);
    }
    setShowNextBtn(true);
  };

  const handleNextClick = () => {
    if (questionNo < quizData.questions.length - 1) {
      setQuestionNo((prev) => prev + 1);
    } else {
      seIsQuizFinish(true);
    }
    setSelected(null);
    setShowNextBtn(false);
  };

  const handlePlayAgain = () => {
    seIsQuizFinish(false);
    fetchQuizData();
    setShowNextBtn(false);
    setSelected(null);
    setCorrectCount(0);
    setQuestionNo(0);
  };

  if (isQuizFinish) {
    return (
      <div className="card-wrapper result-wrap">
        <h1>Results</h1>
        <p>
          You got <span className="correct-ans">{correctCount}</span> correct
          answer(s)
        </p>
        <button onClick={handlePlayAgain} className="play-again ">
          Play Again
        </button>
      </div>
    );
  }
  if (quizData && quizData.questions) {
    let data = quizData.questions[questionNo];
    return (
      <div className="card-wrapper">
        <img
          width="100px"
          height="100px"
          src={data.question}
          alt="countryImage"
        />
        {data.options.map((country, index) => {
          let options = ["A", "B", "C", "D"];
          let selectedCheck = "";
          let isSelected = selected !== null;
          if (selected === index) {
            selectedCheck = isCorrect ? "correct" : "not-correct";
          }
          let correctAns =
            isSelected && data.answer === country ? "correct" : "";
          return (
            <button
              disabled={isSelected}
              key={country}
              onClick={() => handleAnswerCheck(country, data.answer, index)}
              className={`country-option ${selectedCheck} ${correctAns} ${
                isSelected ? "" : "not-selected"
              }`}
            >
              <span>{options[index]}</span>
              <span style={{ color: "black" }} className="">
                {country}
              </span>
            </button>
          );
        })}
        {showNextBtn && (
          <button onClick={handleNextClick} className="next-btn">
            Next
          </button>
        )}
      </div>
    );
  }
  return null;
}

export default Cards;
