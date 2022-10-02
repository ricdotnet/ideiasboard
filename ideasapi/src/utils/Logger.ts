import { Logger as L } from '@ricdotnet/logger';
import { ObjectBuilder } from '../models/ObjectBuilder';

export class Logger {
  private static instance: L;

  public static async initiate() {
    if ( typeof this.instance === 'undefined' ) {
      this.instance = new L({ logToConsole: true, });
      return Promise.resolve();
    }
  }

  public static async info<T = string>(msg: string, data?: object): Promise<void> {
    await this.instance.info<T>(msg + this.prepareExtra(data));
  }

  public static async warn<T = string>(msg: string, data?: object): Promise<void> {
    await this.instance.warn<T>(msg + this.prepareExtra(data));
  }

  public static async error<T = string>(msg: string, data?: object): Promise<void> {
    await this.instance.error<T>(msg + this.prepareExtra(data));
  }

  private static prepareExtra(data?: object): string {
    return (data !== undefined) ? ' ' + JSON.stringify(ObjectBuilder(data)) : '';
  }
}
