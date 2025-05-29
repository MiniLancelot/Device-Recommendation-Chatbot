import React from "react";
import ReactMarkdown from "react-markdown";

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

  // Hàm xử lý an toàn hơn cho trường hợp có link markdown hoặc URL thô
  const convertUrlsToMarkdownLinksSafely = (text: string): string => {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);

    return parts
      .map((part) => {
        if (part.match(/^\[.*?\]\(.*?\)$/)) {
          // Phần đã là markdown link, giữ nguyên
          return part;
        } else {
          // Phần chưa phải markdown link, convert url thô thành markdown link
          return part.replace(/https:\/\/[^\s)]+/g, (url) => `[${url}](${url})`);
        }
      })
      .join("");
  };

  const parsedMessage = convertUrlsToMarkdownLinksSafely(message);

  return (
    <div className="prose max-w-none prose-p:my-1 prose-li:my-1 prose-ul:my-1 prose-h2:mt-2 prose-h2:mb-1">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            const brand = href ? getBrandFromUrl(href) : null;
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline font-medium"
              >
                {brand || children}
              </a>
            );
          },
        }}
      >
        {parsedMessage}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMessage;
