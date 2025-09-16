import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../axiosInstance";

const DISTRIBUTION_GETS = "/distribution/gets";
const DISTRIBUTION_TABLE = "/distribution/table"


// ---------- low-level fetchers ----------
const getStateName = async () =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/states`)).data;

const getAcademicYears = async () =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/academic-years`)).data;

const getCityByStateId = async (stateId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/city/${stateId}`)).data;

const getZoneByCity = async (cityId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/zones/${cityId}`)).data;

const getEmployeesByZone = async (zoneId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/zone/${zoneId}/employees`))
    .data;

const getMobileNo = async (empId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/mobile-no/${empId}`)).data;

const getNextAppliNo = async (academicYearId, stateId, userId) =>
  (
    await axiosInstance.get(`${DISTRIBUTION_GETS}/next-app-number`, {
      params: { academicYearId, stateId, userId },
    })
  ).data;

const getCities = async () =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/cities`)).data;

const getCampusByZone = async (zoneId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/campus/${zoneId}`)).data;

const getDistrictByState = async (stateId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/districts/${stateId}`)).data;

const getAllDistricts = async () =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/getalldistricts`)).data;

const getCitiesByDistrict = async (districtId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/cities/${districtId}`)).data;

const getCampusesByCity = async (cityId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/campuses/${cityId}`)).data;

const getAllCampaignAreas = async () =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/campaign-areas`)).data;

const getProsByCampus = async (campusId) =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/pros/${campusId}`)).data;

