import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../utils/axiosClient";
import { Send } from "lucide-react";

function ChatAi({ problem }) {
  const [messages, setMessages] = useState([
    { role: "model", parts: [{ text: "Hi, How are you" }] },
    { role: "user", parts: [{ text: "I am Good" }] },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {
    setMessages((prev) => [...prev, { role: "user", parts: [{ text: data.message }] }]);
    reset();

    try {
      const response = await axiosClient.post("/ai/chat", {
        messages: messages,
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: response.data.message }],
        },
      ]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "Error from AI Chatbot" }],
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col max-h-[80vh] min-h-[500px] h-full bg-base-100 rounded-lg shadow-md border border-base-300">
      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-secondary scrollbar-track-base-200"
        aria-live="polite"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              role="article"
              aria-label={msg.role === "user" ? "User message" : "AI response"}
              className={`
                max-w-[75%] px-5 py-3 rounded-2xl shadow-md
                ${
                  msg.role === "user"
                    ? "bg-primary text-primary-content rounded-br-none"
                    : "bg-base-200 text-base-content rounded-bl-none"
                }
                animate-fadeIn
              `}
              style={{ animationDuration: "0.3s" }}
            >
              {msg.parts.map((part, i) => (
                <p key={i} className="whitespace-pre-wrap leading-relaxed">
                  {part.text}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sticky bottom-0 bg-base-100 border-t border-base-300 p-4"
        aria-label="Chat input form"
      >
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask me anything..."
            aria-label="Chat input"
            className={`input input-bordered flex-1 rounded-lg shadow-sm focus:ring-2 focus:ring-secondary focus:border-secondary ${
              errors.message ? "input-error" : ""
            }`}
            {...register("message", { required: true, minLength: 2 })}
            autoComplete="off"
          />
          <button
            type="submit"
            className={`btn btn-primary rounded-lg p-2 flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 ${
              errors.message ? "btn-disabled cursor-not-allowed opacity-50" : ""
            }`}
            disabled={errors.message}
            aria-disabled={errors.message ? "true" : "false"}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
}

export default ChatAi;
