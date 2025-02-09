import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStat } from "../stat/action";
import { toast } from "sonner";
import { StatusResponse } from "@/types/stat";

export const useFetchStatsDashboard = () => {
  return useQuery<StatusResponse>({
    queryKey: ["stats"],
    queryFn: async () => {
      try {
        const data = await fetchDashboardStat();
        return data.data;
      } catch (error: any) {
        toast.error(error.message);
        throw error;
      }
    },
  });
};
