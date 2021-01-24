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
