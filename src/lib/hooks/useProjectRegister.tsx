import { useQuery } from "@tanstack/react-query";
import { request } from "../api";
import { GET_PROJECTS } from "../querykeys";
import type { BaseResponse } from "@/types/baseRespones";

const useProjectRegister = (searchInputs: any) => {
  return useQuery({
    queryKey: [GET_PROJECTS, searchInputs],
    queryFn: async () => {
      const result = await request<BaseResponse<any[]>>({
        method: "GET",
        url: "/project-register",
        params: searchInputs,
      });

      return result.data || [];
    },
    initialData: [],
  });
};

export default useProjectRegister;
