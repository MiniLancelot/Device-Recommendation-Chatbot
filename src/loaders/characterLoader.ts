import { LoaderFunctionArgs } from "react-router-dom";
import { baseUrl } from "../constants/baseUrl";
import axios from "axios";

export const characterDetailLoader = async ({ params }: LoaderFunctionArgs) => {
  const { characterName } = params;

  if (!characterName) {
    throw new Error("Character name is required");
  }

  try {
    const response = await axios.get(`${baseUrl}/${characterName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};