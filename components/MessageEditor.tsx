
import React, { useState } from 'react';
import { ToneType, PlatformType, RefinedMessage } from '../types';
import { refineMessage } from '../services/geminiService';

export const MessageEditor: React.FC = () => {
  const [input, setInput] = useState('');
  const [tone, setTone] = useState<ToneType>(ToneType.GENTLE);
  const [platform, setPlatform] = useState<PlatformType>(PlatformType.CONTACT_BOOK);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<RefinedMessage[]>([]);

  const handleRefine = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const refined = await refineMessage(input, tone, platform);
    setResult(refined);
    
    const newMessage: RefinedMessage = {
      id: Math.random().toString(36).substr(2, 9),
      original: input,
      refined,
      tone,
      platform,
      timestamp: Date.now()
    };
    
    setHistory(prev => [newMessage, ...prev].slice(0, 5));
    setLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已複製到剪貼簿！');
  };

  return (
    <section id="editor" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            輸入原始的想法 (甚至是你的抱怨)
          </label>
          <textarea
            className="w-full h-40 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
            placeholder="例如：小華今天又不交作業，還打人，請家長管一下。"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">語氣</label>
              <select 
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm"
                value={tone}
                onChange={(e) => setTone(e.target.value as ToneType)}
              >
                {Object.values(ToneType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">平台</label>
              <select 
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PlatformType)}
              >
                {Object.values(PlatformType).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleRefine}
            disabled={loading || !input.trim()}
            className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold rounded-xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                潤飾中...
              </span>
            ) : (
              <span>開始潤飾</span>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white min-h-[200px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">潤飾後的訊息</h3>
            {result && (
              <button 
                onClick={() => handleCopy(result)}
                className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
              >
                複製
              </button>
            )}
          </div>
          <div className="flex-grow whitespace-pre-wrap text-lg leading-relaxed italic opacity-90">
            {result || (loading ? "正在為您重新構思語句..." : "等待輸入中...")}
          </div>
        </div>

        {history.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-4">最近紀錄</h4>
            <div className="space-y-4">
              {history.map((msg) => (
                <div key={msg.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm">
                  <p className="text-gray-400 text-xs mb-1">
                    {msg.tone} • {msg.platform} • {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                  <p className="line-clamp-2 text-gray-700">{msg.refined}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
