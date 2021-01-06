import PromisedCardData from "@/domain/PromisedCardData";
import CardData, {QuestionState} from "@/domain/CardData";

export default class Question {

    private static readonly ANSWERS_COUNT = 4;

    public readonly correctAnswer: number;

    public readonly promisedCardData: PromisedCardData[];

    public state = QuestionState.UNANSWERED;

    constructor() {
        this.correctAnswer = 0;
        this.promisedCardData = [...new Array(Question.ANSWERS_COUNT).keys()].map(() => PromisedCardData.newRandom());
    }

    public fetchData(): void {
        this.promisedCardData.forEach(d => d.fetch());
    }
}
