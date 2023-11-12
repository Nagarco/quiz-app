export interface Questions {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string
}

export interface QuestionState extends Questions {
    answers: string[]
};

export interface AnswerObject {
    question: string;
    answer: string;
    correctAnswer: string;
    correct: boolean;
};