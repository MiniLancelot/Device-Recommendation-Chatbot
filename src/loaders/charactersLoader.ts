import { baseUrl } from "../constants/baseUrl";
import axios from "axios";

export const charactersLoader = async () => {
  try {
    const response = await axios.get(baseUrl);    
    const characterNames = await response.data;
    console.log(characterNames)
    
    const characterDetailsPromises = characterNames.map(async (name: string) => {
      try {
        const detailResponse = await axios.get(`${baseUrl}/${name}`);
        if (detailResponse.status !== 200) {
          return { name, weapon: "Unknown", icon: "" };
        }
        const details = await detailResponse.data
        return {
          name,
          characterName: details.name || "Unknown",
          weapon: details.weapon || "Unknown",
          vision: details.vision || "Unknown",
          card: `${baseUrl}/${name}/card` // Add icon URL
        };
      } catch (error) {
        console.error(`Error fetching details for ${name}:`, error);
        return { name, weapon: "Unknown", icon: "" };
      }
    });
    
    const charactersWithDetails = await Promise.all(characterDetailsPromises);
    return charactersWithDetails;
    
  } catch (error) {
    console.error("Error in charactersLoader:", error);
  }
};