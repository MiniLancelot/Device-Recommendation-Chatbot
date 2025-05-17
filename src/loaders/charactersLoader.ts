import { baseUrl } from "../constants/baseUrl";
import axios from "axios";

export const devicesLoader = async ({ request }: { request: Request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";
    const brand = url.searchParams.get("brand") || "";
    const category = url.searchParams.get("category") || "";
    const sort = url.searchParams.get("sort") || "";

    const response = await axios.get(
      `${baseUrl}?page=${page}&page_size=20${brand ? `&brand=${brand}` : ""}${
        category ? `&category=${category}` : ""
      }${sort ? `&sort=${sort}` : ""}`
    );
    return response.data;
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