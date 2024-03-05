// Query Imports
import { useQuery } from "@tanstack/react-query";

import { get_company } from "@/api/api-erp";
import type { Res } from "@/api/api-erp/get_company";

export function useCompanyQuery() {
  return useQuery<Res, Error>({
    queryKey: ["get_company"],
    queryFn({ signal }) {
      return get_company({ signal });
    },
    retry: 1,
  });
}
