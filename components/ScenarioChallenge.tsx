
import React, { useState, useEffect } from 'react';
import { generateChallenge, refineMessage } from '../services/geminiService';
import { ToneType, PlatformType } from '../types';

export const ScenarioChallenge: React.FC = () => {
  const [scenario, setScenario] = useState<{ title: string; situation: string; parentReply: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  const loadNewScenario = async () => {
    setLoading(true);
    setEvaluation(null);
    setUserResponse('');
    const data = await generateChallenge();
    setScenario(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNewScenario();
  }, []);

  const handleEvaluate = async () => {
    if (!userResponse.trim()) return;
    setEvaluating(true);
    // Re-use refineMessage logic to "evaluate" but with a different prompt style
    const feedback = await refineMessage(
      `針對這個家長的反應：「${scenario?.parentReply}」，我打算這樣回覆：「${userResponse}」。請以專業角度評論我的回覆是否得體，並給予建議。`,
      ToneType.PROFESSIONAL,
      PlatformType.CONTACT_BOOK
    );
    setEvaluation(feedback);
    setEvaluating(false);
  };

  return (
    <section id="challenge" className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">情境挑戰：高難度親師對話</h2>
          <p className="text-gray-500">練習如何應對棘手的家長情境，並由 AI 提供專業評估。</p>
        </div>
        <button 
          onClick={loadNewScenario}
          className="px-6 py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-colors shrink-0"
        >
          換個情境
        </button>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <div className="animate-pulse flex flex-col items-center space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="h-4 w-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : scenario && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
              <span className="inline-block px-2 py-1 bg-red-100 text-red-600 text-[10px] font-bold uppercase rounded mb-3 tracking-tighter">當前情境</span>
              <h3 className="text-lg font-bold text-red-900 mb-2">{scenario.title}</h3>
              <p className="text-gray-700 mb-4">{scenario.situation}</p>
              <div className="pt-4 border-t border-red-200">
                <span className="text-xs font-bold text-red-400 block mb-1">家長的回覆：</span>
                <p className="italic text-gray-800 font-medium">「{scenario.parentReply}」</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-gray-700">你的專業回覆練習：</label>
              <textarea
                className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="試著寫下你會如何回覆這位家長..."
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
              />
              <button
                onClick={handleEvaluate}
                disabled={evaluating || !userResponse.trim()}
                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
              >
                {evaluating ? "分析中..." : "送出評估"}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl flex flex-col">
            <h4 className="font-bold text-gray-900 mb-4">專業評審點評</h4>
            <div className="flex-grow">
              {evaluation ? (
                <div className="prose prose-sm text-gray-700 leading-relaxed">
                  {evaluation}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-2xl">💡</div>
                  <p>完成回覆後送出，<br/>查看專業評點與建議。</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
