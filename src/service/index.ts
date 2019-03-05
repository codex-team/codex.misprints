/**
 * Request body parameters
 */
interface Params {
  /** Message that will be displayed in chat */
  message: string;
}

/**
 *  Server endpoint
 */
const notificationEndpoint = 'https://notify.bot.ifmo.su/u';

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
  public static async notify(chatId: string, text: string) {
    const params = Service.standardizeParams({
      message: `💌 Misprint\n${text}\n[${document.title}] (${window.location.href})`
    });

    const response = await fetch(`${notificationEndpoint}/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      mode: 'no-cors',
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
