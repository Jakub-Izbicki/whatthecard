import axios, {AxiosResponse} from "axios";
import CardData from "@/domain/CardData";
// @ts-ignore
import throttledQueue from "throttled-queue";

export default class Scryfall {

    private static ONCE = 1;

    private static _200_MS = 200;

    public static throttledFetch = throttledQueue(Scryfall.ONCE, Scryfall._200_MS);

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

export class ScryfallRequest {

    private static RANDOM_CARD = "https://api.scryfall.com/cards/random";

    public static forRandomCard(): ScryfallRequest {
        return new ScryfallRequest(ScryfallRequest.RANDOM_CARD);
    }

    constructor(readonly url: string) {
    }
}
