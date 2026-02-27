import type { I{{Name}}Client } from './client.interface';
import { TTLCache } from '../../lib/ttl-cache';
import { logger } from '../../lib/logger';

const TTL_MS = 5 * 60 * 1000; // 5 minutes

const CACHE_KEYS = {
  // TODO: Add cache keys for the methods you want to cache
  // Example:
  data: (id?: string) => (id ? `data:${id}` : 'data'),
} as const;

/**
 * Caching wrapper for {{Name}}Client
 * Wraps cacheable read methods in a TTL cache.
 *
 * TODO: Cache the methods that make sense (typically read/list operations)
 * TODO: Pass through write/mutating operations directly to the underlying client
 */
export class Cached{{Name}}Client implements I{{Name}}Client {
  private client: I{{Name}}Client;
  private cache: TTLCache<unknown>;

  constructor(client: I{{Name}}Client) {
    this.client = client;
    this.cache = new TTLCache<unknown>(TTL_MS);
  }

  // TODO: Replace with implementations for your actual interface methods
  // Cache read operations, pass through write operations directly
  async getData(id?: string): Promise<unknown> {
    const key = CACHE_KEYS.data(id);
    const cached = this.cache.get(key);
    if (cached !== undefined) {
      logger.debug('Cache hit', { key });
      return cached;
    }
    logger.debug('Cache miss', { key });
    const result = await this.client.getData(id);
    this.cache.set(key, result);
    return result;
  }
}
