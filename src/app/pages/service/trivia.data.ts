export interface DataTriviaSearch {
    response_code: number;
    results:   Question[];
}

export interface Question {
    category:          string;
    type:              QuestionType;
    difficulty:        QuestionDifficulty;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export enum QuestionDifficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

export enum QuestionType {
    Boolean = "boolean",
    Multiple = "multiple",
}

export interface Users{
    fakeUsers : User[];
}

export interface User{
    pseudo : string;
    score : number;
}