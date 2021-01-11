import CardData from "@/domain/CardData";
import Scryfall, {ScryfallRequest} from "@/domain/Scryfall";
import {AxiosResponse} from "axios";
import Repeat from "@/domain/common/Repeat";

export default class PromisedCardData {

    private static REPEAT_REQUESTS = 2;

    private static DELAY_BETWEEN_REPEATS = 1000;

    private cardData: Promise<CardData | null> | null = null;

    constructor(private readonly prefetchImages: boolean) {
    }

    public static newRandom(prefetchImages = false): PromisedCardData {
        return new PromisedCardData(prefetchImages);
    }

    public get(): Promise<CardData | null> {
        if (this.cardData) {
            return this.cardData;
        }

        this.cardData = new Repeat(
            () => {
                return Scryfall.fetch(ScryfallRequest.forRandomCard())
                    .then(response => this.preloadImages(response))
                    .then(response => response.data);
            },
            PromisedCardData.REPEAT_REQUESTS,
            PromisedCardData.DELAY_BETWEEN_REPEATS)
            .do()
            .catch(this.handleErrors());

        return this.cardData;
    }

    private async preloadImages(response: AxiosResponse<CardData>): Promise<AxiosResponse<CardData>> {
        return new Promise<AxiosResponse<CardData>>((resolve, reject) => {
            try {
                if (this.prefetchImages) {
                    Promise.all([
                        //todo: sometimes throws npe: cannot read art_crop of undefined -> add some additional error handling
                        // @ts-ignore
                        this.fetchImage(response.data.image_uris.art_crop),
                        // @ts-ignore
                        this.fetchImage(response.data.image_uris.large)]
                    ).then(() => resolve(response));
                } else {
                    resolve(response);
                }
            } catch (error) {
                reject(error);
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

    private handleErrors(): (error: unknown) => Promise<null> {
        return (error: unknown) => {
            const triesTotal = PromisedCardData.REPEAT_REQUESTS + 1;
            console.debug(`Failed to get card data, after [${triesTotal}] tries, with error on last retry:`, error);

            return new Promise(resolve => resolve(null));
        }
    }
}
