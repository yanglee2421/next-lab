// ** Component Import
import { ErrorAlert, SkeletonCard } from "@/components/ui";
import { Chart } from "./Chart";

// Query Imports
import { useFeatureFlagsByTime } from "@/hooks/api-nuwa";

// Type Imports
import type { Row } from "@/api/api-stg/connection_my_connections";

export function LineChart(props: Props) {
  // ** Props
  const { eCommerceShop } = props;

  const query = useFeatureFlagsByTime(eCommerceShop.connection_id, {
    days: 7,
    interval: "d",
  });

  if (query.isPending) {
    return <SkeletonCard></SkeletonCard>;
  }

  if (query.isError) {
    return (
      <ErrorAlert titleNode="Fetch data failed">
        {query.error.message}
      </ErrorAlert>
    );
  }

  if (!query.data.length) {
    return null;
  }

  return <Chart data={query.data}></Chart>;
}

type Props = {
  eCommerceShop: Row;
};
