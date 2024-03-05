import { shoplineQueryMap } from "./shopline-query-map";

export const platformQueryMap = new Map<number, typeof shoplineQueryMap>();

const shopifyQueryMap = shoplineQueryMap;
const wooQueryMap = shopifyQueryMap;

platformQueryMap.set(1, shopifyQueryMap);
platformQueryMap.set(2, wooQueryMap);
platformQueryMap.set(3, shoplineQueryMap);
