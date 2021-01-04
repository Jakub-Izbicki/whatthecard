import axios, {AxiosResponse} from "axios";
import CardData from "@/domain/CardData";
// @ts-ignore
import throttledQueue from "throttled-queue";

export default class Scryfall {

    private static ONCE = 1;

    private static PER_200_MS = 200;

    public static throttledFetch = throttledQueue(Scryfall.ONCE, Scryfall.PER_200_MS);

    public static fetch(request: ScryfallRequest): Promise<AxiosResponse<CardData>> {
        return new Promise((resolve, reject) => {
            Scryfall.throttledFetch(() => {
                const promise = axios.get(request.url);
                promise.catch((error => reject(error)));
                resolve(promise);
            });
        });
    }
}

// todo: set full_art to false in request
// todo: non-tokens?
// todo: ass selecting card type
export class ScryfallRequest {

    private static RANDOM_CARD = "https://api.scryfall.com/cards/random";

    public static forRandomCard(): ScryfallRequest {
        return new ScryfallRequest(ScryfallRequest.RANDOM_CARD);
    }

    constructor(readonly url: string) {
    }
}
