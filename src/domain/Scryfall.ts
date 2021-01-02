import axios, {AxiosResponse} from "axios";
import CardData from "@/domain/CardData";

export default class Scryfall {

    public static fetch(request: ScryfallRequest): Promise<AxiosResponse<CardData>> {
        return axios.get(request.url);
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
