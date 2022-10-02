import { Logger as L } from '@ricdotnet/logger';

export class Logger {
  private static instance: L;

  public static async initiate() {
    if (typeof this.instance === 'undefined' ) {
      this.instance = new L({ logToConsole: false, });
      return Promise.resolve();
    }
  }

  public static async info<T = string>(msg: string): Promise<void> {
    await this.instance.info<T>(msg);
  }
  public static async warn<T = string>(msg: string): Promise<void> {
    await this.instance.warn<T>(msg);
  }
  public static async error<T = string>(msg: string): Promise<void> {
    await this.instance.error<T>(msg);
  }
}
