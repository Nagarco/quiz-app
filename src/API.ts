import { shuffleArray } from "./shared/helpers";
import { Difficulty } from "./shared/enums";
import { QuestionState, Questions } from "./shared/interfaces";

export const fetchQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionState[]> => {
    const endPoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endPoint)).json();

    return data.results.map((question: Questions) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    })) 
}