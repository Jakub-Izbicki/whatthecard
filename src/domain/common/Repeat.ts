export default class Repeat<T> {

    private static MAX_REPEATS = 0;

    private static DELAY_MS = 1000;

    constructor(readonly callable: () => Promise<T>, readonly repeatMax = Repeat.MAX_REPEATS,
                readonly delayMs = Repeat.DELAY_MS) {
    }

    public do(): Promise<T> {
        const called = this.callable();

        // on error, wait for specified delay time, and then retry call, up to max specified times
        [...new Array(this.repeatMax).keys()].forEach(() => called
            .catch(() => this.wait().then(() => this.callable())));

        return called;
    }

    private wait() {
        return new Promise((resolve => setTimeout(resolve, this.delayMs)));
    }
}