const getEmployees = async () =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/employees`)).data;

const getAppliEndNumber = async (stateId, userId) =>
  (
    await axiosInstance.get(`${DISTRIBUTION_GETS}/app-end-number`, {
      params: { stateId, userId },
    })
  ).data;

const getIssuedTo = async () =>
  (await axiosInstance.get(`${DISTRIBUTION_GETS}/issued-to`)).data;

const getAppNumberRange = async (academicYearId, employeeId) =>
  (
    await axiosInstance.get(`${DISTRIBUTION_GETS}/app-number-ranges`, {
      params: { academicYearId, employeeId },
    })
  ).data;

const zoneApplicationNoFromTo = async (academicYearId, stateId, createdBy) => {
  try {
    const response = await axiosInstance.get(
      `${DISTRIBUTION_GETS}/app-number-from-to`,
      {
        params: { academicYearId, stateId, createdBy },
      }
    );
    console.log("API Response:", response.data); // Add this log to check the actual response
    return response.data; // Ensure this is returning data correctly
  } catch (error) {
    console.error("Error fetching app number range:", error);
    return null;
  }
};

const campaignByCityId = async(cityId)=>(
  await axiosInstance.get(`${DISTRIBUTION_GETS}/getarea/${cityId}`)).data;

const campusByCampaignId = async(campaignId) =>(
  await axiosInstance.get(`${DISTRIBUTION_GETS}/${campaignId}/campus`)).data;

const getTableDetailsByEmpId = async(empId) =>(
  await axiosInstance.get(`${DISTRIBUTION_TABLE}/getdistributiondata/${empId}`)).data;

// ---------- TanStack Query v5 hooks ----------
export const useGetStateName = () =>
  useQuery({ queryKey: ["state-names"], queryFn: getStateName });

export const useGetAcademicYears = () =>
  useQuery({ queryKey: ["academic-years"], queryFn: getAcademicYears });

export const useGetCityByStateId = (stateId) =>
  useQuery({
    queryKey: ["city-names-by-state", stateId],
    queryFn: () => getCityByStateId(stateId),
    enabled: !!stateId,
  });

export const useGetZoneByCity = (cityId) =>
  useQuery({
    queryKey: ["zone-names-by-city", cityId],
    queryFn: () => getZoneByCity(cityId),
    enabled: !!cityId,
  });

export const useGetEmployeesByZone = (zoneId) =>
  useQuery({
    queryKey: ["employees-by-zone", zoneId],
    queryFn: () => getEmployeesByZone(zoneId),
    enabled: !!zoneId,
  });

export const useGetMobileNo = (empId) =>
  useQuery({
    queryKey: ["mobile-no", empId],
    queryFn: () => getMobileNo(empId),
    enabled: !!empId,
  });

export const useGetNextAppliNo = (academicYearId, stateId, userId) =>
  useQuery({
    queryKey: ["next-app-number", academicYearId, stateId, userId],
    queryFn: () => getNextAppliNo(academicYearId, stateId, userId),
    enabled: !!academicYearId && !!stateId && !!userId,
  });

export const useGetCities = () =>
  useQuery({ queryKey: ["cities"], queryFn: getCities });

export const useGetCampusByZone = (zoneId) =>
  useQuery({
    queryKey: ["campuses-by-zone", zoneId],
    queryFn: () => getCampusByZone(zoneId),
    enabled: !!zoneId,
  });

export const useGetDistrictByState = (stateId) =>
  useQuery({
    queryKey: ["districts-by-state", stateId],
    queryFn: () => getDistrictByState(stateId),
    enabled: !!stateId,
  });

export const useGetAllDistricts = () =>
  useQuery({ queryKey: ["all-districts"], queryFn: getAllDistricts });

export const useGetCitiesByDistrict = (districtId) =>
  useQuery({
    queryKey: ["cities-by-district", districtId],
    queryFn: () => getCitiesByDistrict(districtId),
    enabled: !!districtId,
  });

export const useGetCampusesByCity = (cityId) =>
  useQuery({
    queryKey: ["campuses-by-city", cityId],
    queryFn: () => getCampusesByCity(cityId),
    enabled: !!cityId,
  });

export const useGetAllCampaignAreas = () =>
  useQuery({ queryKey: ["campaign-areas"], queryFn: getAllCampaignAreas });

export const useGetProsByCampus = (campusId) =>
  useQuery({
    queryKey: ["pros-by-campus", campusId],
    queryFn: () => getProsByCampus(campusId),
    enabled: !!campusId,
  });

export const useGetEmployees = () =>
  useQuery({ queryKey: ["employees"], queryFn: getEmployees });

export const useGetAppliEndNumber = (stateId, userId) =>
  useQuery({
    queryKey: ["app-end-number", stateId, userId],
    queryFn: () => getAppliEndNumber(stateId, userId),
    enabled: !!stateId && !!userId,
  });

export const useGetIssuedTo = () =>
  useQuery({ queryKey: ["issued-to"], queryFn: getIssuedTo });

export const useGetAppNumberRange = (academicYearId, employeeId) =>
  useQuery({
    queryKey: ["app-number-ranges", academicYearId, employeeId],
    queryFn: () => getAppNumberRange(academicYearId, employeeId),
    enabled: !!academicYearId && !!employeeId,
  });

export const useZoneApplicationNoFromTo = (
  academicYearId,
  stateId,
  createdBy
) => {
  console.log("Query Params:", academicYearId, stateId, createdBy); // Check the params being passed
  return useQuery({
    queryKey: ["app-number-ranges", academicYearId, stateId, createdBy],
    queryFn: () => zoneApplicationNoFromTo(academicYearId, stateId, createdBy),
    enabled: !!academicYearId && !!stateId && !!createdBy,
  });
};

export const useCampaignByCityId = (cityId) => 
  useQuery({
    queryKey: ["Campaign Areas: ", cityId],
    queryFn: () => campaignByCityId(cityId),
    enabled: !!cityId,
  })

export const useCampusbyCampaignId = (campaignId) =>
  useQuery({
    queryKey:["Campus: ", campaignId],
    queryFn: () => campusByCampaignId(campaignId),
    enabled: !!campaignId,
  })

export const useGetTableDetailsByEmpId = (empId)=>
  useQuery({
    queryKey:["Table Details with Id: ", empId],
    queryFn: () => getTableDetailsByEmpId(empId),
    enabled: !!empId,
  })