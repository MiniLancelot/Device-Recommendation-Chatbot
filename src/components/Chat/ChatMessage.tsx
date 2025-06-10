import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    // Xóa tất cả ký tự xuống dòng
    const cleanedText = text.replace(/\n{2,}/g, "\n");

    // Tách và xử lý markdown links
    const parts = cleanedText.split(/(\[.*?\]\(.*?\))/g);

    return parts
      .map((part) => {
        if (part.match(/^\[.*?\]\(.*?\)$/)) {
          return part;
        } else {
          // Regex để detect URLs:
          // 1. Bắt đầu với https:// hoặc http://
          // 2. Hoặc bắt đầu với domain (có .com, .vn, .net, etc.)
          // 3. Kết thúc khi gặp space, quotes, hoặc ký tự đặc biệt
          return part.replace(
            /(https?:\/\/[^\s'"<>{}|\\^`\\[\]]+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s'"<>{}|\\^`\\[\]]*)?)/g,
            (match) => {
              // Nếu không bắt đầu với http/https thì thêm https://
              const url = match.startsWith("http") ? match : `https://${match}`;
              return `[${url}](${url})`;
            }
          );
        }
      })
      .join("");
  };

  const parsedMessage = convertUrlsToMarkdownLinksSafely(message);

  return (
    <div className="leading-snug">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-200">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold bg-gray-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2">{children}</td>
          ),
        }}
      >
        {parsedMessage}
      </ReactMarkdown>
    </div>
  );
};

export default ChatMessage;
