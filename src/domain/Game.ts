import Question from "@/domain/Question";

export default class Game {

    private questions: Question[] = [];

    private pendingQuestions: Question[] = [];

    public static newGame(): Game {
        const game = new Game();
        game.initFirstQuestion();
        return game;
    }

    get getQuestions(): Question[] {
        return this.questions;
    }

    get getPendingQuestions(): Question[] {
        return this.pendingQuestions;
    }

    public onQuestionAnswered(): void {
        const pendingQuestion = this.pendingQuestions[0];
        setTimeout(() => this.questions.push(pendingQuestion), 1000);

        this.prepareNextQuestion();
    }

    private initFirstQuestion(): void {
        const firstQuestion = new Question();
        firstQuestion.fetchData();
        this.questions = [firstQuestion];
        this.prepareNextQuestion();
    }

    private prepareNextQuestion(): void {
        const nextQuestion = new Question();
        nextQuestion.fetchData();
        this.pendingQuestions = [nextQuestion];
    }
}
