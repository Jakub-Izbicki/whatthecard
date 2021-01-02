import CardData from "@/domain/CardData";
import Scryfall, {ScryfallRequest} from "@/domain/Scryfall";
import {AxiosResponse} from "axios";

export default class PromisedCardData {

    private cardData: Promise<AxiosResponse<CardData>> | null = null;

    public static newRandom(): PromisedCardData {
        return new PromisedCardData();
    }

    public fetch(): void {
        if (!this.cardData) {
            const fetch = Scryfall.fetch(ScryfallRequest.forRandomCard());
            fetch.catch(error => console.error(error));

            this.cardData = fetch;
        }
    }

    public get(): Promise<CardData> {
        this.fetch();
        return (this.cardData as Promise<AxiosResponse<CardData>>).then(response => response.data);
    }
}
