import { useMutation } from "@tanstack/react-query";

import type {
  Req,
  Res} from "@/api/api-nuwa/product_load_from_1688";
import {
  product_load_from_1688
} from "@/api/api-nuwa/product_load_from_1688";


export function useSyncAll() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return product_load_from_1688(req);
    },
  });
}
