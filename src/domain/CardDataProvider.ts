import CardData from "@/domain/CardData";

export default class CardDataProvider {

    public static async newRandom(): Promise<CardData> {
        return new CardData();
    }
}
