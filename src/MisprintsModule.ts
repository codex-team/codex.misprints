import Service from './service/index';

/**
 * Configurable options for misprints
 */
interface MisprintsConfig {
  /** Chat's identifier where message will be sent */
  chatId: string;
  /** Key should be pressed with combination of enter to send misprint */
  shortcutKey?: string;
}

/**
 * Available keys for MisprintsConfig.shortcutKey
 */
const availableShortcuts = [
  'Shift',
  'Alt',
  'Control',
  'Meta'
];

/**
 * Default configuration for misprints
 */
const defaultConfig = {
  /** Key should be pressed with combination of enter to send misprint */
  shortcutKey: availableShortcuts[0]
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
  /** Key should be pressed with combination of enter to send misprint */
  public shortcutKey: string;

  /**
   * Create a misprints module.
   * @param {object} config - object containing configurable options.
   * @param {string} config.chatId - Chat's identifier where message will be sent
   */
  constructor(config: MisprintsConfig) {
    this.chatId = config.chatId;

    if (config.shortcutKey) {
      if (availableShortcuts.find(shortcut => shortcut === config.shortcutKey)) {
        this.shortcutKey = config.shortcutKey;
      } else {
        throw new Error('Incorrect shortcutKey passed into Misprints constructor');
      }
    } else {
      this.shortcutKey = defaultConfig.shortcutKey;
    }

    window.addEventListener('keyup', (event) => {
      this.notifyIfNeeded(event);
    });
  }

  /**
   * Check if user tries to send feedback and send it
   * @param {KeyboardEvent} event - keyboard event.
   */
  private async notifyIfNeeded(event: KeyboardEvent) {

    if (event.key === 'Enter' && this.isShortcutKeyPressed(event)) {
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

  private isShortcutKeyPressed(event) {
    switch (this.shortcutKey) {
      case availableShortcuts[0]:
        return event.shiftKey;
      case availableShortcuts[1]:
        return event.altKey;
      case availableShortcuts[2]:
        return event.ctrlKey;
      case availableShortcuts[3]:
        return event.metaKey;
    }
  }
}
