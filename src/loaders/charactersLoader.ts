import { baseUrl } from "../constants/baseUrl";
import axios from "axios";

export const devicesLoader = async ({ request }: { request: Request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const brand = url.searchParams.get("brand") || "";
    const category = url.searchParams.get("category") || "";
    const sort = url.searchParams.get("sort") || "";
    const needs = url.searchParams.get("needs") || "";

    const response = await axios.get(
      `${baseUrl}?page=${page}&page_size=20${brand ? `&brand=${brand}` : ""}${
        category ? `&category=${category}` : ""
      }${sort ? `&sort=${sort}` : ""}${needs ? `&needs=${needs}` : ""}`
    );

    // Check if response has the expected structure
    if (response.data && typeof response.data === 'object') {
      // If response has an error property, handle it
      if (response.data.error) {
        console.error("API Error:", response.data.error);
        return {
          devices: [],
          pagination: {
            current_page: 1,
            total_pages: 1,
            total_items: 0,
            page_size: 20
          }
        };
      }
      
      // Ensure devices array exists
      if (!response.data.devices) {
        response.data.devices = [];
      }
      
      // Ensure pagination exists
      if (!response.data.pagination) {
        response.data.pagination = {
          current_page: 1,
          total_pages: 1,
          total_items: 0,
          page_size: 20
        };
      }
      
      return response.data;
    }

    // If response structure is unexpected, return default
    return {
      devices: [],
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        page_size: 20
      }
    };
  } catch (error) {
    console.error("Error in devicesLoader:", error);
    return {
      devices: [],
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        page_size: 20
      }
    };
  }
};