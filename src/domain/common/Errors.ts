import { ToastProgrammatic as Toast } from 'buefy'

export default class Errors {

    private static instance: Errors;

    public static getInstance(): Errors {
        if (!Errors.instance) {
            Errors.instance = new Errors();
        }

        return Errors.instance;
    }

    public showError(msg: string): void {
        Toast.open(msg);
    }
}
