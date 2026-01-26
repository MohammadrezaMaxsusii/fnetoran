import { api } from "@/shared/libs/axiosInstance";

export const getAttackTypes = async () => {
  const { data } = await api.get("/devices/firewall/ip_block/attack-types");
  return data;
};
