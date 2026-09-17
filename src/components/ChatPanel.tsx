import React from 'react';
import { Activity, Send } from 'lucide-react';
import Markdown from 'react-markdown';
import { ChatMessage } from '../types';

interface ChatPanelProps {
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  handleChatSubmit: (e: React.FormEvent) => void;
  analyzing: boolean;
  t: any;
}

export function ChatPanel({
  chatMessages,
  chatInput,
  setChatInput,
  handleChatSubmit,
  analyzing,
  t
}: ChatPanelProps) {
  return (
    <div className="space-y-10">
      <div className="val-card flex flex-col h-[500px]">
        <h2 className="val-card-header">{t.dashboard.commsHeader}</h2>

        <div className="flex-1 overflow-y-auto space-y-4 mb-6 mt-14 pr-2 custom-scrollbar">
          {chatMessages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-10 grayscale">
              <Activity size={48} className="mb-4" />
              <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] max-w-[200px]">
                {t.dashboard.commsEmpty}
              </p>
            </div>
          )}
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 text-xs font-mono tracking-tight leading-snug ${
                msg.role === 'user' 
                ? 'bg-[#0f1923] border-r-4 border-[#00b2a9] text-[#ece8e1]' 
                : 'bg-[#ff4655] text-white skew-x-[-5deg] markdown-body'
              }`}>
                <div className={msg.role === 'analyst' ? 'skew-x-[5deg]' : ''}>
                  {msg.role === 'user' ? msg.text : <Markdown>{msg.text}</Markdown>}
                </div>
              </div>
            </div>
          ))}
          {analyzing && (
            <div className="flex justify-start">
              <div className="p-3 bg-[#ff4655] text-white animate-pulse font-bold">
                ...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleChatSubmit} className="flex gap-4">
          <label htmlFor="chatInput" className="sr-only">{t.dashboard.commsPlaceholder}</label>
          <input
            id="chatInput"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={t.dashboard.commsPlaceholder}
            className="flex-1 p-4 bg-[#0f1923] border-b border-white/20 font-mono text-xs focus:outline-none focus:border-[#ff4655] transition-colors uppercase"
          />
          <button
            type="submit"
            disabled={analyzing}
            className="val-btn val-btn-primary px-8"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
