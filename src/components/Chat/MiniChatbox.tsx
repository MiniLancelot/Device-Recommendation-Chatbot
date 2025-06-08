import { LuMessageSquare, LuX } from "react-icons/lu";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { askChatbot } from "../../services/chatbotService";
import Tooltip from "../common/Tooltip/CustomToolTip";
import { LuArrowUp } from "react-icons/lu";
import { FaSquare } from "react-icons/fa6";
import ChatMessage from "./ChatMessage";
import axios from "axios";

export default function MiniChatBox({ onClose }: { onClose?: () => void }) {
  const [userPrompt, setUserPrompt] = useState<string>("");

  const [listMessages, setListMessages] = useState<
    { text: string; sender: "user" | "bot"; id: number }[]
  >([]);
  const [botTyping, setBotTyping] = useState<boolean>(false);
  const textStopResponse =
    "Bạn đã yêu cầu dừng phản hồi. Techie sẵn sàng hỗ trợ khi bạn gửi câu hỏi tiếp theo!";
  const textErrorResponse =
    "Techie đang gặp một chút trục trặc, bạn quay lại sau nhé!";
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMsg = async () => {
    if (userPrompt.trim() === "") return;
    if (botTyping) return;
    const userMsg = {
      text: userPrompt,
      sender: "user" as const,
      id: listMessages.length,
    };
    setListMessages((prevMessages) => [...prevMessages, userMsg]);

    setUserPrompt("");
    setBotTyping(true);
    scrollToBottom();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const botReply = await askChatbot(userPrompt, controller.signal);
      console.log("bot reply: ", botReply);

      let safeText: string;

      if (typeof botReply === "string") {
        safeText = botReply;
      } else if (typeof botReply === "object" && botReply !== null) {
        // Nếu là object chứa thông báo lỗi từ server
        safeText = textErrorResponse;
      } else {
        // Trường hợp không xác định
        safeText = textErrorResponse;
      }

      const botMsg = {
        text: safeText,
        sender: "bot" as const,
        id: userMsg.id + 1,
      };

      setListMessages((prevMessages) => [...prevMessages, botMsg]);
      scrollToBottom();
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        console.warn("Yêu cầu đã bị huỷ bằng AbortController (Axios).");
        return;
      }
      console.error("Lỗi khi gọi chatbot:", error);
      const botMsg = {
        text: textErrorResponse,
        sender: "bot" as const,
        id: userMsg.id + 1,
      };

      setListMessages((prevMessages) => [...prevMessages, botMsg]);
    } finally {
      setBotTyping(false);
      abortControllerRef.current = null;
    }
  };
  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setBotTyping(false);
    const botMsg = {
      text: textStopResponse,
      sender: "bot" as const,
      id: listMessages.length + 1,
    };

    setListMessages((prevMessages) => [...prevMessages, botMsg]);
  };
  return (
    <motion.div
      className="fixed bottom-6 right-6 w-110 h-120 bg-white rounded-lg z-50 flex flex-col"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <div className="p-4 bg-gradient-to-r from-[#0A3772] to-[#875FD6] text-white flex justify-between items-center rounded-t-lg">
        <div className="flex items-center justify-start gap-2">
          <div
            className="bg-primary-color rounded-full aspect-square p-2 flex items-center justify-center"
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
            }}
          >
            <img src="/logo.svg" alt="logo" className="w-6 h-auto" />
          </div>
          <span className="font-semibold text-lg">
            Techie luôn sẵn sàng hỗ trợ bạn!
          </span>
        </div>

        <motion.button
          onClick={onClose}
          className="cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          <LuX size={24} />
        </motion.button>
      </div>
      <div className="flex-1 flex bg-primary-color grow overflow-y-auto py-4">
        {listMessages.length < 1 ? (
          <div className="flex-1 flex items-center justify-center">
            <LuMessageSquare size={80} className="text-gray-200" />
          </div>
        ) : (
          <div className="bg-primary-color w-full flex flex-col justify-start items-center gap-2">
            {listMessages.map((msg, index) => (
              <div key={index} className="w-full">
                <div
                  className={`msg px-3 py-2 w-fit rounded-3xl whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "ml-auto mr-3 max-w-[80%]"
                      : "bg-none max-w-full"
                  }`}
                  style={{
                    backgroundColor:
                      msg.sender === "user" ? "#dedede" : "transparent",
                  }}
                >
                  <ChatMessage message={msg.text} />
                </div>
              </div>
            ))}
            {botTyping && (
              <div className="bot-typing mr-auto px-3 flex items-end gap-2 text-gray-500">
                <span>Techie đang tìm sản phẩm phù hợp cho bạn</span>
                <span className="typing-dots flex gap-1">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-2 bg-primary-color rounded-lg">
        <div className="msg-input-container flex flex-row gap-2 rounded-full bg-secondary-white-color p-2 mb-2 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <input
            type="text"
            className="w-full ml-2 outline-none resize-none text-base"
            placeholder="Hỏi Techie.."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                handleSendMsg();
              }
            }}
          />
          {botTyping ? (
            <div className="ml-auto">
              <Tooltip position="bottom" text="Dừng">
                <button
                  onClick={handleCancel}
                  className="ml-auto bg-gradient-to-r from-[#0A3772] to-[#875FD6] text-white p-3 rounded-full hover:opacity-90 transition cursor-pointer"
                >
                  <FaSquare size={12} />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className="ml-auto">
              <Tooltip position="bottom" text="Gửi">
                <button
                  onClick={handleSendMsg}
                  className=" bg-gradient-to-br from-[#0A3772] to-[#875FD6] text-white p-2 rounded-full hover:opacity-90 transition cursor-pointer"
                >
                  <LuArrowUp size={20} />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
