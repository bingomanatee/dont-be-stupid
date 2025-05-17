import { HydratedDocument } from 'mongoose';
export type QuestionDoc = HydratedDocument<Question>;
export declare class Question {
    prompt: string;
    right_answer: number;
    stupid_answer: number;
    answers: string[];
}
export declare const QuestionSchema: any;
