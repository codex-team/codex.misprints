/**
 * Type of update options
 */
interface MisprintsConfig {
    /** Number of picked reaction */
    chatId: string;
}

export default class Misprints {
    public chatId: string;

    constructor(config: MisprintsConfig) {
        this.chatId = config.chatId;
        this.bindServiceCall();
    }

    private bindServiceCall() {

    }
}