import {
  BiCopy,
  BiLike,
  BiDislike,
  BiSolidLike,
  BiSolidDislike,
} from "react-icons/bi";
import { LuArrowUp } from "react-icons/lu";
import { FaSquare } from "react-icons/fa6";
import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import "../styles/Home.css";
import { askChatbot } from "../services/chatbotService";
// import CustomButton from "../components/common/Button/CustomButon";
import ChatMessage from "../components/Chat/ChatMessage";
import Tooltip from "../components/common/Tooltip/CustomToolTip";
import axios from "axios";

// Optimized Grid Animation Component
const GridAnimation = () => {
  // Create small grid effect with fewer elements for performance
  const gridRows = 15;
  const gridCols = 25;

  const gridItems = useMemo(() => {
    // Only animate every 2nd or 3rd element for performance
    const items = [];
    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        // Skip some elements to reduce load but maintain visual density
        if ((row + col) % 3 === 0) {
          items.push({
            id: `${row}-${col}`,
            delay: row * 0.2 + col * 0.04,
            row,
            col,
          });
        }
      }
    }
    return items;
  }, [gridRows, gridCols]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="grid-container-small">
        {gridItems.map(({ id, delay, row, col }) => (
          <motion.div
            key={id}
            className="grid-box-small"
            style={{
              gridColumn: col + 1,
              gridRow: row + 1,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
              type: "tween",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");

  const [listMessages, setListMessages] = useState<
    { text: string; sender: "user" | "bot"; id: number }[]
  >([]);

  const [botTyping, setBotTyping] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const textStopResponse =
    "Bạn đã yêu cầu dừng phản hồi. Techie sẵn sàng hỗ trợ khi bạn gửi câu hỏi tiếp theo!";
  const textErrorResponse =
    "Techie đang gặp một chút trục trặc, bạn quay lại sau nhé!";

  const [tooltipText, setTooltipText] = useState("Sao chép");
  const [ratings, setRatings] = useState<{
    [key: number]: "like" | "dislike" | null;
  }>({});

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";

      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,

        200
      )}px`;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [listMessages]);

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

    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
    }
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
  const handleRating = (id: number, type: "like" | "dislike") => {
    if (ratings[id] === undefined) {
      setRatings((prev) => ({
        ...prev,

        [id]: type,
      }));
    }
  };
  const handleCopyMsg = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setTooltipText("Đã sao chép");
      setTimeout(() => setTooltipText("Sao chép"), 1500);
    } catch (error) {
      console.error("Không thể copy:", error);
      setTooltipText("Sao chép");
    }
  };

  // const handlePromptClick = (item: string) => {
  //   setUserPrompt(item);

  //   setTimeout(() => {
  //     textareaRef.current?.focus();
  //   }, 0);
  // };
  return (
    <>
      {listMessages.length < 1 && <GridAnimation />}

      <div
        className="chat-container flex flex-col justify-between lg:justify-center items-center h-[100vh] w-full
  pt-20 lg:pt-24 relative z-10"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
      >
        {listMessages.length < 1 ? (
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="title w-fit p-6 mb-20 text-xl lg:text-5xl font-bold leading-[1.6] font-montserrat
            bg-gradient-to-r from-[#0A3772] to-[#875FD6] bg-clip-text text-transparent"
          >
            <span>Chọn đồ công nghệ? Có Techie lo!</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-[#875FD6]"
            >
              |
            </motion.span>
          </motion.h1>
        ) : (
          <div className="list-msg-container w-full flex flex-col justify-start items-center gap-3 flex-[0.7] grow overflow-y-auto pb-[20px]">
            {listMessages.map((msg, index) => (
              <div key={index} className="w-[90vw] lg:w-[60vw]">
                <div ref={messagesEndRef} />
                <div
                  className={`msg px-5 py-3 w-fit rounded-3xl whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "ml-auto max-w-[40vw]"
                      : "bg-none w-full"
                  }`}
                  style={{
                    backgroundColor:
                      msg.sender === "user" ? "#dedede" : "transparent",
                  }}
                >
                  {msg.text && <ChatMessage message={msg.text} />}

                  {msg.sender === "bot" &&
                    msg.text !== (textStopResponse || textErrorResponse) && (
                      <div className="rating-buttons">
                        <button
                          className="p-2 cursor-pointer"
                          onClick={() => handleCopyMsg(msg.text)}
                        >
                          <Tooltip text={tooltipText} position="bottom">
                            <BiCopy size={20} />
                          </Tooltip>
                        </button>

                        {(ratings[msg.id] === undefined ||
                          ratings[msg.id] === "like") && (
                          <button
                            className="p-2 cursor-pointer"
                            onClick={() => handleRating(msg.id, "like")}
                          >
                            {ratings[msg.id] === "like" ? (
                              <Tooltip text="Hài lòng" position="bottom">
                                <BiSolidLike size={20} />
                              </Tooltip>
                            ) : (
                              <Tooltip text="Hài lòng" position="bottom">
                                <BiLike size={20} />
                              </Tooltip>
                            )}
                          </button>
                        )}

                        {(ratings[msg.id] === undefined ||
                          ratings[msg.id] === "dislike") && (
                          <button
                            className="p-2 cursor-pointer"
                            onClick={() => handleRating(msg.id, "dislike")}
                          >
                            {ratings[msg.id] === "dislike" ? (
                              <Tooltip text="Không hài lòng" position="bottom">
                                <BiSolidDislike size={20} />
                              </Tooltip>
                            ) : (
                              <Tooltip text="Không hài lòng" position="bottom">
                                <BiDislike size={20} />
                              </Tooltip>
                            )}
                          </button>
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}
            {botTyping && (
              <div className="bot-typing w-[90vw] lg:w-[60vw] px-5 flex items-end gap-2 text-gray-500">
                <span>Techie đang tìm sản phẩm phù hợp cho bạn</span>
                <span className="typing-dots flex gap-1">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />

        <motion.div
          className="msg-input-container flex flex-col justify-end gap-2 rounded-2xl p-4 mb-5 w-[90vw] lg:w-[60vw]
                              bg-secondary-white-color shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <textarea
            ref={textareaRef}
            className="w-full outline-none resize-none text-base min-12"
            value={userPrompt}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                handleSendMsg();
              }
            }}
            placeholder={`${
              listMessages.length < 1
                ? "Nhập câu hỏi của bạn...Ví dụ: Laptop dưới 20 triệu"
                : ""
            }`}
          />
          {botTyping ? (
            <div className="ml-auto">
              <Tooltip position="bottom" text="Dừng">
                <button
                  onClick={handleCancel}
                  className="ml-auto bg-gradient-to-r from-[#0A3772] to-[#875FD6] text-white p-3.5 rounded-full hover:opacity-90 transition cursor-pointer"
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
                  <LuArrowUp size={24} />
                </button>
              </Tooltip>
            </div>
          )}
        </motion.div>

        {/* {listMessages.length < 1 && (
          <div className="common-prompts hidden lg:flex flex-wrap justify-center items-center gap-4 w-[50vw]">
            {commonPrompts.map((item, index) => (
              <CustomButton
                textColor="#875FD6"
                borderColor="#875FD6"
                key={index}
                className="prompt-item px-5 py-3 border-none rounded-full cursor-pointer bg-[#ededed] hover:bg-gray-100"
                onClick={() => handlePromptClick(item)}
              >
                {item}
              </CustomButton>
            ))}
          </div>
        )} */}
      </div>
    </>
  );
};

export default Home;
