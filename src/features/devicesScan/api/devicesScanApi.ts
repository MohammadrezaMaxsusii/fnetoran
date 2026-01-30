import { api } from "@/shared/libs/axiosInstance";

// To do replace with real api

export const getDevicesScan = async (params: Record<string, string>) => {
  //   const { data } = await api.get("/example", { params });
  //   return data;
  return {
    count: 1,
    data: [
      {
        id: "1",
        scanName: "Test 1",
        schedule: "On Demand",
        createdAt: "2015-03-25T12:00:00Z",
        load: "Yes",
      },
      {
        id: "2",
        scanName: "Test 2",
        schedule: "On Demand",
        createdAt: "2017-03-25T12:00:00Z",
        load: "No",
      },
      {
        id: "3",
        scanName: "Test 3",
        schedule: "On Demand",
        createdAt: "2018-03-11T12:00:00Z",
        load: "No",
      },
      {
        id: "4",
        scanName: "Test 4",
        schedule: "On Demand",
        createdAt: "2024-03-25T12:00:00Z",
        load: "Yes",
      },
    ],
  };
};
