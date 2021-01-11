import PromisedCardData from "@/domain/PromisedCardData";
import CardData, {QuestionState} from "@/domain/CardData";

export default class Question {

    private static readonly ANSWERS_COUNT = 4;

    public readonly correctAnswer: number;

    public readonly promisedCardData: PromisedCardData[];

    public cardData: CardData[] = [];

    public cardDatasReady = 0;

    public state = QuestionState.UNANSWERED;

    private fetched = false;

    constructor() {
        this.correctAnswer = 0;
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
                    const anyNull = data.some((cardData) => !cardData);

                    if (!anyNull) {
                        this.cardData = data as CardData[];
                    }
                });
        }
    }
}
