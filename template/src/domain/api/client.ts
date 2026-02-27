import { HttpClientBase } from './http-client.base';
import type { I{{Name}}Client } from './client.interface';

/**
 * {{Name}} API client
 * Extends HttpClientBase with {{Name}}-specific methods
 *
 * TODO: Replace BASE_URL with your API's base URL
 * TODO: Implement your actual API methods
 */
export class {{Name}}Client extends HttpClientBase implements I{{Name}}Client {
  constructor(token: string) {
    super('https://api.example.com/v1', token);
  }

  // TODO: Replace with your actual API methods
  // Example implementation:
  async getData(id?: string): Promise<unknown> {
    const endpoint = id ? `/data/${id}` : '/data';
    return this.request(endpoint);
  }
}
