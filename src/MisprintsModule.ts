import Service from './service/index';

/**
 * Configurable options for misprints
 */
interface MisprintsConfig {
  /** Chat's identifier where message will be sent */
  chatId: string;
}

/**
 * @class Misprints
 * @classdesc class responsible for module initialization
 */
export default class Misprints {
  /**
   *  Chat's identifier where message will be sent
   */
  public chatId: string;

  /**
   * Create a misprints module.
   * @param {object} config - object containing configurable options.
   * @param {string} config.chatId - Chat's identifier where message will be sent
   */
  constructor(config: MisprintsConfig) {
    this.chatId = config.chatId;

    window.addEventListener('keyup', (event) => {
      this.notifyIfNeeded(event);
    });
  }

  /**
   * Check if user tries to send feedback and send it
   * @param {KeyboardEvent} event - keyboard event.
   */
  private async notifyIfNeeded(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.shiftKey) {
      const selection = window.getSelection();

      if (selection.toString().length) {
        try {
          const response = await Service.notify(this.chatId, selection.toString());
          selection.empty();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}
