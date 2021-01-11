import CardData from "@/domain/CardData";
import Scryfall, {ScryfallRequest} from "@/domain/Scryfall";
import {AxiosResponse} from "axios";
import Errors from "@/domain/common/Errors";
import Repeat from "@/domain/common/Repeat";

export default class PromisedCardData {

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
            1,
            2000)
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
            console.debug("Repeated call ended in failure!");
            // console.debug(error);
            Errors.getInstance().showError("Error when fetching card data. Please refresh page.");

            return new Promise(resolve => resolve(null));
        }
    }
}
