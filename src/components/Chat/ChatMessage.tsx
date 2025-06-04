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
  const convertUrlsToMarkdownLinksSafely = (text: string): string => {
    console.log("response: ", text);
    // Xóa tất cả ký tự xuống dòng
    const cleanedText = text.replace(/\n{2,}/g, "\n");
    console.log("response after clean: ", text);
    // Tách và xử lý markdown links
    const parts = cleanedText.split(/(\[.*?\]\(.*?\))/g);

    return parts
      .map((part) => {
        if (part.match(/^\[.*?\]\(.*?\)$/)) {
          return part;
        } else {
          return part.replace(
            /https:\/\/[^\s)]+/g,
            (url) => `[${url}](${url})`
          );
        }
      })
      .join("");
  };

  const parsedMessage = convertUrlsToMarkdownLinksSafely(message);

  return (
    <div className="leading-snug">
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
