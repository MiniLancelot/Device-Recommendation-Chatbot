import axios from "axios";

export const askChatbot = async (question: string): Promise<string> => {
  try {
    const response = await axios.post<string>(
      "http://127.0.0.1:8000/AskChatbot",
      { query: question },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data; // response.data là chuỗi luôn
  } catch (error) {
    console.error("Lỗi khi hỏi chatbot:", error);
    throw error;
  }
};
