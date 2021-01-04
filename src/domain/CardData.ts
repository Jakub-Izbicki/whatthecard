export default class CardData {

    public getArtCropUrl(): string {
        return "https://c1.scryfall.com/file/scryfall-cards/art_crop/front/a/7/a770a18f-c333-431b-b15a-69bb025601c2.jpg?1562265740";
    }
}

export enum QuestionState {
    LOADING, UNANSWERED, CORRECT, INCORRECT
}
