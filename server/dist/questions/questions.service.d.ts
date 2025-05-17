import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from '../schemas/questions';
import { Model } from 'mongoose';
export declare class QuestionsService {
    private questionModel;
    constructor(questionModel: Model<Question>);
    create(createQuestionDto: CreateQuestionDto): string;
    findAll(): any;
    findOne(id: string): any;
}
