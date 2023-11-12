import React from 'react'
import { AnswerObject } from '../shared/interfaces';
import { Wrapper, ButtonWrapper } from './question-card.styles';

type Props = {
  question: string;
  answers: string[];
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const QuestionCard: React.FC<Props> = ({question, answers, userAnswer, questionNum, totalQuestions, callback}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNum} / {totalQuestions}
      </p>

      <p dangerouslySetInnerHTML={{ __html: question }}></p>

      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userclicked={userAnswer?.answer === answer}
          >
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
}

export default QuestionCard