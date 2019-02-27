interface Params {
  message: string;
}

export default class Service {
  private static notificationEndpoint = 'https://notify.bot.ifmo.su/u';

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

  private static standardizeParams (params: Params): any {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }
}
