import Question from "@/domain/Question";

export default class Game {

    private static instance: Game;

    private questions: Question[] = [];

    private pendingQuestions: Question[] = [];

    public static getInstance(): Game {
        if (!Game.instance) {
            const game = new Game();
            game.initFirstQuestion();
            Game.instance = game;
        }

        return Game.instance;
    }

    public getQuestions(): Question[] {
        return this.questions;
    }

    public getQuestionById(id: string): Question {
        return this.questions.find(q => q.id === id) as Question;
    }

    public onQuestionAnswered(): void {
        this.prepareNextQuestion();
    }

    private initFirstQuestion(): void {
        const firstQuestion = new Question();
        firstQuestion.fetchData();
        this.questions = [firstQuestion];
        this.prepareNextQuestion();
    }

    private prepareNextQuestion(): void {
        if (this.pendingQuestions.length) {
            const nextQuestion = this.pendingQuestions[0];
            setTimeout(() => {
                this.questions.push(nextQuestion);
                this.squishAllExceptTwoNewest();
            }, 1000);
        }

        const nextPendingQuestion = new Question();
        nextPendingQuestion.fetchData();
        this.pendingQuestions = [nextPendingQuestion];
    }

    private squishAllExceptTwoNewest(): void {
        if (this.questions.length > 2) {
            this.questions[this.questions.length - 3].squished = true;
        }
    }
}
