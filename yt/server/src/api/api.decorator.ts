import {Inject} from "@nestjs/common";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";

/**
 * @see https://blog.theuiguy.com/nest-js-caching-service-methods-with-custom-decorators
 * @todo @see https://blog.theuiguy.com/nest-js-caching-service-methods-with-custom-decorators ho to add Redis decorator cache
 */
export const CachedApiReq = <T>({ttl}: { ttl?: number } = {
    ttl: 60 * 60 * 1000 // 1 hour by default
}) => {
    const injector = Inject(CACHE_MANAGER);
    return (target: any, name?: string, descriptor?: TypedPropertyDescriptor<any>) => {
        injector(target, 'cacheManager');
        const origin = descriptor.value;

        descriptor.value = async function (...args: any[]): Promise<T> {
            const cacheManager: Cache = this.cacheManager
            const cacheKey = `${name}_${JSON.stringify(args)}`;

            try {
                const cached = await cacheManager.get(cacheKey);
                if (cached) {
                    console.log(`Getting data from ${cacheKey}`);
                    return cached as T;
                }

                const res = await origin.apply(this, args);
                if(res === null) {
                    return res;
                }
                await cacheManager.set(cacheKey, res, ttl);
                return res;
            } catch (err) {
                console.warn("WARN", {err});
                return null; //origin(args);
            }
        }
    }
}
