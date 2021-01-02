import CardData from "@/domain/CardData";

export default class PromisedCardData {

    private cardData: Promise<CardData> | null = null;

    public static newRandom(): PromisedCardData {
        return new PromisedCardData();
    }

    public fetch(): void {
        if (!this.cardData) {
            this.cardData = Promise.resolve(new CardData());
        }
    }

    public get(): Promise<CardData> {
        this.fetch();
        return this.cardData as Promise<CardData>;
    }
}
