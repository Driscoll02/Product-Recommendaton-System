"use client";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { BotMessageSquareIcon } from "lucide-react";
import { useEffect, useState } from "react";

type TChatHistory = {
  chat_history: {
    messages: {
      content: string;
      additional_kwargs: object;
      response_metadata: object;
      type: "ai" | "human";
      name: null;
      id: null;
    }[];
  };
};

type TRAGLLMResponse = {
  llm_response: {
    input: string;
    history: {
      content: string;
      additional_kwargs: object;
      response_metadata: object;
      type: "ai" | "human";
      name: null;
      id: null;
      tool_calls?: [];
      invalid_tool_calls?: [];
      usage_metadata?: null;
    }[];
    context: {
      id: null;
      metadata: {
        seq_num: number;
        source: string;
      };
      page_content: string;
      type: string;
    }[];
    answer: string;
  };
  chat_history: {
    messages: {
      content: string;
      additional_kwargs: object;
      response_metadata: object;
      type: "human";
      name: null;
      id: null;
    }[];
  };
};

const LLMChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allChatHistory, setAllChatHistory] = useState<
    TRAGLLMResponse["chat_history"]
  >({
    messages: [],
  });

  useEffect(() => {
    const getChatHistory = async () => {
      const response = await fetch("http://localhost:8000/get-rag-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: "1" }),
      });

      if (!response.ok)
        throw new Error(
          "Something went wrong with the request to chat history endpoint"
        );

      const responseJson: TChatHistory = await response.json();
      setAllChatHistory(responseJson.chat_history.messages);
    };

    getChatHistory();
  }, []);

  const sendMessage = async (userInput: string) => {
    const response = await fetch("http://localhost:8000/rag-inference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_input: userInput, session_id: "1" }),
    });

    if (!response.ok)
      throw new Error(
        "Something went wrong with the request to send a message to the LLM"
      );

    const responseJson: TRAGLLMResponse = await response.json();
    setAllChatHistory(responseJson.chat_history);
  };

  return (
    <div>
      {/* Open/Close button */}
      <button
        className="bottom-4 left-4 bg-orange-600 rounded-full p-5 fixed text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BotMessageSquareIcon />
      </button>
      {isOpen && (
        <div className="fixed bottom-16 left-4 w-80 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden z-50">
          <div className="flex flex-col h-full p-4">
            <div className="flex-1 overflow-y-auto">
              <ChatContainer>
                <MessageList className="space-y-4">
                  {allChatHistory.chat_history.messages.map((message) => (
                    <Message
                      key={message.id}
                      model={{
                        position: "normal",
                        message: message.content,
                        sentTime: "just now",
                        sender: message.type === "human" ? "You" : "Assistant",
                        direction:
                          message.type === "human" ? "outgoing" : "incoming",
                      }}
                    />
                  ))}
                </MessageList>
              </ChatContainer>
            </div>
            <MessageInput
              placeholder="Type a message..."
              attachButton={false}
              onSend={sendMessage}
              className="mt-4 bg-gray-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LLMChat;
