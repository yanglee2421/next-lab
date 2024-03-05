// Query Imports
import { useQuery } from "@tanstack/react-query";

import { connection_my_connections } from "@/api/api-stg";
import type { Params, Res } from "@/api/api-stg/connection_my_connections";

export function useMyConnections(params: Params) {
  return useQuery<Res, Error>({
    queryKey: ["connection_my_connections", params],
    queryFn({ signal }) {
      return connection_my_connections({ signal, params });
    },
  });
}
