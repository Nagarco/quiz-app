import React, { useReducer } from "react";
import QuestionCard from "./components/question-card";
import { fetchQuestions } from "./API";
import { Difficulty } from "./shared/enums";
import { TOTAL_QUESTIONS, initialState, quizReducer } from "./quizState";
import { GlobalStyle, Wrapper } from './App.styles'

const App = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const { gameover, userAnswers, loading, score, number, questions } = state;

  const startQuiz = async () => {
    dispatch({ type: "START_QUIZ" }); 

    try {
      const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
      dispatch({ type: "START_QUIZ_SUCCESS", payload: newQuestions }); 
    } catch (error) {
      dispatch({ type: "START_QUIZ_FAILURE" }); 
    }
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
     dispatch({ type: "CHECK_ANSWER", payload: event.currentTarget.value });
  };

  const nextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>QUIZ APP</h1>
        {gameover || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}
        {!gameover && <p className="score">Score: {score}</p>}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameover && (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers?.[number]}
            callback={checkAnswer}
          />
        )}
        {userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
