/**
 * Type of update options
 */
import Service from './service';

interface MisprintsConfig {
  /** Number of picked reaction */
  chatId: string;
}

export default class Misprints {
  public chatId: string;

  constructor (config: MisprintsConfig) {
    this.chatId = config.chatId;
    window.addEventListener('keyup', this.notifyIfNeeded);
  }

  private notifyIfNeeded (event) {
    if (event.key === 'Enter') {
      const selection = window.getSelection();
      if (selection.toString().length) {
        const fragmentPosition = selection.getRangeAt(0).getBoundingClientRect();
        Service.notify(this.chatId, fragmentPosition.top, fragmentPosition.left);
      }
    }
  }
}
