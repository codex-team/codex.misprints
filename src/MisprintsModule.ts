import Service from './service/index';
import Shortcut from '@codexteam/shortcuts'

/**
 * Configurable options for misprints
 */
interface MisprintsConfig {
  /** Chat's identifier where message will be sent */
  chatId: string;
  /** Shortcut should be pressed to send misprint */
  shortcut: string;
}

/**
 * Default configuration for misprints
 */
const defaultConfig = {
  /** Shortcut should be pressed to send misprint */
  shortcut: 'shift+a'
};

/**
 * @class Misprints
 * @classdesc class responsible for module initialization
 */
export default class Misprints {
  /**
   *  Chat's identifier where message will be sent
   */
  public chatId: string;
  /** Shortcut should be pressed to send misprint */
  public shortcut: string;

  /**
   * Create a misprints module.
   * @param {object} config - object containing configurable options.
   * @param {string} config.chatId - Chat's identifier where message will be sent
   */
  constructor(config: MisprintsConfig) {
    this.chatId = config.chatId;

    if (config.shortcut) {
      this.shortcut = config.shortcut;
    } else {
      this.shortcut = defaultConfig.shortcut;
    }

    const shortcut = new Shortcut({
      name: this.shortcut,
      on: document.body,
      callback: (event) => {
        this.notifyIfNeeded(event);
      }
    });
  }

  /**
   * Send selected text
   * @param {KeyboardEvent} event - keyboard event.
   */
  private async notifyIfNeeded(event: KeyboardEvent) {
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
