import CardData from "@/domain/CardData";
import Scryfall, {ScryfallRequest} from "@/domain/Scryfall";
import {AxiosResponse} from "axios";

export default class PromisedCardData {

    private cardData: Promise<CardData> | null = null;

    constructor(private readonly prefetchImages: boolean) {
    }

    public static newRandom(prefetchImages = false): PromisedCardData {
        return new PromisedCardData(prefetchImages);
    }

    public get(): Promise<CardData> {
        if (this.cardData) {
            return this.cardData;
        }

        const scryfallFetch = Scryfall.fetch(ScryfallRequest.forRandomCard());
        scryfallFetch.catch(error => console.error(error));

        this.cardData = scryfallFetch.then(response => this.preloadImages(response))
            .then(response => response.data);
        return this.cardData;
    }

    private async preloadImages(response: AxiosResponse<CardData>): Promise<AxiosResponse<CardData>> {
        return new Promise<AxiosResponse<CardData>>(resolve => {
            if (this.prefetchImages) {
                Promise.all([
                    //todo: sometimes throws npe: cannot read art_crop of undefined -> add some additional error handling
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
