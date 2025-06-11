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

  const fixMarkdownTableFormat = (text: string): string => {
    const lines = text.split("\n");

    const fixedLines: string[] = [];
    let insideTable = false;
    let buffer: string[] = [];

    for (const line of lines) {
      const isTableLine = /^\|.*\|$/.test(line.trim());

      if (isTableLine) {
        buffer.push(line.trim());
        insideTable = true;
      } else {
        if (insideTable && buffer.length > 1) {
          const fixedTable = fixTable(buffer);
          fixedLines.push("", "*", ...fixedTable, "*", "");
          buffer = [];
          insideTable = false;
        } else if (insideTable) {
          fixedLines.push(...buffer, line);
          buffer = [];
          insideTable = false;
        } else {
          fixedLines.push(line);
        }
      }
    }

    if (insideTable && buffer.length > 1) {
      const fixedTable = fixTable(buffer);
      fixedLines.push("", "*", ...fixedTable, "*", "");
    }

    return fixedLines.join("\n");
  };

  const fixTable = (tableLines: string[]): string[] => {
    const [header, ...rest] = tableLines;
    if (rest.length && /^\|[-:\s|]+\|$/.test(rest[0])) {
      return [header, ...rest];
    }
    const columns = header.split("|").filter((col) => col.trim() !== "");
    const divider = "|" + columns.map(() => "---").join("|") + "|";
    return [header, divider, ...rest];
  };

  const convertUrlsToMarkdownLinksSafely = (text: string): string => {
    const cleanedText = text.replace(/\n{2,}/g, "\n");

    const parts = cleanedText.split(/(\[.*?\]\(.*?\))/g);

    return parts
      .map((part) => {
        if (part.match(/^\[.*?\]\(.*?\)$/)) {
          return part;
        } else {
          return part.replace(
            /(https?:\/\/[^\s'"<>{}|\\^`[\]]+|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s'"<>{}|\\^`[\]]*)?)/g,
            (match) => {
              const url = match.startsWith("http") ? match : `https://${match}`;
              return `[${url}](${url})`;
            }
          );
        }
      })
      .join("");
  };

  const parsedMessage = fixMarkdownTableFormat(
    convertUrlsToMarkdownLinksSafely(message)
  );

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
