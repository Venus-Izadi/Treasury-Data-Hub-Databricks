"use client"

import { useState } from "react"
import { Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const suggestedPrompts = [
  "What's our current LCR position and how does it compare to last week?",
  "Summarize today's key liquidity risks",
  "Show me the top maturing CDs in the next 7 days",
  "What's the trend on uninsured deposit concentration?",
]

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello Sarah, welcome to the Treasury Smart Assist. I can help you analyze liquidity metrics, review alerts, and provide insights across your treasury portfolios. What would you like to explore today?",
    timestamp: "14:30",
  },
]

export function ConversationPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    }
    const assistantMsg: Message = {
      id: messages.length + 2,
      role: "assistant",
      content:
        "I'm analyzing your treasury data now. This is a placeholder response -- in a production environment, this would be connected to your AI backend to provide real-time treasury insights based on your question.",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }),
    }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput("")
  }

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[600px] rounded-lg px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.content}</p>
              <span
                className={`text-[11px] mt-1.5 block ${
                  msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {/* Suggested prompts (shown when only initial message) */}
        {messages.length <= 1 && (
          <div className="pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Suggested Questions
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left bg-card border border-border rounded-lg px-4 py-3 text-sm text-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about liquidity, funding, alerts..."
              className="w-full bg-card border border-border rounded-lg px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-primary text-primary-foreground px-4 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2 text-center">
          Treasury Smart Assist may produce inaccurate results. Always verify with source data.
        </p>
      </div>
    </div>
  )
}
