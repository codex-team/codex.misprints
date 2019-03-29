const MAX_TEXT_LENGTH = 200;

/**
 * Request body parameters
 */
interface Params {
  /** Message that will be displayed in chat */
  message: string;
  parse_mode: string;
}

/**
 *  Server endpoint
 */
const notificationEndpoint = 'https://notify.bot.codex.so/u';

/**
 * @class Service
 * @classdesc class responsible for server interactions
 */
export default class Service {
  /**
   * Send request to server
   * @param {string} chatId - chat's identifier
   * @param {string} text - selected text fragment
   */
  public static notify(chatId: string, text: string) {
    text = text.length > MAX_TEXT_LENGTH ? text.slice(0, MAX_TEXT_LENGTH - 1) + '...' : text;
    const params = Service.standardizeParams({
      message: `💌 Misprint\n\n\`\`\`${text}\`\`\`\n\n[${document.title}](${window.location.href})`,
      parse_mode: 'Markdown'
    });

    return fetch(`${notificationEndpoint}/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: params
    });
  }

  /**
   * Standardize request body
   * @param {Params} params - chat's identifier
   * @returns {string} standardized request body
   */
  private static standardizeParams(params: Params): string {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }
}
