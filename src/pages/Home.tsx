import {
  BiCopy,
  BiLike,
  BiDislike,
  BiSolidLike,
  BiSolidDislike,
} from "react-icons/bi";
import { useRef, useState } from "react";
import "../styles/Home.css";

const Home = () => {
  const [userPrompt, setUserPrompt] = useState<string>("");

  const [listMessages, setListMessages] = useState<
    { text: string; sender: "user" | "bot"; id: number }[]
  >([]);

  const [botTyping, setBotTyping] = useState<boolean>(false);

  const [ratings, setRatings] = useState<{
    [key: number]: "like" | "dislike" | null;
  }>({});

  const fakeBotMsg =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";

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

  const handleSendMsg = () => {
    if (userPrompt.trim() === "") return;

    setListMessages((prevMessages) => [
      ...prevMessages,

      { text: userPrompt, sender: "user", id: prevMessages.length },
    ]);

    setUserPrompt("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "48px";
    }

    setTimeout(() => {
      scrollToBottom();
    }, 100);

    setTimeout(() => {
      handleBotReply();
    }, 1000);
  };

  const handleBotReply = () => {
    let botReply = "";

    let index = 0;

    const messageId = listMessages.length;

    const interval = setInterval(() => {
      if (index < fakeBotMsg.length) {
        botReply += fakeBotMsg[index];

        setListMessages((prev) => {
          const lastMessage = prev[prev.length - 1];

          if (lastMessage?.sender === "bot") {
            return [
              ...prev.slice(0, -1),

              { text: botReply, sender: "bot", id: messageId },
            ];
          } else {
            return [...prev, { text: botReply, sender: "bot", id: messageId }];
          }
        });

        scrollToBottom(); // Cuộn xuống mỗi lần cập nhật tin nhắn bot

        index++;
      } else {
        clearInterval(interval);

        setBotTyping(false);
      }
    }, 30);
  };

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
      <div className="chat-container items-center">
        {listMessages.length < 1 ? (
          <h1
            className={`title w-fit p-6 text-2xl lg:text-5xl font-bold leading-[1.6]`}
          >
            Khám phá sản phẩm phù hợp <br />
            trong tích tắc với AI Chatbot!
          </h1>
        ) : (
          <div className="list-msg-container">
            {listMessages.map((msg, index) => (
              <div key={index} className="w-[60vw]">
                <div
                  className={`msg ${
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

                {botTyping && (
                  <div className="bot-typing">Bot đang trả lời...</div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>
        )}

        <div className="msg-input-container">
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
        </div>

        {listMessages.length < 1 && (
          <div className="common-prompts">
            {commonPrompts.map((item, index) => (
              <button
                key={index}
                className="prompt-item"
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
