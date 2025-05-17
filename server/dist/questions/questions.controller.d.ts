import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(createQuestionDto: CreateQuestionDto): string;
    findAll(): any;
    findOne(id: string): any;
}
