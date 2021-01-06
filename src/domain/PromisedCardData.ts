import CardData from "@/domain/CardData";
import Scryfall, {ScryfallRequest} from "@/domain/Scryfall";
import {AxiosResponse} from "axios";

export default class PromisedCardData {

    private cardData: Promise<AxiosResponse<CardData>> | null = null;

    constructor(private readonly prefetchImages: boolean) {
    }

    public static newRandom(prefetchImages = false): PromisedCardData {
        return new PromisedCardData(prefetchImages);
    }

    public get(): Promise<CardData> {
        this.fetch();
        return (this.cardData as Promise<AxiosResponse<CardData>>)
            .then(response => this.preloadImages(response))
            .then(response => response.data);
    }

    private fetch(): void {
        if (!this.cardData) {
            const fetch = Scryfall.fetch(ScryfallRequest.forRandomCard());
            fetch.catch(error => console.error(error));

            this.cardData = fetch;
        }
    }

    private async preloadImages(response: AxiosResponse<CardData>): Promise<AxiosResponse<CardData>> {
        return new Promise<AxiosResponse<CardData>>(resolve => {
            if (this.prefetchImages) {
                Promise.all([
                    // @ts-ignore
                    this.fetchImage(response.data.image_uris.art_crop),
                    // @ts-ignore
                    this.fetchImage(response.data.image_uris.large)])
                    .then(() => resolve(response));
            } else {
                resolve(response);
            }
        });
    }

    private async fetchImage(url: string): Promise<null> {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve();
            img.src = url;
        });
    }
}
