import Service from './service/index';

/**
 * Configurable options for misprints
 */
interface MisprintsConfig {
  /** Chat's identifier */
  chatId: string;
}

/**
 * @class Misprints
 * @classdesc class responsible for module initialization
 */
export default class Misprints {
  /**
   *  Chat's identifier
   */
  public chatId: string;

  /**
   * Create a misprints module.
   * @param {object} config - object containing configurable options.
   * @param {string} config.chatId - chat's identifier.
   */
  constructor (config: MisprintsConfig) {
    this.chatId = config.chatId;

    window.addEventListener('keyup', (event) => {
      this.notifyIfNeeded(event);
    });
  }

  /**
   * Check if user tries to send feedback and send it
   * @param {KeyboardEvent} event - keyboard event.
   */
  private notifyIfNeeded (event: KeyboardEvent) {
    if (event.key === 'Enter' && event.shiftKey) {
      const selection = window.getSelection();
      if (selection.toString().length) {
        const fragmentPosition = selection.getRangeAt(0).getBoundingClientRect();
        Service.notify(this.chatId, selection.toString(), fragmentPosition.top, fragmentPosition.left);
      }
    }
  }
}
