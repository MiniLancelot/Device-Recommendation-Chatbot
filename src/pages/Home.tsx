import {
  BiCopy,
  BiLike,
  BiDislike,
  BiSolidLike,
  BiSolidDislike,
} from "react-icons/bi";
import { LuArrowUp } from "react-icons/lu";
import { useRef, useState } from "react";
import "../styles/Home.css";
import { askChatbot } from "../services/chatbotService";

const Home = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");

  const [listMessages, setListMessages] = useState<
    { text: string; sender: "user" | "bot"; id: number }[]
  >([]);

  const [botTyping, setBotTyping] = useState<boolean>(false);

  const [ratings, setRatings] = useState<{
    [key: number]: "like" | "dislike" | null;
  }>({});

  // const fakeBotMsg =
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

  const commonPrompts = [
    "Laptop cho lập trình viên",

    "Điện thoại chụp ảnh đẹp",

    "Tai nghe chống ồn",

    "Máy giặt cửa ngang",

    "Điện thoại dưới 10 triệu",

    "iPhone mới nhất",

    "Tivi Samsung 4K",

    "Tủ lạnh tiết kiệm điện",
  ];

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

  const handleSendMsg = async () => {
    if (userPrompt.trim() === "") return;

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

    scrollToBottom();

    setBotTyping(true);

    try {
      const botReply = await askChatbot(userPrompt);

      const botMsg = {
        text: botReply,
        sender: "bot" as const,
        id: userMsg.id + 1,
      };

      setListMessages((prevMessages) => [...prevMessages, botMsg]);

      scrollToBottom();
    } catch (error) {
      console.error("Lỗi khi gọi chatbot:", error);
    } finally {
      setBotTyping(false);
    }
  };

  // const handleBotReply = () => {
  //   let botReply = "";

  //   let index = 0;

  //   const messageId = listMessages.length;

  //   const interval = setInterval(() => {
  //     if (index < fakeBotMsg.length) {
  //       botReply += fakeBotMsg[index];

  //       setListMessages((prev) => {
  //         const lastMessage = prev[prev.length - 1];

  //         if (lastMessage?.sender === "bot") {
  //           return [
  //             ...prev.slice(0, -1),

  //             { text: botReply, sender: "bot", id: messageId },
  //           ];
  //         } else {
  //           return [...prev, { text: botReply, sender: "bot", id: messageId }];
  //         }
  //       });

  //       scrollToBottom(); // Cuộn xuống mỗi lần cập nhật tin nhắn bot

  //       index++;
  //     } else {
  //       clearInterval(interval);

  //       setBotTyping(false);
  //     }
  //   }, 30);
  // };

  const handleRating = (id: number, type: "like" | "dislike") => {
    if (ratings[id] === undefined) {
      setRatings((prev) => ({
        ...prev,

        [id]: type,
      }));
    }
  };

  const handlePromptClick = (item: string) => {
    setUserPrompt(item);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };
  return (
    <>
      <div
        className="chat-container flex flex-col justify-between lg:justify-center items-center bg-primary-color h-[100vh] w-full
  pt-20 lg:pt-24"
      >
        {listMessages.length < 1 ? (
          <h1
            className={`title w-fit p-6 mb-20 text-xl lg:text-5xl font-bold leading-[1.6] font-montserrat`}
          >
            Khám phá sản phẩm phù hợp <br />
            trong tích tắc với AI Chatbot!
          </h1>
        ) : (
          <div className="list-msg-container w-full flex flex-col justify-start items-center gap-3 flex-[0.7] grow overflow-y-auto pb-[20px]">
            {listMessages.map((msg, index) => (
              <div key={index} className="w-[90vw] lg:w-[60vw]">
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
                  {msg.text}

                  {msg.sender === "bot" && (
                    <div className="rating-buttons">
                      <button className="p-2 cursor-pointer" onClick={() => {}}>
                        <BiCopy size={20} title="Copy" />
                      </button>

                      {(ratings[msg.id] === undefined ||
                        ratings[msg.id] === "like") && (
                        <button
                          className="p-2 cursor-pointer"
                          onClick={() => handleRating(msg.id, "like")}
                        >
                          {ratings[msg.id] === "like" ? (
                            <BiSolidLike size={20} title="Good response" />
                          ) : (
                            <BiLike size={20} title="Good response" />
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
                            <BiSolidDislike size={20} title="Bad response" />
                          ) : (
                            <BiDislike size={20} title="Bad response" />
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
                <span>Bot đang trả lời</span>
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

        <div className="msg-input-container flex flex-col justify-end gap-2 rounded-2xl bg-secondary-white-color p-4 mb-5 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sh w-[90vw] lg:w-[60vw] ">
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
          <button
            onClick={handleSendMsg}
            className=" ml-auto bg-black text-white p-2 rounded-full hover:bg-gray-800 transition cursor-pointer"
          >
            <LuArrowUp size={24} />
          </button>
        </div>

        {listMessages.length < 1 && (
          <div className="common-prompts hidden lg:flex flex-wrap justify-center items-center gap-4 w-[60vw]">
            {commonPrompts.map((item, index) => (
              <button
                key={index}
                className="prompt-item px-5 py-3 border-none rounded-full cursor-pointer bg-[#ededed] hover:bg-gray-100"
                onClick={() => handlePromptClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
