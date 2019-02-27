/**
 * Request body parameters
 */
interface Params {
  /** Message that will be displayed in chat */
  message: string;
}

/**
 * @class Service
 * @classdesc class responsible for server interactions
 */
export default class Service {
  /**
   *  Server endpoint
   */
  private static notificationEndpoint = 'https://notify.bot.ifmo.su/u';

  /**
   * Send request to server
   * @param {string} chatId - chat's identifier
   * @param {number} topPosition - vertical coordinate of selected text
   * @param {number} leftPosition - horizontal coordinate of selected text
   */
  public static async notify (chatId: string, topPosition: number, leftPosition: number) {
    const params = Service.standardizeParams({
      message: `Url: ${window.location.href}, Title: ${document.title}, Top: ${topPosition}, Left: ${leftPosition}`
    });

    const response = await fetch(`${Service.notificationEndpoint}/${chatId}`, {
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
  private static standardizeParams (params: Params): string {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }
}
