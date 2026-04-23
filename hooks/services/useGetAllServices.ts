import { fetchWrapper } from "@/utilities/helpers/fetchWrapper";
import type { ServicesType } from "@/utilities/types/services";
import { useQuery } from "@tanstack/react-query";

const getAllServices = async () => {
  return fetchWrapper<ServicesType[]>({
    url: "services",
  });
};

export default function useGetAllServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });
}
