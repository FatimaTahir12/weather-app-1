// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query/react";
import { API_key, base_URL } from "../config.json";

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: base_URL,
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) =>
        `?q=${city}&appid=${API_key}`,
    }),
    
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWeatherByCityQuery} =
  weatherApi;