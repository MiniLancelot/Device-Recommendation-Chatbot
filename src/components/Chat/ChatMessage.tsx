import React from "react";

interface ChatMessageProps {
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const getBrandFromUrl = (url: string): string | null => {
    if (url.includes("cellphones.com.vn")) return "CellphoneS";
    if (url.includes("thegioididong.com")) return "Thế giới di động";
    if (url.includes("fptshop.com.vn")) return "FPT Shop";
    return null;
  };

  // Regex bắt các link có hoặc không có https
  const urlRegex =
    /(https?:\/\/[^\s*<>()"']+|(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s*<>()"']*)?)/gi;

  const parts = message.split(urlRegex);

  return (
    <div>
      {parts.map((part, index) => {
        // Loại bỏ các ký tự đặc biệt bao quanh (như ** hoặc <>)
        const cleanedPart = part.replace(/^[*<>"'()]+|[*<>"'()]+$/g, "");
        const brand = getBrandFromUrl(cleanedPart);

        if (brand) {
          const normalizedUrl = cleanedPart.startsWith("http")
            ? cleanedPart
            : `https://${cleanedPart}`;

          return (
            <a
              key={index}
              href={normalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline font-medium"
            >
              {brand}
            </a>
          );
        } else {
          return <span key={index}>{part}</span>;
        }
      })}
    </div>
  );
};

export default ChatMessage;
