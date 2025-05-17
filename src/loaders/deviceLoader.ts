import axios from "axios";

export const deviceLoader = async ({ params }: { params: { deviceId: string } }) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/devices/${params.deviceId}`);
    return response.data;
  } catch (error) {
    console.error("Error in deviceLoader:", error);
    throw new Error("Failed to load device details");
  }
}; 