// import axios from "axios";
// import { baseUrl } from "../constants/baseUrl";

// export const charactersLoader = async () => {
//   try {
//     const response = await axios.get(baseUrl);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching characters:", error);
//     throw error;
//   }
// };


import { baseUrl } from "../constants/baseUrl";
import axios from "axios";

export const charactersLoader = async () => {
  try {
    const response = await axios.get(baseUrl);    
    const characterNames = await response.data;
    
    const characterDetailsPromises = characterNames.map(async (name: string) => {
      try {
        const detailResponse = await axios.get(`${baseUrl}/${name}`);
        if (detailResponse.status !== 200) {
          return { name, weapon: "Unknown" };
        }
        const details = await detailResponse.data
        return {
          name,
          characterName: details.name || "Unknown",
          weapon: details.weapon || "Unknown",
          vision: details.vision || "Unknown",
        };
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
        return { name, weapon: "Unknown" };
      }
    });
    
    const charactersWithDetails = await Promise.all(characterDetailsPromises);
    return charactersWithDetails;
    
  } catch (error) {
    console.error("Error in charactersLoader:", error);
  }
};