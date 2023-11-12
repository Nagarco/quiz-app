import { AnswerObject, QuestionState } from "./shared/interfaces";

export const TOTAL_QUESTIONS: number = 10;

export type Action =
    | { type: "START_QUIZ" }
    | { type: "START_QUIZ_SUCCESS"; payload: QuestionState[] }
    | { type: "START_QUIZ_FAILURE"; }
    | { type: "CHECK_ANSWER"; payload: string }
    | { type: "NEXT_QUESTION" }

export const initialState = {
    loading: false,
    questions: [] as QuestionState[],
    number: 0,
    userAnswers: [] as AnswerObject[],
    score: 0,
    gameover: true,
};

export const quizReducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case "START_QUIZ":
            return {
                ...initialState,
                loading: true,  
            };
        case "START_QUIZ_SUCCESS":
            return {
                ...state,
                loading: false,  
                gameover: false,
                questions: action.payload,
            };
        case "START_QUIZ_FAILURE":
            return {
                ...state,
                loading: false,  
            };
        case "CHECK_ANSWER":
            const answer = action.payload;
            const correct = state.questions[state.number].correct_answer === answer;
            const updatedScore = correct ? state.score + 1 : state.score;

            const answerObject: AnswerObject = {
                question: state.questions[state.number].question,
                answer,
                correct,
                correctAnswer: state.questions[state.number].correct_answer,
            };

            return {
                ...state,
                userAnswers: [...state.userAnswers, answerObject],
                score: updatedScore,
            };
        case "NEXT_QUESTION":
            const nextQuestionNumber = state.number + 1;

            if (nextQuestionNumber === TOTAL_QUESTIONS) {
                return { ...state, gameover: true };
            }

            return {
                ...state,
                number: nextQuestionNumber,
            };
        default:
            return state;
    }
};
