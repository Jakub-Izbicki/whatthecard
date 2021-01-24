import PromisedCardData from "@/domain/PromisedCardData";
import CardData, {QuestionState} from "@/domain/CardData";
import {v4 as uuid4} from "uuid";

export default class Question {

    private static readonly ANSWERS_COUNT = 4;

    public readonly id: string;

    public readonly correctAnswer: number;

    public readonly promisedCardData: PromisedCardData[];

    public cardData: CardData[] = [];

    public cardDatasReady = 0;

    public cardDataFetchFailure = false;

    public state = QuestionState.UNANSWERED;

    public squashed = false;

    private fetched = false;

    constructor() {
        this.id = uuid4();
        this.correctAnswer = this.randomInRange(0, Question.ANSWERS_COUNT);
        console.info(this.correctAnswer)
        this.promisedCardData = [...new Array(Question.ANSWERS_COUNT).keys()].map((i) => {
            if (i === this.correctAnswer) {
                return PromisedCardData.newRandom(true);
            } else {
                return PromisedCardData.newRandom();
            }
        });
    }

    public fetchData(): void {
        if (!this.fetched) {
            this.fetched = true;

            this.promisedCardData.forEach((data) =>
                data.get().then((cardData) => {
                    if (cardData) {
                        this.cardDatasReady++
                    }
                }));

            Promise.all(this.promisedCardData.map(data => data.get()))
                .then(data => {
                    const anyDataIncomplete = data.some((cardData) => !cardData);

                    if (anyDataIncomplete) {
                        this.cardDataFetchFailure = true;
                    } else {
                        this.cardData = data as CardData[];
                    }
                });
        }
    }

    private randomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
